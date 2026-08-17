import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { listUsersWithRoles, setUserRole } from "@/lib/compliance/roles.functions";
import { GlassCard, PageHeader, StatCard } from "@/components/nexafi/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/admin/roles")({
  head: () => ({
    meta: [
      { title: "Roles & Permissions — NexaFi Admin" },
      { name: "description", content: "Grant or revoke administrator and operations access for NexaFi staff." },
      { property: "og:title", content: "Roles & Permissions — NexaFi Admin" },
      { property: "og:description", content: "Grant or revoke administrator and operations access for NexaFi staff." },
    ],
  }),
  component: Page,
});

const ROLES = ["admin", "ops"] as const;

function Page() {
  const qc = useQueryClient();
  const list = useServerFn(listUsersWithRoles);
  const setRole = useServerFn(setUserRole);

  const { data, isLoading, error } = useQuery({ queryKey: ["admin-roles"], queryFn: () => list() });

  const mutation = useMutation({
    mutationFn: (v: { userId: string; role: "admin" | "ops"; grant: boolean }) => setRole({ data: v }),
    onSuccess: () => {
      toast.success("Access updated");
      void qc.invalidateQueries({ queryKey: ["admin-roles"] });
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
        <p className="text-sm text-muted-foreground">Administrator access is required to manage roles.</p>
      </GlassCard>
    );
  }

  const staff = data.filter((u) => u.roles.some((r) => r === "admin" || r === "ops"));

  return (
    <div className="space-y-6">
      <PageHeader title="Roles & permissions" subtitle="Who can review compliance, move money and change platform settings." />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total accounts" value={String(data.length)} />
        <StatCard label="Staff members" value={String(staff.length)} />
        <StatCard label="Administrators" value={String(data.filter((u) => u.roles.includes("admin")).length)} />
      </div>

      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead className="text-right">Access</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="font-medium">{u.full_name ?? "—"}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={u.kyc_status === "verified" ? "secondary" : "outline"}>
                    {u.kyc_status} · Tier {u.kyc_tier}
                  </Badge>
                </TableCell>
                <TableCell className="num text-xs">{u.roles.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {ROLES.map((role) => {
                      const has = u.roles.includes(role);
                      return (
                        <Button
                          key={role}
                          size="sm"
                          variant={has ? "outline" : "ghost"}
                          disabled={mutation.isPending}
                          onClick={() => mutation.mutate({ userId: u.id, role, grant: !has })}
                        >
                          {has ? `Revoke ${role}` : `Make ${role}`}
                        </Button>
                      );
                    })}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  );
}
