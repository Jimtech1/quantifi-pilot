import { createFileRoute } from "@tanstack/react-router";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { GlassCard, PageHeader } from "@/components/nexafi/app-shell";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — NexaFi" },
      { name: "description", content: "Profile, security, AI risk preferences, wallets and notifications." },
      { property: "og:title", content: "Settings — NexaFi" },
      { property: "og:description", content: "Profile, security, AI risk preferences, wallets and notifications." },
    ],
  }),
  component: SettingsPage,
});

const toggles = [
  { label: "Push notifications", desc: "Strategy events and large movements", on: true },
  { label: "Email digests", desc: "Weekly AI performance summary", on: true },
  { label: "AI risk alerts", desc: "Warn me before high-risk allocations", on: true },
  { label: "Auto-invest idle cash", desc: "Sweep balances above $500 into SmartSave", on: false },
];

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Control your profile, security and how the AI behaves." />

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <h2 className="font-display text-lg font-semibold">Profile</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue={user.phone} />
            </div>
            <Button className="brand-gradient text-white" onClick={() => toast.success("Profile saved")}>
              Save changes
            </Button>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="font-display text-lg font-semibold">Security</h2>
          <div className="mt-4 space-y-3">
            {["Change password", "Two-factor authentication", "Biometric login", "Recovery phrases"].map(
              (s) => (
                <div key={s} className="flex items-center justify-between rounded-xl border border-border/60 bg-background/30 px-3.5 py-2.5">
                  <span className="text-sm">{s}</span>
                  <Button size="sm" variant="ghost" onClick={() => toast(`${s} flow opened`)}>
                    Manage
                  </Button>
                </div>
              ),
            )}
          </div>
          <Separator className="my-5" />
          <h3 className="text-sm font-medium">Wallet connections</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.success("Wallet connected")}>
              Connect wallet
            </Button>
            <Button variant="ghost" onClick={() => toast("Showing connected wallets")}>
              View connected
            </Button>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="font-display text-lg font-semibold">AI preferences</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Risk tolerance</Label>
              <Select defaultValue="balanced">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {toggles.map((t) => (
              <div key={t.label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <Switch defaultChecked={t.on} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="font-display text-lg font-semibold">Language & region</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Region</Label>
              <Select defaultValue="ng">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ng">Nigeria</SelectItem>
                  <SelectItem value="gh">Ghana</SelectItem>
                  <SelectItem value="ke">Kenya</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="my-5" />
          <h3 className="text-sm font-medium">Support</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast("Support chat opened")}>
              Contact support
            </Button>
            <Button variant="ghost" onClick={() => toast("FAQ opened")}>
              FAQ
            </Button>
            <Button variant="ghost" onClick={() => toast("Docs opened")}>
              Docs
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
