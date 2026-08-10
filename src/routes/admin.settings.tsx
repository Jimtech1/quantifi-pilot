import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "System Settings — NexaFi Admin" },
      { name: "description", content: "Platform limits, fees and feature flags for NexaFi operators." },
      { property: "og:title", content: "System Settings — NexaFi Admin" },
      { property: "og:description", content: "Platform limits, fees and feature flags for NexaFi operators." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="System settings" subtitle="Fees, limits and feature flags." />
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <h2 className="font-display text-lg font-semibold">Fees & limits</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fee">Platform fee (%)</Label>
              <Input id="fee" defaultValue="0.75" className="num" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="limit">Daily withdrawal limit ($)</Label>
              <Input id="limit" defaultValue="250000" className="num" />
            </div>
            <Button className="brand-gradient text-white" onClick={() => toast.success("Settings saved")}>Save</Button>
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="font-display text-lg font-semibold">Feature flags</h2>
          <div className="mt-4 space-y-4">
            {[
              ["AI Copilot", true],
              ["Physical cards", false],
              ["Auto-rebalance", true],
              ["New strategy launches", true],
            ].map(([label, on]) => (
              <div key={String(label)} className="flex items-center justify-between">
                <span className="text-sm">{label}</span>
                <Switch defaultChecked={Boolean(on)} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
