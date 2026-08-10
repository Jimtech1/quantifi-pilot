import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Zap } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GlassCard, PageHeader } from "@/components/nexafi/app-shell";
import { holdings, performanceSeries } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — NexaFi" },
      { name: "description", content: "Performance charts, holdings breakdown and AI rebalancing recommendations." },
      { property: "og:title", content: "Portfolio — NexaFi" },
      { property: "og:description", content: "Performance charts, holdings breakdown and AI rebalancing recommendations." },
    ],
  }),
  component: PortfolioPage,
});

const ranges = ["1D", "1W", "1M", "3M", "1Y", "All"];

function PortfolioPage() {
  const [range, setRange] = useState("1Y");

  return (
    <div className="space-y-6">
      <PageHeader title="Portfolio management" subtitle="Every position, live P&L and what the AI would do next." />

      <GlassCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Portfolio value</p>
            <p className="num text-3xl font-semibold">$124,850.32</p>
            <p className="text-sm text-success">+$26,650.32 (+27.1%) all time</p>
          </div>
          <div className="flex gap-1 rounded-full border border-border/60 bg-background/40 p-1">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  range === r ? "brand-gradient text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceSeries}>
              <defs>
                <linearGradient id="pv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                }}
                formatter={(v: number) => `$${v.toLocaleString()}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                fill="url(#pv)"
              />
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="var(--color-chart-2)"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-0">
        <div className="p-5 pb-0">
          <h2 className="font-display text-lg font-semibold">Holdings</h2>
        </div>
        <div className="mt-3 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>P&L</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((h) => (
                <TableRow key={h.asset}>
                  <TableCell className="font-medium">{h.asset}</TableCell>
                  <TableCell className="num">{h.balance}</TableCell>
                  <TableCell className="num">{h.value}</TableCell>
                  <TableCell className={`num text-${h.tone === "muted" ? "muted-foreground" : h.tone}`}>
                    {h.pnl}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={() => toast("Send flow opened")}>
                      Send
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.success(`Investing ${h.asset}`)}>
                      Invest
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard className="flex items-start gap-3">
          <Zap className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
          <div>
            <p className="text-sm font-medium">Rebalance suggestion</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Move 5% from ETH into BNB to reduce correlation and capture the current funding spread.
            </p>
            <Button size="sm" className="mt-3 brand-gradient text-white" onClick={() => toast.success("Rebalance queued")}>
              Apply
            </Button>
          </div>
        </GlassCard>
        <GlassCard className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="text-sm font-medium">New opportunity</p>
            <p className="mt-1 text-sm text-muted-foreground">
              15% APY available on a new NexaFi lending pool with low drawdown history.
            </p>
            <Button size="sm" variant="outline" className="mt-3" onClick={() => toast.success("Added to watchlist")}>
              Review
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
