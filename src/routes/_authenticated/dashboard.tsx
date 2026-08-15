import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  CreditCard,
  Gauge,
  HelpCircle,
  LineChart,
  Receipt,
  Send,
  Settings,
  Target,
  Wallet,
  Landmark,
} from "lucide-react";
import { AppShell, type NavItem } from "@/components/nexafi/app-shell";
import { user } from "@/lib/mock-data";

const items: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: Gauge },
  { label: "AI Copilot", to: "/dashboard/copilot", icon: Bot },
  { label: "Accounts", to: "/dashboard/accounts", icon: Landmark },
  { label: "Portfolio", to: "/dashboard/portfolio", icon: Wallet },
  { label: "Markets", to: "/dashboard/markets", icon: LineChart },
  { label: "Spend", to: "/dashboard/spend", icon: CreditCard },
  { label: "Send / Receive", to: "/dashboard/send-receive", icon: Send },
  { label: "Transactions", to: "/dashboard/transactions", icon: Receipt },
  { label: "Goals", to: "/dashboard/goals", icon: Target },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
  { label: "Help & Support", to: "/dashboard/help", icon: HelpCircle },
];

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return <AppShell items={items} badge="Pro plan · AI active" who={user.name} initials={user.initials} />;
}
