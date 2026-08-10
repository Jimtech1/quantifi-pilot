import { useState, type ReactNode } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Menu, Search, X, type LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoWordmark } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export type NavItem = { label: string; to: string; icon: LucideIcon };

export function AppShell({
  items,
  badge,
  who,
  initials,
}: {
  items: NavItem[];
  badge: string;
  who: string;
  initials: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen mesh-bg">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[260px] shrink-0 border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-transform lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Link to="/">
              <LogoWordmark />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="px-4">
            <Badge variant="outline" className="w-full justify-center border-primary/40 text-primary">
              {badge}
            </Badge>
          </div>
          <nav className="mt-4 space-y-1 px-3 pb-6">
            {items.map((item) => {
              const active =
                pathname === item.to || (item.to !== "/dashboard" && item.to !== "/admin" && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    active
                      ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_var(--color-border)]"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 ${active ? "text-accent" : ""}`}
                    strokeWidth={active ? 2.4 : 1.8}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {open && (
          <button
            aria-label="Close navigation overlay"
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden max-w-sm flex-1 sm:block">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search assets, strategies, transactions…" className="pl-9" />
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <ThemeToggle />
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="h-[1.1rem] w-[1.1rem]" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
              </Button>
              <div className="flex items-center gap-2 rounded-full glass py-1 pr-3 pl-1">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="brand-gradient text-[11px] text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm sm:inline">{who}</span>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl glass p-5 soft-shadow ${className}`}>{children}</div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  tone = "muted",
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "muted" | "success" | "accent" | "destructive";
}) {
  const toneClass = {
    muted: "text-muted-foreground",
    success: "text-success",
    accent: "text-accent",
    destructive: "text-destructive",
  }[tone];

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute -top-16 -right-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
      <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="num mt-2 text-2xl font-semibold">{value}</p>
      {delta && <p className={`mt-1 text-xs ${toneClass}`}>{delta}</p>}
    </GlassCard>
  );
}
