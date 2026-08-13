import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { adminUsers } from "@/lib/mock-data";
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
import { GlassCard, PageHeader, StatCard } from "@/components/nexafi/app-shell";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({
    meta: [
      { title: "User Management — NexaFi Admin" },
      { name: "description", content: "Search, review and moderate NexaFi user accounts." },
      { property: "og:title", content: "User Management — NexaFi Admin" },
      { property: "og:description", content: "Search, review and moderate NexaFi user accounts." },
    ],
  }),
  component: Page,
});

function Page() {
  const [selected, setSelected] = useState<(typeof adminUsers)[number] | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="User management"
        subtitle="24,850 accounts across 150+ countries."
        action={<Button variant="outline">Export CSV</Button>}
      />
      <div className="flex flex-wrap gap-2">
        <Input placeholder="Search users" className="min-w-[220px] flex-1" />
        <Button variant="outline">Filter: All</Button>
        <Button variant="outline">Status: All</Button>
      </div>
      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers.map((u) => (
              <TableRow key={u.wallet}>
                <TableCell className="num">{u.wallet}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell className="num">{u.balance}</TableCell>
                <TableCell>
                  <Badge variant={u.status === "Active" ? "secondary" : u.status === "Pending" ? "outline" : "destructive"}>
                    {u.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => setSelected(u)}>
                    View
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => toast.success(`${u.email} suspended`)}>
                    Suspend
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User profile {selected?.wallet}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">{selected.email}</p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <StatCard label="Balance" value={selected.balance} />
                <StatCard label="Transactions" value={String(selected.tx)} />
                <StatCard label="AI strategies" value={`${selected.strategies} active`} />
                <StatCard label="Risk level" value={selected.risk} />
              </div>
              <div className="flex gap-2 pt-3">
                <Button size="sm" variant="outline" onClick={() => toast("Opening transactions")}>
                  View transactions
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast.success("User suspended")}>
                  Suspend
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
