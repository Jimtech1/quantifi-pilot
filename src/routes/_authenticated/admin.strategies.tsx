import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminStrategies } from "@/lib/mock-data";
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

export const Route = createFileRoute("/admin/strategies")({
  head: () => ({
    meta: [
      { title: "AI Strategy Management — NexaFi Admin" },
      { name: "description", content: "Create, tune and deploy the AI strategies offered to NexaFi users." },
      { property: "og:title", content: "AI Strategy Management — NexaFi Admin" },
      { property: "og:description", content: "Create, tune and deploy the AI strategies offered to NexaFi users." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI strategy management"
        subtitle="Design the strategies your users one-click into."
        action={<Button className="brand-gradient text-white" onClick={() => toast("New strategy draft created")}>Create new strategy</Button>}
      />
      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Strategy</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>APY range</TableHead>
              <TableHead>Users</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminStrategies.map((s) => (
              <TableRow key={s.name}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.type}</TableCell>
                <TableCell className="num">{s.apy}</TableCell>
                <TableCell className="num">{s.users.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={s.status === "Active" ? "secondary" : "outline"}>{s.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>

      <GlassCard>
        <h2 className="font-display text-lg font-semibold">Strategy editor</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sname">Name</Label>
            <Input id="sname" defaultValue="Growth Plus" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stype">Type</Label>
            <Input id="stype" defaultValue="DeFi" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="sdesc">Description</Label>
          <Textarea id="sdesc" defaultValue="Balanced allocation across lending, staking and liquidity with weekly rebalance." />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[["Lending", 40], ["Staking", 30], ["Farming", 30]].map(([k, v]) => (
            <div key={String(k)} className="rounded-xl border border-border/60 bg-background/30 px-3.5 py-3">
              <p className="text-xs text-muted-foreground">{k}</p>
              <p className="num text-base font-semibold">{v}%</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button className="brand-gradient text-white" onClick={() => toast.success("Strategy saved")}>Save</Button>
          <Button variant="outline" onClick={() => toast("Preview generated")}>Preview</Button>
          <Button variant="ghost" onClick={() => toast.success("Strategy deployed")}>Deploy</Button>
        </div>
      </GlassCard>
    </div>
  );
}
