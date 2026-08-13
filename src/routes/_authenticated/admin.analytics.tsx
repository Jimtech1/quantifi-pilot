import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { adminGrowth } from "@/lib/mock-data";
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

export const Route = createFileRoute("/_authenticated/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — NexaFi Admin" },
      { name: "description", content: "Cohort growth, revenue mix and AI adoption analytics for NexaFi." },
      { property: "og:title", content: "Analytics — NexaFi Admin" },
      { property: "og:description", content: "Cohort growth, revenue mix and AI adoption analytics for NexaFi." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Where growth and revenue are coming from." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="MRR" value="$182K" delta="+11.4% MoM" tone="success" />
        <StatCard label="AI adoption" value="73%" delta="of active users" tone="accent" />
        <StatCard label="Avg session" value="7m 12s" delta="+42s" />
        <StatCard label="NPS" value="62" delta="+5 this quarter" tone="success" />
      </div>
      <GlassCard>
        <h2 className="font-display text-lg font-semibold">Users vs volume</h2>
        <div className="mt-4 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={adminGrowth}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="users" stroke="var(--color-chart-1)" strokeWidth={2.5} fill="url(#ag)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
