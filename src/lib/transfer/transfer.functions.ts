import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { corridorMap, feeSchedule } from "./corridors";

const SOURCE = ["NGN", "USD", "GBP", "EUR"] as const;
const SourceEnum = z.enum(SOURCE);
const MethodEnum = z.enum(["bank", "mobile_money", "cash_pickup", "wallet"]);

const SOURCE_USD: Record<string, number> = { NGN: 1580, USD: 1, GBP: 0.78, EUR: 0.92 };

const QuoteInput = z.object({
  source: SourceEnum,
  destination: z.string().length(2),
  method: MethodEnum,
  amount: z.number().positive().max(50_000_000),
});

function priceQuote(input: z.infer<typeof QuoteInput>) {
  const corridor = corridorMap.get(input.destination);
  if (!corridor) throw new Error("That destination is not enabled yet.");

  const usdAmount = input.amount / (SOURCE_USD[input.source] ?? 1);
  const schedule = feeSchedule[input.method];
  // Slight, deterministic-per-minute market drift so quotes visibly refresh.
  const drift = 1 + (Math.sin(Math.floor(Date.now() / 30_000)) * 0.0015);
  const rate = (corridor.usdRate / (SOURCE_USD[input.source] ?? 1)) * drift;

  const feeUsd = usdAmount * schedule.pct + schedule.fixedUsd;
  const feeSource = Number((feeUsd * (SOURCE_USD[input.source] ?? 1)).toFixed(2));
  const receives = Number(((input.amount - feeSource) * rate).toFixed(2));

  return {
    rate: Number(rate.toFixed(6)),
    fee: feeSource,
    totalDebit: Number(input.amount.toFixed(2)),
    receives,
    receiveCurrency: corridor.currency,
    eta: corridor.eta,
    country: corridor.name,
    flag: corridor.flag,
    expiresAt: new Date(Date.now() + 30_000).toISOString(),
  };
}

export const getTransferQuote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => QuoteInput.parse(input))
  .handler(async ({ data }) => priceQuote(data));

const RecipientInput = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120).optional().nullable(),
  phone: z.string().trim().max(24).optional().nullable(),
  addressLine: z.string().trim().max(160).optional().nullable(),
  bankName: z.string().trim().max(80).optional().nullable(),
  accountNumber: z.string().trim().max(34).optional().nullable(),
  swift: z.string().trim().max(16).optional().nullable(),
  mobileNetwork: z.string().trim().max(40).optional().nullable(),
  mobileNumber: z.string().trim().max(24).optional().nullable(),
  reason: z.string().trim().max(120).optional().nullable(),
});

const SendInput = QuoteInput.extend({ recipient: RecipientInput });

function ref(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1000)}`;
}

export const sendInternationalTransfer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SendInput.parse(input))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const quote = priceQuote(data);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: account } = await supabaseAdmin
      .from("accounts")
      .select("*")
      .eq("user_id", userId)
      .eq("currency", data.source)
      .maybeSingle();
    if (!account) throw new Error("You don't have a source account in that currency.");

    const total = quote.totalDebit;
    if (Number(account.balance) < total) throw new Error("Not enough balance to cover this transfer.");

    const reference = ref("INT");
    await supabaseAdmin
      .from("accounts")
      .update({ balance: Number(account.balance) - total })
      .eq("id", account.id);

    await supabaseAdmin.from("transactions").insert({
      user_id: userId,
      account_id: account.id,
      direction: "out",
      kind: "international_transfer",
      currency: data.source,
      amount: Number((total - quote.fee).toFixed(2)),
      fee: quote.fee,
      status: "processing",
      reference,
      counterparty: `${data.recipient.fullName} · ${quote.country}`,
    });

    return { reference, quote };
  });

const BulkInput = z.object({
  source: SourceEnum,
  rows: z
    .array(
      z.object({
        fullName: z.string().trim().min(2).max(80),
        destination: z.string().length(2),
        method: MethodEnum,
        amount: z.number().positive(),
        destinationDetail: z.string().trim().max(80).optional().nullable(),
      }),
    )
    .min(1)
    .max(200),
});

export const sendBulkTransfers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => BulkInput.parse(input))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: account } = await supabaseAdmin
      .from("accounts")
      .select("*")
      .eq("user_id", userId)
      .eq("currency", data.source)
      .maybeSingle();
    if (!account) throw new Error("You don't have a source account in that currency.");

    const quotes = data.rows.map((row) =>
      priceQuote({ source: data.source, destination: row.destination, method: row.method, amount: row.amount }),
    );
    const total = quotes.reduce((sum, q) => sum + q.totalDebit, 0);
    if (Number(account.balance) < total) throw new Error("Not enough balance for this batch.");

    const batchRef = ref("BATCH");
    await supabaseAdmin
      .from("accounts")
      .update({ balance: Number(account.balance) - total })
      .eq("id", account.id);

    await supabaseAdmin.from("transactions").insert(
      data.rows.map((row, i) => ({
        user_id: userId,
        account_id: account.id,
        direction: "out",
        kind: "bulk_transfer",
        currency: data.source,
        amount: Number((row.amount - quotes[i]!.fee).toFixed(2)),
        fee: quotes[i]!.fee,
        status: "processing",
        reference: `${batchRef}-${i + 1}`,
        counterparty: `${row.fullName} · ${quotes[i]!.country}`,
      })),
    );

    return { batchRef, count: data.rows.length, total: Number(total.toFixed(2)) };
  });
