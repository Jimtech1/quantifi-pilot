import { createFileRoute } from "@tanstack/react-router";
import { Search, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard, PageHeader } from "@/components/nexafi/app-shell";
import { marketAssets, marketOpportunities } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/dashboard/markets")({
  head: () => ({
    meta: [
      { title: "Markets — NexaFi" },
      { name: "description", content: "AI-curated yield opportunities and live market prices inside NexaFi." },
      { property: "og:title", content: "Markets — NexaFi" },
      { property: "og:description", content: "AI-curated yield opportunities and live market prices inside NexaFi." },
    ],
  }),
  component: MarketsPage,
});

function MarketsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Live markets & opportunities" subtitle="Curated by your copilot, refreshed every minute." />

      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search assets" className="pl-9" />
        </div>
        <Button variant="outline">Filter: All</Button>
        <Button variant="outline">Sort: APY</Button>
      </div>

      <GlassCard>
        <h2 className="font-display text-lg font-semibold">Top opportunities</h2>
        <div className="mt-4 space-y-2.5">
          {marketOpportunities.map((o) => (
            <div
              key={o.name}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-background/30 px-4 py-3"
            >
              <div className="min-w-[180px] flex-1">
                <p className="text-sm font-medium">{o.name}</p>
                <p className="text-xs text-muted-foreground">TVL {o.tvl}</p>
              </div>
              <Badge variant="outline">{o.risk} risk</Badge>
              <span className="num text-lg font-semibold text-success">{o.apy}</span>
              <Button
                size="sm"
                className="brand-gradient text-white"
                onClick={() => toast.success(`Invested into ${o.name}`)}
              >
                Invest
              </Button>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {marketAssets.map((a) => (
          <GlassCard key={a.symbol} className="flex items-center justify-between">
            <div>
              <p className="font-display text-base font-semibold">{a.symbol}</p>
              <p className="num text-sm text-muted-foreground">{a.price}</p>
            </div>
            <div className={`flex items-center gap-1.5 text-sm ${a.up ? "text-success" : "text-destructive"}`}>
              {a.up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="num">{a.change}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
