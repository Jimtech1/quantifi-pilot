import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Building2,
  Coins,
  Globe2,
  LineChart,
  PiggyBank,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/nexafi/site-footer";
import { SiteHeader } from "@/components/nexafi/site-header";
import heroBg from "@/assets/hero-bg.jpg";
import appMockup from "@/assets/app-mockup.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexaFi — The AI-Powered DeFi Neobank" },
      {
        name: "description",
        content:
          "NexaFi automates treasury management, optimizes yield with AI, and sends payments to 190+ countries in seconds.",
      },
      { property: "og:title", content: "NexaFi — The AI-Powered DeFi Neobank" },
      {
        property: "og:description",
        content:
          "Automated treasury, intelligent yield optimization and cross-border payments to 190+ countries, run by an AI copilot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Bot, title: "AI Copilot", body: "Ask anything about your money. Get an answer and a one-click action." },
  { icon: LineChart, title: "Yield optimization", body: "Continuously reallocates to the best risk-adjusted returns on BNB Chain." },
  {
    icon: Globe2,
    title: "Cross-border payments",
    body: "International payments to 190+ countries with the cheapest route auto-selected.",
  },
  { icon: Wallet, title: "Automated treasury", body: "Idle balances get put to work the moment they land." },
  { icon: Building2, title: "Multi-currency accounts", body: "Receivable accounts in NGN, USD, GBP and EUR opened instantly." },
  { icon: Coins, title: "DeFi yield strategies", body: "Venus, PancakeSwap, BNB staking and Stader — bundled into one balance." },
  { icon: ShieldCheck, title: "Institutional security", body: "Multi-layer custody, 2FA and continuous risk monitoring." },
  { icon: PiggyBank, title: "Goal-based saving", body: "Set a target, NexaFi picks the strategy and funds it automatically." },
  { icon: Sparkles, title: "One-click strategies", body: "SmartSave, Growth and Yield Max, tuned to your risk profile." },
];

const useCases = [
  {
    tag: "For freelancers",
    title: "Get paid by clients in 190+ countries",
    body: "Share your NGN, USD, GBP or EUR account details, receive like a local, and convert on the best rate automatically.",
  },
  {
    tag: "For businesses",
    title: "Run payroll and supplier payouts globally",
    body: "Batch international payments to 190+ countries while idle treasury keeps earning in the background.",
  },
  {
    tag: "For savers",
    title: "Earn 8–18% APY on stablecoins",
    body: "Your copilot routes balances across Venus, PancakeSwap and BNB staking, rebalancing as rates move.",
  },
  {
    tag: "For traders",
    title: "One balance for spending and strategy",
    body: "Move between yield positions and your card instantly — settlement runs entirely on BNB Chain.",
  },
];

const steps = [
  ["Connect", "Open NexaFi accounts in NGN, USD, GBP and EUR in under two minutes."],
  ["Let the AI plan", "The copilot builds an allocation from your goals and risk tolerance."],
  ["Earn and spend", "Yield compounds while your card spends from the same balance."],
];

const stats = [
  ["$1.2B+", "Volume processed"],
  ["24,850", "Active accounts"],
  ["190+", "Countries supported"],
  ["12.4%", "Avg optimized APY"],
];

function Landing() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % useCases.length), 5000);
    return () => clearInterval(id);
  }, []);

  const active = useCases[slide]!;

  return (
    <div className="mesh-bg min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1088}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-24 pb-16 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="text-center lg:text-left">
              <Badge variant="outline" className="border-accent/40 text-accent">
                Powered by autonomous AI agents
              </Badge>
              <h1 className="font-display mt-6 text-4xl leading-tight font-bold tracking-tight text-balance sm:text-6xl">
                The AI-powered <span className="text-gradient">DeFi neobank</span> for modern money
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground lg:mx-0">
                NexaFi manages your treasury, hunts the best yields on BNB Chain, and settles payments to
                190+ countries — all directed by an AI copilot that explains every decision.
              </p>

              {/* Rotating use-case content */}
              <div className="glass mt-8 rounded-2xl p-5 text-left">
                <div key={slide} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {active.tag}
                  </Badge>
                  <h2 className="font-display mt-3 text-lg font-semibold">{active.title}</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{active.body}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  {useCases.map((u, i) => (
                    <button
                      key={u.tag}
                      aria-label={`Show ${u.tag}`}
                      onClick={() => setSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === slide ? "w-8 bg-accent" : "w-3 bg-muted-foreground/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button asChild size="lg" className="brand-gradient glow text-white">
                  <Link to="/auth">
                    Launch app <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/dashboard/copilot">Meet the copilot</Link>
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute inset-x-8 top-10 bottom-10 rounded-[3rem] bg-primary/20 blur-3xl" />
              <img
                src={appMockup}
                alt="NexaFi mobile app showing balance, spending insights and AI strategies"
                width={912}
                height={1408}
                className="relative w-[260px] drop-shadow-2xl sm:w-[320px]"
              />
            </div>
          </div>

          <div className="relative mx-auto grid max-w-6xl gap-4 px-4 pb-16 sm:grid-cols-4">
            {stats.map(([v, k]) => (
              <div key={k} className="glass rounded-2xl px-4 py-5 text-center">
                <p className="num font-display text-2xl font-semibold">{v}</p>
                <p className="mt-1 text-xs text-muted-foreground">{k}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl font-bold tracking-tight">Everything a bank should have been</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Nine systems working together, so you never have to time a market or chase a transfer again.
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

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="glass rounded-3xl p-8">
            <Send className="h-5 w-5 text-accent" />
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight">
              Cross-border payments to 190+ countries
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              International transfers settle over BNB Chain and land in local rails, so recipients get paid
              in their own currency — usually within minutes, at a fraction of bank fees.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["190+", "Payout countries"],
                ["< 2 min", "Typical settlement"],
                ["0.1%", "Average FX spread"],
              ].map(([v, k]) => (
                <div key={k} className="rounded-2xl border border-border/60 bg-background/30 px-4 py-5">
                  <p className="num font-display text-2xl font-semibold">{v}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{k}</p>
                </div>
              ))}
            </div>
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
              <Link to="/auth">
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
