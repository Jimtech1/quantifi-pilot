import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GlassCard, PageHeader } from "@/components/nexafi/app-shell";
import { goals } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/goals")({
  head: () => ({
    meta: [
      { title: "Goals — NexaFi" },
      { name: "description", content: "Set savings goals and let the NexaFi AI pick the strategy that funds them." },
      { property: "og:title", content: "Goals — NexaFi" },
      { property: "og:description", content: "Set savings goals and let the NexaFi AI pick the strategy that funds them." },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial goals"
        subtitle="Tell the copilot the destination — it picks the route."
        action={
          <Button className="brand-gradient text-white glow" onClick={() => toast("New goal builder opened")}>
            <Plus className="mr-2 h-4 w-4" /> Create new goal
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {goals.map((g) => {
          const pct = Math.round((g.saved / g.target) * 1000) / 10;
          return (
            <GlassCard key={g.name}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{g.icon}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-semibold">{g.name}</h2>
                    <Badge variant="outline" className="border-accent/40 text-accent">
                      {g.strategy}
                    </Badge>
                  </div>
                  <p className="num mt-1 text-sm text-muted-foreground">
                    ${g.saved.toLocaleString()} of ${g.target.toLocaleString()} · {pct}% complete
                  </p>
                  <Progress value={pct} className="mt-3 h-2" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Projected completion: <span className="text-foreground">{g.eta}</span>
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast(`${g.name} details`)}>
                      View
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast("Goal editor opened")}>
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.success(`${g.name} paused`)}>
                      Pause
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
