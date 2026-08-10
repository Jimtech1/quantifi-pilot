import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, LifeBuoy, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { GlassCard, PageHeader } from "@/components/nexafi/app-shell";

export const Route = createFileRoute("/dashboard/help")({
  head: () => ({
    meta: [
      { title: "Help & Support — NexaFi" },
      { name: "description", content: "Guides, answers and 24/7 support for your NexaFi account." },
      { property: "og:title", content: "Help & Support — NexaFi" },
      { property: "og:description", content: "Guides, answers and 24/7 support for your NexaFi account." },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  ["How does the AI Copilot decide where to invest?", "It scores every available NexaFi strategy on yield, volatility and liquidity, then matches them to your stated risk tolerance and goals."],
  ["Can I withdraw anytime?", "Yes. Flexible strategies settle instantly; fixed-term positions display their unlock date before you commit."],
  ["How do I raise my limits?", "Complete identity verification in Settings → Security. Most upgrades are approved in under 10 minutes."],
];

function HelpPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Help & support" subtitle="We answer in under 3 minutes, 24/7." />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: MessageCircle, title: "Live chat", body: "Talk to a human specialist now." },
          { icon: BookOpen, title: "Documentation", body: "Guides for every NexaFi feature." },
          { icon: LifeBuoy, title: "Report an issue", body: "Something wrong? Tell us fast." },
        ].map((c) => (
          <GlassCard key={c.title}>
            <c.icon className="h-5 w-5 text-accent" />
            <h2 className="mt-3 font-display text-base font-semibold">{c.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
            <Button size="sm" variant="outline" className="mt-4" onClick={() => toast(`${c.title} opened`)}>
              Open
            </Button>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h2 className="font-display text-lg font-semibold">Common questions</h2>
        <Accordion type="single" collapsible className="mt-2">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </GlassCard>
    </div>
  );
}
