import { createFileRoute } from "@tanstack/react-router";
import { adminAudit } from "@/lib/mock-data";
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

export const Route = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [
      { title: "Audit Log — NexaFi Admin" },
      { name: "description", content: "Immutable record of every administrative action on NexaFi." },
      { property: "og:title", content: "Audit Log — NexaFi Admin" },
      { property: "og:description", content: "Immutable record of every administrative action on NexaFi." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Audit log" subtitle="Every admin action, permanently recorded." />
      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminAudit.map((a) => (
              <TableRow key={a.time}>
                <TableCell className="num text-muted-foreground">{a.time}</TableCell>
                <TableCell>{a.actor}</TableCell>
                <TableCell>{a.action}</TableCell>
                <TableCell className="num text-right text-muted-foreground">{a.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  );
}
