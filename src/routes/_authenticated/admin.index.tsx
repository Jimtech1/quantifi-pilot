import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard, PageHeader, StatCard } from "@/components/nexafi/app-shell";
import { adminGrowth, adminStats, systemAlerts } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — NexaFi" },
      { name: "description", content: "Platform-wide users, volume, revenue and system health for NexaFi operators." },
      { property: "og:title", content: "Admin Dashboard — NexaFi" },
      { property: "og:description", content: "Platform-wide users, volume, revenue and system health for NexaFi operators." },
    ],
  }),
  component: AdminHome,
});

const tone: Record<string, string> = {
  success: "bg-success",
  warning: "bg-warning",
  accent: "bg-accent",
};

const growthMetrics = [
  ["New users", "1,245"],
  ["Churn rate", "4.2%"],
  ["Avg deposit", "$3,200"],
  ["Avg AI usage", "6.8x / week"],
  ["Top region", "Nigeria"],
  ["Top asset", "USDC"],
];

function AdminHome() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin dashboard" subtitle="Platform health at a glance." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} tone="accent" />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <h2 className="font-display text-lg font-semibold">User growth</h2>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adminGrowth}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="users" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="font-display text-lg font-semibold">Volume ($M)</h2>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminGrowth}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="volume" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <GlassCard>
          <h2 className="font-display text-lg font-semibold">Growth metrics — last 30 days</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {growthMetrics.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border/60 bg-background/30 px-3.5 py-3">
                <p className="text-xs text-muted-foreground">{k}</p>
                <p className="num mt-1 text-base font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="font-display text-lg font-semibold">System alerts</h2>
          <ul className="mt-4 space-y-3">
            {systemAlerts.map((a) => (
              <li key={a.text} className="flex items-start gap-3 text-sm">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${tone[a.tone]}`} />
                {a.text}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
