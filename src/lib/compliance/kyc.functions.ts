import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SubmitInput = z.object({
  kind: z.enum(["individual", "business"]),
  tier_requested: z.number().int().min(1).max(3),
  id_type: z.enum(["BVN", "NIN", "passport", "drivers_license", "cac"]),
  id_number: z.string().trim().min(6).max(32),
  document_url: z.string().trim().max(500).optional().nullable(),
  selfie_url: z.string().trim().max(500).optional().nullable(),
  business_name: z.string().trim().max(160).optional().nullable(),
  business_reg_number: z.string().trim().max(64).optional().nullable(),
});

const DecideInput = z.object({
  id: z.string().uuid(),
  decision: z.enum(["approved", "rejected"]),
  notes: z.string().trim().max(1000).optional().nullable(),
});

/** Lightweight screening heuristic until a live AML provider is connected. */
function screen(idNumber: string, tier: number) {
  let score = tier * 10;
  if (idNumber.length < 10) score += 25;
  if (/^(0{4,}|1{4,})/.test(idNumber)) score += 45;
  return { risk_score: Math.min(score, 100), aml_flag: score >= 60 };
}

async function isStaff(supabase: any, userId: string) {
  const [admin, ops] = await Promise.all([
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
    supabase.rpc("has_role", { _user_id: userId, _role: "ops" }),
  ]);
  return Boolean(admin.data) || Boolean(ops.data);
}

export const getComplianceOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [profile, submissions, tiers, staff] = await Promise.all([
      supabase.from("profiles").select("full_name, email, phone, country, kyc_status, kyc_tier").eq("id", userId).maybeSingle(),
      supabase.from("kyc_submissions").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("tier_limits").select("*").order("tier"),
      isStaff(supabase, userId),
    ]);

    return {
      profile: profile.data ?? null,
      submissions: submissions.data ?? [],
      tiers: tiers.data ?? [],
      isStaff: staff,
    };
  });

export const submitKyc = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SubmitInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { risk_score, aml_flag } = screen(data.id_number, data.tier_requested);

    const { data: row, error } = await supabase
      .from("kyc_submissions")
      .insert({
        user_id: userId,
        kind: data.kind,
        tier_requested: data.tier_requested,
        id_type: data.id_type,
        id_number: data.id_number,
        document_url: data.document_url ?? null,
        selfie_url: data.selfie_url ?? null,
        business_name: data.business_name ?? null,
        business_reg_number: data.business_reg_number ?? null,
        risk_score,
        aml_flag,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") throw new Error("You already have a verification request in progress.");
      throw new Error(error.message);
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await Promise.all([
      supabaseAdmin.from("profiles").update({ kyc_status: "pending" }).eq("id", userId),
      supabaseAdmin.from("audit_events").insert({
        actor_id: userId,
        action: "kyc.submitted",
        target_type: "kyc_submission",
        target_id: row.id,
        metadata: { tier: data.tier_requested, kind: data.kind, risk_score, aml_flag },
      }),
    ]);

    return { submission: row };
  });

export const listKycQueue = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    if (!(await isStaff(supabase, userId))) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [submissions, profiles, audit] = await Promise.all([
      supabaseAdmin.from("kyc_submissions").select("*").order("created_at", { ascending: false }).limit(100),
      supabaseAdmin.from("profiles").select("id, full_name, email, country, kyc_status, kyc_tier"),
      supabaseAdmin.from("audit_events").select("*").order("created_at", { ascending: false }).limit(50),
    ]);

    const byId = new Map((profiles.data ?? []).map((p) => [p.id, p]));
    return {
      queue: (submissions.data ?? []).map((s) => ({ ...s, profile: byId.get(s.user_id) ?? null })),
      audit: audit.data ?? [],
    };
  });

export const decideKyc = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => DecideInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;
    if (!(await isStaff(supabase, userId))) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: submission } = await supabaseAdmin
      .from("kyc_submissions")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (!submission) throw new Error("Submission not found.");
    if (submission.status !== "pending") throw new Error("This request was already reviewed.");

    const { error } = await supabaseAdmin
      .from("kyc_submissions")
      .update({
        status: data.decision,
        review_notes: data.notes ?? null,
        reviewed_by: userId,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);

    if (data.decision === "approved") {
      await supabaseAdmin
        .from("profiles")
        .update({ kyc_status: "verified", kyc_tier: submission.tier_requested })
        .eq("id", submission.user_id);
    } else {
      await supabaseAdmin.from("profiles").update({ kyc_status: "rejected" }).eq("id", submission.user_id);
    }

    await supabaseAdmin.from("audit_events").insert({
      actor_id: userId,
      actor_email: (claims as { email?: string })?.email ?? null,
      action: `kyc.${data.decision}`,
      target_type: "kyc_submission",
      target_id: data.id,
      metadata: { user_id: submission.user_id, tier: submission.tier_requested, notes: data.notes ?? null },
    });

    return { ok: true };
  });
