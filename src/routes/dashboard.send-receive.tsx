import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard, PageHeader } from "@/components/nexafi/app-shell";
import { savedAddresses, user } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/send-receive")({
  head: () => ({
    meta: [
      { title: "Send & Receive — NexaFi" },
      { name: "description", content: "Move money across 150+ countries with AI-optimised routing and low fees." },
      { property: "og:title", content: "Send & Receive — NexaFi" },
      { property: "og:description", content: "Move money across 150+ countries with AI-optimised routing and low fees." },
    ],
  }),
  component: SendReceivePage,
});

function SendReceivePage() {
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader title="Send / Receive" subtitle="Global transfers, routed by the cheapest path automatically." />

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <GlassCard>
          <Tabs defaultValue="send">
            <TabsList className="grid w-full max-w-xs grid-cols-2">
              <TabsTrigger value="send">Send</TabsTrigger>
              <TabsTrigger value="receive">Receive</TabsTrigger>
            </TabsList>

            <TabsContent value="send" className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Asset</Label>
                  <Select defaultValue="usdc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="bnb">BNB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input id="recipient" placeholder="0x… or email address" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Network</Label>
                  <Select defaultValue="bnb">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bnb">BNB Chain</SelectItem>
                      <SelectItem value="eth">Ethereum</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estimated fee</Label>
                  <div className="num flex h-9 items-center rounded-md border border-input px-3 text-sm text-muted-foreground">
                    $0.12
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button className="brand-gradient text-white" onClick={() => toast.success("Transfer submitted")}>
                  Send now
                </Button>
                <Button variant="outline" onClick={() => toast("Transfer scheduled")}>
                  Schedule
                </Button>
                <Button variant="outline" onClick={() => toast.success("Route optimised — saved $0.34")}>
                  <Sparkles className="mr-2 h-4 w-4" /> AI optimize route
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="receive" className="mt-5 space-y-4">
              <p className="text-sm text-muted-foreground">Share your NexaFi address to get paid instantly.</p>
              <div className="num rounded-xl border border-border/60 bg-background/40 p-4 text-sm break-all">
                {user.wallet}
              </div>
              <Button variant="outline" onClick={() => toast.success("Address copied")}>
                Copy address
              </Button>
            </TabsContent>
          </Tabs>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard>
            <h2 className="font-display text-lg font-semibold">Saved addresses</h2>
            <div className="mt-3 space-y-2">
              {savedAddresses.map((a) => (
                <button
                  key={a.address}
                  onClick={() => toast(`${a.label} selected`)}
                  className="w-full rounded-xl border border-border/60 bg-background/30 px-3.5 py-2.5 text-left transition-colors hover:border-primary/50"
                >
                  <p className="text-sm font-medium">{a.label}</p>
                  <p className="num text-xs text-muted-foreground">{a.address}</p>
                </button>
              ))}
              <Button variant="outline" className="w-full" onClick={() => toast("Add a new contact")}>
                Add new
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="border-accent/30">
            <p className="text-sm">
              💡 <span className="font-medium">AI tip:</span> Sending now? BNB Chain is 92% cheaper than
              Ethereum for this amount.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
