import { createFileRoute } from "@tanstack/react-router";
import { Snowflake, Sparkles, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GlassCard, PageHeader } from "@/components/nexafi/app-shell";
import { cardTransactions } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/dashboard/spend")({
  head: () => ({
    meta: [
      { title: "Spend — NexaFi" },
      { name: "description", content: "Manage your NexaFi virtual card, spending insights and card transactions." },
      { property: "og:title", content: "Spend — NexaFi" },
      { property: "og:description", content: "Manage your NexaFi virtual card, spending insights and card transactions." },
    ],
  }),
  component: SpendPage,
});

const categories = [
  { name: "Investments", pct: 40 },
  { name: "Shopping", pct: 30 },
  { name: "Food", pct: 20 },
  { name: "Other", pct: 10 },
];

function SpendPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Spend" subtitle="Your card, your categories, your AI savings tips." />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="brand-gradient relative overflow-hidden rounded-2xl p-6 text-white glow">
            <div className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-80">NexaFi Virtual</span>
              <Wallet className="h-5 w-5 opacity-80" />
            </div>
            <p className="num mt-10 text-xl tracking-[0.25em]">•••• •••• •••• 8421</p>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs opacity-75">Balance</p>
                <p className="num text-2xl font-semibold">$12,450.32</p>
              </div>
              <p className="num text-sm opacity-80">12/29</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.success("Card frozen")}>
              <Snowflake className="mr-2 h-4 w-4" /> Freeze card
            </Button>
            <Button variant="outline" onClick={() => toast("Physical card requested")}>
              Request physical
            </Button>
            <Button className="brand-gradient text-white" onClick={() => toast.success("Funds added")}>
              Add funds
            </Button>
          </div>
        </div>

        <GlassCard>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <h2 className="font-display text-lg font-semibold">AI spending insights</h2>
          </div>
          <p className="num mt-4 text-2xl font-semibold">$3,240</p>
          <p className="text-sm text-success">8% less than last month</p>
          <div className="mt-5 space-y-3">
            {categories.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{c.name}</span>
                  <span className="num">{c.pct}%</span>
                </div>
                <Progress value={c.pct} className="mt-1.5 h-1.5" />
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-2.5 text-sm">
            💡 You could save about $120 a month by routing recurring subscriptions through SmartSave.
          </p>
        </GlassCard>
      </div>

      <GlassCard className="p-0">
        <div className="p-5 pb-0">
          <h2 className="font-display text-lg font-semibold">Recent card transactions</h2>
        </div>
        <div className="mt-3 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cardTransactions.map((t) => (
                <TableRow key={t.merchant}>
                  <TableCell className="num text-muted-foreground">{t.date}</TableCell>
                  <TableCell>{t.merchant}</TableCell>
                  <TableCell className="num">{t.amount}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={t.status === "Completed" ? "secondary" : "outline"}>{t.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GlassCard>
    </div>
  );
}
