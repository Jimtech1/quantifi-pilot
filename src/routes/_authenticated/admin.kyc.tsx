import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { decideKyc, listKycQueue } from "@/lib/compliance/kyc.functions";
import { GlassCard, PageHeader, StatCard } from "@/components/nexafi/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/admin/kyc")({
  head: () => ({
    meta: [
      { title: "KYC Review Queue — NexaFi Admin" },
      { name: "description", content: "Review identity and business verification requests, screen AML flags and set customer tiers." },
      { property: "og:title", content: "KYC Review Queue — NexaFi Admin" },
      { property: "og:description", content: "Review identity and business verification requests, screen AML flags and set customer tiers." },
    ],
  }),
  component: Page,
});

function Page() {
  const qc = useQueryClient();
  const list = useServerFn(listKycQueue);
  const decide = useServerFn(decideKyc);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const { data, isLoading, error } = useQuery({ queryKey: ["kyc-queue"], queryFn: () => list() });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; decision: "approved" | "rejected" }) =>
      decide({ data: { id: vars.id, decision: vars.decision, notes: notes[vars.id] ?? null } }),
    onSuccess: (_r, vars) => {
      toast.success(`Request ${vars.decision}`);
      void qc.invalidateQueries({ queryKey: ["kyc-queue"] });
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
        <p className="text-sm text-muted-foreground">
          You don&apos;t have permission to view the compliance queue, or it failed to load.
        </p>
      </GlassCard>
    );
  }

  const pending = data.queue.filter((q) => q.status === "pending");
  const flagged = data.queue.filter((q) => q.aml_flag);

  return (
    <div className="space-y-6">
      <PageHeader title="KYC / KYB review" subtitle="Approve, reject and screen customer verification requests." />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Pending review" value={String(pending.length)} />
        <StatCard label="AML flags" value={String(flagged.length)} />
        <StatCard label="Total requests" value={String(data.queue.length)} />
      </div>

      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="min-w-[280px] text-right">Decision</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.queue.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No verification requests yet.
                </TableCell>
              </TableRow>
            )}
            {data.queue.map((q) => (
              <TableRow key={q.id}>
                <TableCell>
                  <div className="font-medium">{q.profile?.full_name ?? "Unknown"}</div>
                  <div className="text-xs text-muted-foreground">{q.profile?.email}</div>
                </TableCell>
                <TableCell>
                  <div>{q.kind}</div>
                  <div className="num text-xs text-muted-foreground">{q.id_type}</div>
                </TableCell>
                <TableCell className="num">Tier {q.tier_requested}</TableCell>
                <TableCell>
                  <span className="num">{q.risk_score}</span>
                  {q.aml_flag && (
                    <Badge variant="destructive" className="ml-2 gap-1">
                      <ShieldAlert className="h-3 w-3" /> AML
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={q.status === "approved" ? "secondary" : q.status === "rejected" ? "destructive" : "outline"}>
                    {q.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {q.status === "pending" ? (
                    <div className="flex items-center justify-end gap-2">
                      <Input
                        placeholder="Notes"
                        className="h-8 w-32"
                        value={notes[q.id] ?? ""}
                        onChange={(e) => setNotes((n) => ({ ...n, [q.id]: e.target.value }))}
                      />
                      <Button
                        size="sm"
                        className="brand-gradient text-white"
                        disabled={mutation.isPending}
                        onClick={() => mutation.mutate({ id: q.id, decision: "approved" })}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={mutation.isPending}
                        onClick={() => mutation.mutate({ id: q.id, decision: "rejected" })}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">{q.review_notes || "Reviewed"}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>

      <GlassCard className="p-0">
        <div className="p-5 pb-0">
          <h2 className="font-display text-lg font-semibold">Recent compliance audit trail</h2>
        </div>
        <Table className="mt-3">
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead className="text-right">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.audit.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-6 text-center text-sm text-muted-foreground">
                  No events recorded yet.
                </TableCell>
              </TableRow>
            )}
            {data.audit.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="num">{a.action}</TableCell>
                <TableCell className="num text-xs text-muted-foreground">{a.target_id}</TableCell>
                <TableCell className="num text-right text-xs text-muted-foreground">
                  {new Date(a.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  );
}
