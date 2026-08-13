import { createFileRoute } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
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
import { transactions } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions — NexaFi" },
      { name: "description", content: "Full transaction history with filters and spending analytics." },
      { property: "og:title", content: "Transactions — NexaFi" },
      { property: "og:description", content: "Full transaction history with filters and spending analytics." },
    ],
  }),
  component: TransactionsPage,
});

const statusVariant = (s: string) =>
  s === "Completed" ? "secondary" : s === "Pending" ? "outline" : "destructive";

function TransactionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Transaction history"
        subtitle="Everything that moved, in one ledger."
        action={
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search transactions" className="pl-9" />
        </div>
        <Button variant="outline">Filter: All</Button>
        <Button variant="outline">Last 30 days</Button>
      </div>

      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t, i) => (
              <TableRow key={i}>
                <TableCell className="num text-muted-foreground">{t.date}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>{t.asset}</TableCell>
                <TableCell
                  className={`num ${t.amount.startsWith("+") ? "text-success" : "text-foreground"}`}
                >
                  {t.amount}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={statusVariant(t.status)}>{t.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total volume" value="$45,230" delta="Last 30 days" />
        <StatCard label="Top asset" value="USDC" delta="62% of volume" tone="accent" />
        <StatCard label="Most active day" value="Wednesday" delta="9 transactions" />
        <StatCard label="Average" value="4.2 tx/day" delta="+0.6 vs last month" tone="success" />
      </div>
    </div>
  );
}
