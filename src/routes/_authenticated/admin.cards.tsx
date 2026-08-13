import { createFileRoute } from "@tanstack/react-router";
import { adminCards } from "@/lib/mock-data";
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

export const Route = createFileRoute("/admin/cards")({
  head: () => ({
    meta: [
      { title: "Cards — NexaFi Admin" },
      { name: "description", content: "Issue, freeze and monitor NexaFi virtual and physical cards." },
      { property: "og:title", content: "Cards — NexaFi Admin" },
      { property: "og:description", content: "Issue, freeze and monitor NexaFi virtual and physical cards." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Cards" subtitle="Issued cards and spend controls." />
      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Card ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>30d spend</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminCards.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="num">{c.id}</TableCell>
                <TableCell className="num">{c.user}</TableCell>
                <TableCell>{c.type}</TableCell>
                <TableCell className="num">{c.spend}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={c.status === "Active" ? "secondary" : "outline"}>{c.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  );
}
