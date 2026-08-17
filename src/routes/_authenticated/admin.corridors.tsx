import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { corridors, feeSchedule, methodLabel, type PayoutMethod } from "@/lib/transfer/corridors";
import { GlassCard, PageHeader, StatCard } from "@/components/nexafi/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/admin/corridors")({
  head: () => ({
    meta: [
      { title: "Payout Corridors — NexaFi Admin" },
      { name: "description", content: "Manage international payout corridors, payout methods and corridor fees." },
      { property: "og:title", content: "Payout Corridors — NexaFi Admin" },
      { property: "og:description", content: "Manage international payout corridors, payout methods and corridor fees." },
    ],
  }),
  component: Page,
});

const methods = Object.keys(feeSchedule) as PayoutMethod[];

function Page() {
  const [disabled, setDisabled] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");

  const rows = corridors.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));
  const live = corridors.length - Object.values(disabled).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payout corridors"
        subtitle="Instant lanes, payout methods and pricing across the 190+ country network."
        action={<Button variant="outline" onClick={() => toast.success("Corridor config exported")}>Export</Button>}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Instant corridors" value={String(live)} />
        <StatCard label="Total reach" value="190+ countries" />
        <StatCard label="Mobile money lanes" value={String(corridors.filter((c) => c.methods.includes("mobile_money")).length)} />
        <StatCard label="Cash pickup lanes" value={String(corridors.filter((c) => c.methods.includes("cash_pickup")).length)} />
      </div>

      <GlassCard>
        <h2 className="font-display text-lg font-semibold">Method pricing</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((m) => (
            <div key={m} className="space-y-2 rounded-xl border border-border/60 p-3">
              <Label className="text-xs text-muted-foreground">{methodLabel[m]}</Label>
              <Input className="num" defaultValue={(feeSchedule[m].pct * 100).toFixed(2)} />
              <p className="num text-xs text-muted-foreground">+ ${feeSchedule[m].fixedUsd.toFixed(2)} fixed</p>
            </div>
          ))}
        </div>
        <Button className="brand-gradient mt-4 text-white" onClick={() => toast.success("Pricing updated")}>
          Save pricing
        </Button>
      </GlassCard>

      <Input placeholder="Search corridor" value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-sm" />

      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Methods</TableHead>
              <TableHead>Settlement</TableHead>
              <TableHead className="text-right">Enabled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => (
              <TableRow key={c.code}>
                <TableCell>
                  <span className="mr-2 text-lg">{c.flag}</span>
                  {c.name}
                </TableCell>
                <TableCell className="num">{c.currency}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {c.methods.map((m) => methodLabel[m]).join(" · ")}
                </TableCell>
                <TableCell>
                  <Badge variant={c.eta === "Instant" ? "secondary" : "outline"}>{c.eta}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Switch
                    checked={!disabled[c.code]}
                    onCheckedChange={(on) => {
                      setDisabled((d) => ({ ...d, [c.code]: !on }));
                      toast.success(`${c.name} ${on ? "enabled" : "paused"}`);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  );
}
