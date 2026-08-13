import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bot, Mic, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard, PageHeader } from "@/components/nexafi/app-shell";
import { copilotSeed, copilotSuggestions, oneClickStrategies, strategies } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/dashboard/copilot")({
  head: () => ({
    meta: [
      { title: "AI Copilot — NexaFi" },
      { name: "description", content: "Talk to your NexaFi AI copilot to optimise yield, rebalance and automate savings." },
      { property: "og:title", content: "AI Copilot — NexaFi" },
      { property: "og:description", content: "Talk to your NexaFi AI copilot to optimise yield, rebalance and automate savings." },
    ],
  }),
  component: CopilotPage,
});

type Msg = { role: "user" | "assistant"; content: string };

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("yield") || q.includes("apy"))
    return "I found 3 NexaFi strategies above 14% APY. SmartSave is currently paying 18.5% with low volatility — I can move idle USDC there in one tap.";
  if (q.includes("rebalance") || q.includes("optimi"))
    return "Your allocation drifted 6% toward ETH. Rebalancing into SmartSave and Stable Income would lift projected annual return by ~1.9% while lowering drawdown risk.";
  if (q.includes("goal") || q.includes("save"))
    return "Great — tell me a target amount and date and I'll pick the NexaFi strategy mix that gets you there with the lowest risk.";
  if (q.includes("report") || q.includes("tax"))
    return "Your August report is ready: +$1,240 realised yield, $184 fees, 12.4% net performance. I can export it as PDF or CSV.";
  return "On it. Your portfolio is $124,850.32 across 5 positions, up 12.4% this month. Growth Plus is your top performer at +18.2%. Want me to scale it up?";
}

function CopilotPage() {
  const [messages, setMessages] = useState<Msg[]>([...copilotSeed]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { role: "user", content: value }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: reply(value) }]);
      setThinking(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="AI Financial Copilot" subtitle="Ask anything about your money in plain language." />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <GlassCard className="flex h-[560px] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <div className="brand-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "brand-gradient text-white"
                      : "border border-border/60 bg-background/40"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 animate-pulse text-accent" /> Copilot is thinking…
              </div>
            )}
          </div>

          <form
            className="mt-4 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can I help you today?"
              className="h-11"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-11 w-11"
              aria-label="Voice input"
              onClick={() => toast("Voice input is coming soon")}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button type="submit" size="icon" className="brand-gradient h-11 w-11 text-white" aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard>
            <h2 className="font-display text-lg font-semibold">Suggested actions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {copilotSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border/70 bg-background/40 px-3.5 py-1.5 text-xs transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="font-display text-lg font-semibold">Active strategies</h2>
            <div className="mt-3 space-y-2.5">
              {strategies.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/30 px-3.5 py-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.allocated} · {s.risk} risk
                    </p>
                  </div>
                  <span className="num text-sm text-success">{s.pnl}</span>
                  <Badge variant={s.status === "Active" ? "secondary" : "outline"}>{s.status}</Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toast.success(`${s.name} ${s.status === "Active" ? "paused" : "resumed"}`)}
                  >
                    {s.status === "Active" ? "Pause" : "Resume"}
                  </Button>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="font-display text-lg font-semibold">One-click strategies</h2>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {oneClickStrategies.map((s) => (
                <button
                  key={s.name}
                  onClick={() => toast.success(`${s.name} strategy activated`)}
                  className="rounded-xl border border-border/60 bg-background/30 p-3 text-left transition-all hover:border-primary/60 hover:bg-primary/10"
                >
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="num text-xs text-accent">{s.apy}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.blurb}</p>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
