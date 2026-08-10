import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Bot,
  CreditCard,
  Gauge,
  Landmark,
  ScrollText,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { AppShell, type NavItem } from "@/components/nexafi/app-shell";

const items: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: Gauge },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Transactions", to: "/admin/transactions", icon: Wallet },
  { label: "AI Strategies", to: "/admin/strategies", icon: Bot },
  { label: "Analytics", to: "/admin/analytics", icon: Activity },
  { label: "Yield Opportunities", to: "/admin/yields", icon: Landmark },
  { label: "Cards", to: "/admin/cards", icon: CreditCard },
  { label: "System Settings", to: "/admin/settings", icon: Settings },
  { label: "Audit Log", to: "/admin/audit", icon: ScrollText },
];

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return <AppShell items={items} badge="Admin console" who="Ops Admin" initials="OA" />;
}
