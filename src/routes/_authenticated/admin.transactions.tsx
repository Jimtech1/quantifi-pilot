import { createFileRoute } from "@tanstack/react-router";
import { adminTransactions } from "@/lib/mock-data";
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

export const Route = createFileRoute("/_authenticated/admin/transactions")({
  head: () => ({
    meta: [
      { title: "Transaction Monitoring — NexaFi Admin" },
      { name: "description", content: "Monitor platform transactions and risk flags in real time." },
      { property: "og:title", content: "Transaction Monitoring — NexaFi Admin" },
      { property: "og:description", content: "Monitor platform transactions and risk flags in real time." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Transaction monitoring" subtitle="Every movement, scored for risk." action={<Button variant="outline">Export</Button>} />
      <div className="flex flex-wrap gap-2">
        <Input placeholder="Search transaction ID" className="min-w-[220px] flex-1" />
        <Button variant="outline">Filter: All</Button>
        <Button variant="outline">Last 7 days</Button>
      </div>
      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TX ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminTransactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="num">{t.id}</TableCell>
                <TableCell className="num">{t.user}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell className={`num ${t.amount.startsWith("+") ? "text-success" : ""}`}>{t.amount}</TableCell>
                <TableCell>
                  <Badge variant={t.status === "Completed" ? "secondary" : "outline"}>{t.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      t.flag === "High"
                        ? "border-destructive/50 text-destructive"
                        : t.flag === "Medium"
                          ? "border-warning/50 text-warning"
                          : "border-success/50 text-success"
                    }
                  >
                    {t.flag}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Low risk" value="892 TX" delta="Auto-cleared" tone="success" />
        <StatCard label="Medium risk" value="45 TX" delta="Review recommended" tone="accent" />
        <StatCard label="High risk" value="3 TX" delta="Investigate immediately" tone="destructive" />
      </div>
    </div>
  );
}
