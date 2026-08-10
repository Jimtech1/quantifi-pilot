import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Bot, Sparkles } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { GlassCard, PageHeader, StatCard } from "@/components/nexafi/app-shell";
import { activity, allocation, portfolioStats, user } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dashboard — NexaFi" },
      { name: "description", content: "Track balance, AI performance and live activity in your NexaFi account." },
      { property: "og:title", content: "Dashboard — NexaFi" },
      { property: "og:description", content: "Track balance, AI performance and live activity in your NexaFi account." },
    ],
  }),
  component: DashboardHome,
});

const toneDot: Record<string, string> = {
  success: "bg-success",
  accent: "bg-accent",
  primary: "bg-primary",
  destructive: "bg-destructive",
  warning: "bg-warning",
};

const prompts = [
  "What's my best-performing strategy this month?",
  "Move 10% of my USDC into high-yield lending",
  "Show me my top 5 positions",
  "Autopilot my portfolio for low risk",
];

function DashboardHome() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        subtitle={`AI Copilot: Active · Last active ${user.lastActive}`}
        action={
          <Button asChild className="brand-gradient rounded-full text-white glow">
            <Link to="/dashboard/copilot">
              <Bot className="mr-2 h-4 w-4" /> Chat with Copilot
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {portfolioStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <GlassCard>
          <h2 className="font-display text-lg font-semibold">Portfolio allocation</h2>
          <div className="mt-2 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocation}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={68}
                  outerRadius={100}
                  paddingAngle={3}
                  stroke="none"
                >
                  {allocation.map((a) => (
                    <Cell key={a.name} fill={a.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-popover-foreground)",
                  }}
                  formatter={(v: number) => `$${v.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {allocation.map((a) => (
              <div key={a.name} className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} />
                <span className="text-muted-foreground">{a.name}</span>
                <span className="num ml-auto">${a.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h2 className="font-display text-lg font-semibold">Copilot quick actions</h2>
            </div>
            <div className="mt-4 space-y-2">
              {prompts.map((p) => (
                <Link
                  key={p}
                  to="/dashboard/copilot"
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-background/30 px-3.5 py-2.5 text-sm transition-colors hover:border-primary/50 hover:bg-primary/10"
                >
                  <span className="text-muted-foreground">“{p}”</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
                </Link>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="font-display text-lg font-semibold">Recent activity</h2>
            <ul className="mt-4 space-y-3.5">
              {activity.map((a) => (
                <li key={a.text} className="flex items-start gap-3 text-sm">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot[a.tone]}`} />
                  <span className="flex-1">{a.text}</span>
                  <span className="text-xs whitespace-nowrap text-muted-foreground">{a.time}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
