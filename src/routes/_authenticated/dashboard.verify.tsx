import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";
import { toast } from "sonner";
import { getComplianceOverview, submitKyc } from "@/lib/compliance/kyc.functions";
import { GlassCard, PageHeader, StatCard } from "@/components/nexafi/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/dashboard/verify")({
  head: () => ({
    meta: [
      { title: "Identity Verification — NexaFi" },
      { name: "description", content: "Complete NexaFi identity or business verification to unlock higher transfer and payout limits." },
      { property: "og:title", content: "Identity Verification — NexaFi" },
      { property: "og:description", content: "Complete NexaFi identity or business verification to unlock higher transfer and payout limits." },
    ],
  }),
  component: VerifyPage,
});

const statusMeta: Record<string, { label: string; icon: typeof ShieldCheck; variant: "secondary" | "outline" | "destructive" }> = {
  verified: { label: "Verified", icon: ShieldCheck, variant: "secondary" },
  pending: { label: "In review", icon: ShieldQuestion, variant: "outline" },
  rejected: { label: "Rejected", icon: ShieldAlert, variant: "destructive" },
  unverified: { label: "Unverified", icon: ShieldAlert, variant: "outline" },
};

function VerifyPage() {
  const qc = useQueryClient();
  const overview = useServerFn(getComplianceOverview);
  const submit = useServerFn(submitKyc);

  const { data, isLoading, error } = useQuery({
    queryKey: ["compliance"],
    queryFn: () => overview(),
  });

  const [kind, setKind] = useState<"individual" | "business">("individual");
  const [tier, setTier] = useState("1");
  const [idType, setIdType] = useState("BVN");
  const [idNumber, setIdNumber] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [selfieUrl, setSelfieUrl] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessReg, setBusinessReg] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      submit({
        data: {
          kind,
          tier_requested: Number(tier),
          id_type: idType as "BVN",
          id_number: idNumber,
          document_url: documentUrl || null,
          selfie_url: selfieUrl || null,
          business_name: kind === "business" ? businessName || null : null,
          business_reg_number: kind === "business" ? businessReg || null : null,
        },
      }),
    onSuccess: () => {
      toast.success("Verification submitted — our compliance team will review it shortly.");
      setIdNumber("");
      void qc.invalidateQueries({ queryKey: ["compliance"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <GlassCard>
        <p className="text-sm text-muted-foreground">We couldn&apos;t load your verification status. Please refresh.</p>
      </GlassCard>
    );
  }

  const status = data.profile?.kyc_status ?? "unverified";
  const currentTier = data.profile?.kyc_tier ?? 0;
  const meta = statusMeta[status] ?? statusMeta["unverified"]!;
  const Icon = meta.icon;
  const activeLimits = data.tiers.find((t) => t.tier === currentTier);
  const hasOpen = data.submissions.some((s) => s.status === "pending");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Identity verification"
        subtitle="Unlock higher limits by completing KYC or business KYB checks."
        action={
          <Badge variant={meta.variant} className="gap-1">
            <Icon className="h-3.5 w-3.5" /> {meta.label}
          </Badge>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Current tier" value={`Tier ${currentTier}`} />
        <StatCard label="Daily limit" value={activeLimits ? `$${Number(activeLimits.daily_limit_usd).toLocaleString()}` : "—"} />
        <StatCard label="Per transaction" value={activeLimits ? `$${Number(activeLimits.single_limit_usd).toLocaleString()}` : "—"} />
      </div>

      <GlassCard>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Verification progress</h2>
          <span className="num text-sm text-muted-foreground">{currentTier} / 3</span>
        </div>
        <Progress value={(currentTier / 3) * 100} className="mt-4" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {data.tiers.map((t) => (
            <div
              key={t.tier}
              className={`rounded-xl border p-3 text-sm ${t.tier <= currentTier ? "border-accent/40 bg-accent/5" : "border-border"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{t.label}</span>
                <span className="num text-xs text-muted-foreground">
                  ${Number(t.daily_limit_usd).toLocaleString()}/day
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{t.requirements}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <GlassCard>
          <h2 className="font-display text-lg font-semibold">Submit verification</h2>
          {hasOpen ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Your request is in review. We&apos;ll notify you as soon as a compliance officer completes the check.
            </p>
          ) : (
            <Tabs value={kind} onValueChange={(v) => setKind(v as "individual" | "business")} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">Individual (KYC)</TabsTrigger>
                <TabsTrigger value="business">Business (KYB)</TabsTrigger>
              </TabsList>

              <TabsContent value={kind} className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Requested tier</Label>
                    <Select value={tier} onValueChange={setTier}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {data.tiers.filter((t) => t.tier > 0).map((t) => (
                          <SelectItem key={t.tier} value={String(t.tier)}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>ID type</Label>
                    <Select value={idType} onValueChange={setIdType}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BVN">BVN</SelectItem>
                        <SelectItem value="NIN">NIN</SelectItem>
                        <SelectItem value="passport">International passport</SelectItem>
                        <SelectItem value="drivers_license">Driver&apos;s licence</SelectItem>
                        <SelectItem value="cac">CAC registration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idnum">ID number</Label>
                  <Input id="idnum" className="num" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="22XXXXXXXXX" />
                </div>

                {kind === "business" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bname">Business name</Label>
                      <Input id="bname" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="breg">RC number</Label>
                      <Input id="breg" className="num" value={businessReg} onChange={(e) => setBusinessReg(e.target.value)} />
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="doc">Document link</Label>
                    <Input id="doc" value={documentUrl} onChange={(e) => setDocumentUrl(e.target.value)} placeholder="https://…" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="selfie">Liveness selfie link</Label>
                    <Input id="selfie" value={selfieUrl} onChange={(e) => setSelfieUrl(e.target.value)} placeholder="https://…" />
                  </div>
                </div>

                <Button
                  className="brand-gradient w-full text-white"
                  disabled={mutation.isPending || idNumber.trim().length < 6}
                  onClick={() => mutation.mutate()}
                >
                  {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit for review
                </Button>
              </TabsContent>
            </Tabs>
          )}
        </GlassCard>

        <GlassCard className="p-0">
          <div className="p-5 pb-0">
            <h2 className="font-display text-lg font-semibold">History</h2>
          </div>
          {data.submissions.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">No verification requests yet.</p>
          ) : (
            <Table className="mt-3">
              <TableHeader>
                <TableRow>
                  <TableHead>Tier</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.submissions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="num">Tier {s.tier_requested}</TableCell>
                    <TableCell>{s.id_type}</TableCell>
                    <TableCell>
                      <Badge variant={s.status === "approved" ? "secondary" : s.status === "rejected" ? "destructive" : "outline"}>
                        {s.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
