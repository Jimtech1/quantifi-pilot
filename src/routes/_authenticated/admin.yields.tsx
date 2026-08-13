import { createFileRoute } from "@tanstack/react-router";
import { adminYields } from "@/lib/mock-data";
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

export const Route = createFileRoute("/_authenticated/admin/yields")({
  head: () => ({
    meta: [
      { title: "Yield Opportunities — NexaFi Admin" },
      { name: "description", content: "Manage the yield sources powering NexaFi strategies." },
      { property: "og:title", content: "Yield Opportunities — NexaFi Admin" },
      { property: "og:description", content: "Manage the yield sources powering NexaFi strategies." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Yield opportunities" subtitle="Sources feeding every NexaFi strategy." />
      <GlassCard className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pool</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>APY</TableHead>
              <TableHead>Capacity used</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminYields.map((y) => (
              <TableRow key={y.pool}>
                <TableCell className="font-medium">{y.pool}</TableCell>
                <TableCell>{y.category}</TableCell>
                <TableCell className="num text-success">{y.apy}</TableCell>
                <TableCell className="num">{y.capacity}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={y.status === "Live" ? "secondary" : "outline"}>{y.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  );
}
