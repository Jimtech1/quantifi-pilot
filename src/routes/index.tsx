import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Globe2, LineChart, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/nexafi/site-footer";
import { SiteHeader } from "@/components/nexafi/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexaFi — The AI-Powered DeFi Neobank" },
      {
        name: "description",
        content:
          "NexaFi automates treasury management, optimizes yield with AI, and moves money across borders in seconds.",
      },
      { property: "og:title", content: "NexaFi — The AI-Powered DeFi Neobank" },
      {
        property: "og:description",
        content:
          "Automated treasury, intelligent yield optimization and instant cross-border payments, run by an AI copilot.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Bot, title: "AI Copilot", body: "Ask anything about your money. Get an answer and a one-click action." },
  { icon: LineChart, title: "Yield optimization", body: "Continuously reallocates to the best risk-adjusted returns." },
  { icon: Globe2, title: "Cross-border payments", body: "Send to 150+ countries with the cheapest route auto-selected." },
  { icon: Wallet, title: "Automated treasury", body: "Idle balances get put to work the moment they land." },
  { icon: ShieldCheck, title: "Institutional security", body: "Multi-layer custody, 2FA and continuous risk monitoring." },
  { icon: Sparkles, title: "One-click strategies", body: "SmartSave, Growth and Yield Max, tuned to your risk profile." },
];

const steps = [
  ["Connect", "Fund your NexaFi account in under two minutes."],
  ["Let the AI plan", "The copilot builds an allocation from your goals and risk tolerance."],
  ["Earn and spend", "Yield compounds while your card spends from the same balance."],
];

const stats = [
  ["$1.2B+", "Volume processed"],
  ["24,850", "Active accounts"],
  ["150+", "Countries supported"],
  ["12.4%", "Avg optimized APY"],
];

function Landing() {
  return (
    <div className="mesh-bg min-h-screen">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:pt-28">
          <Badge variant="outline" className="border-accent/40 text-accent">
            Powered by autonomous AI agents
          </Badge>
          <h1 className="font-display mt-6 text-4xl leading-tight font-bold tracking-tight text-balance sm:text-6xl">
            The AI-powered <span className="text-gradient">DeFi neobank</span> for modern money
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            NexaFi manages your treasury, hunts the best yields, and settles cross-border payments — all
            directed by an AI copilot that explains every decision.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="brand-gradient glow text-white">
              <Link to="/dashboard">
                Launch app <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/dashboard/copilot">Meet the copilot</Link>
            </Button>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-4">
            {stats.map(([v, k]) => (
              <div key={k} className="glass rounded-2xl px-4 py-5">
                <p className="num font-display text-2xl font-semibold">{v}</p>
                <p className="mt-1 text-xs text-muted-foreground">{k}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl font-bold tracking-tight">Everything a bank should have been</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Six systems working together, so you never have to time a market or chase a transfer again.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6">
                <f.icon className="h-5 w-5 text-accent" />
                <h3 className="font-display mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl font-bold tracking-tight">How it works</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map(([title, body], i) => (
              <div key={title} className="glass rounded-2xl p-6">
                <span className="num text-sm text-accent">0{i + 1}</span>
                <h3 className="font-display mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-4 pb-24">
          <div className="glass glow rounded-3xl px-6 py-14 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance">
              Put your money on autopilot today
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Open a NexaFi account and let the copilot build your first strategy in minutes.
            </p>
            <Button asChild size="lg" className="brand-gradient mt-7 text-white">
              <Link to="/dashboard">
                Get started free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
