import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Globe2, Loader2, RefreshCw, Search, Upload, Zap } from "lucide-react";
import { toast } from "sonner";
import {
  corridors,
  corridorMap,
  feeSchedule,
  methodLabel,
  type PayoutMethod,
} from "@/lib/transfer/corridors";
import { getTransferQuote, sendBulkTransfers, sendInternationalTransfer } from "@/lib/transfer/transfer.functions";
import { GlassCard, PageHeader, StatCard } from "@/components/nexafi/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/dashboard/transfer")({
  head: () => ({
    meta: [
      { title: "International Transfers — NexaFi" },
      { name: "description", content: "Send money to 190+ countries with live quotes, bank and mobile money payouts, and bulk transfers." },
      { property: "og:title", content: "International Transfers — NexaFi" },
      { property: "og:description", content: "Send money to 190+ countries with live quotes, bank and mobile money payouts, and bulk transfers." },
    ],
  }),
  component: TransferPage,
});

const SOURCES = ["NGN", "USD", "GBP", "EUR"] as const;

function money(value: number, currency: string) {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value)} ${currency}`;
}

function TransferPage() {
  const quoteFn = useServerFn(getTransferQuote);
  const sendFn = useServerFn(sendInternationalTransfer);
  const bulkFn = useServerFn(sendBulkTransfers);

  const [source, setSource] = useState<(typeof SOURCES)[number]>("USD");
  const [destination, setDestination] = useState("NG");
  const [method, setMethod] = useState<PayoutMethod>("bank");
  const [amount, setAmount] = useState("500");
  const [search, setSearch] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [swift, setSwift] = useState("");
  const [mobileNetwork, setMobileNetwork] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reason, setReason] = useState("Family support");

  const [bulkText, setBulkText] = useState("Ada Obi,NG,mobile_money,150\nJohn Smith,GB,bank,320\nMaria Silva,BR,bank,240");

  const corridor = corridorMap.get(destination)!;
  const numericAmount = Number(amount) || 0;

  useEffect(() => {
    if (!corridor.methods.includes(method)) setMethod(corridor.methods[0]!);
  }, [corridor, method]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return corridors;
    return corridors.filter((c) => c.name.toLowerCase().includes(q) || c.currency.toLowerCase().includes(q));
  }, [search]);

  const quote = useQuery({
    queryKey: ["quote", source, destination, method, numericAmount],
    queryFn: () => quoteFn({ data: { source, destination, method, amount: numericAmount } }),
    enabled: numericAmount > 0,
    refetchInterval: 30_000,
  });

  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    setCountdown(30);
    const t = setInterval(() => setCountdown((c) => (c <= 1 ? 30 : c - 1)), 1000);
    return () => clearInterval(t);
  }, [quote.dataUpdatedAt]);

  const send = useMutation({
    mutationFn: () =>
      sendFn({
        data: {
          source,
          destination,
          method,
          amount: numericAmount,
          recipient: {
            fullName,
            email: email || null,
            phone: phone || null,
            addressLine: addressLine || null,
            bankName: bankName || null,
            accountNumber: accountNumber || null,
            swift: swift || null,
            mobileNetwork: mobileNetwork || null,
            mobileNumber: mobileNumber || null,
            reason: reason || null,
          },
        },
      }),
    onSuccess: (res) => toast.success(`Transfer ${res.reference} is on its way to ${res.quote.country}.`),
    onError: (e: Error) => toast.error(e.message),
  });

  const bulkRows = useMemo(() => {
    return bulkText
      .split("\n")
      .map((line) => line.split(",").map((p) => p.trim()))
      .filter((p) => p.length >= 4 && p[0])
      .map((p) => ({
        fullName: p[0]!,
        destination: (p[1] ?? "").toUpperCase(),
        method: (p[2] ?? "bank") as PayoutMethod,
        amount: Number(p[3]) || 0,
      }))
      .filter((r) => corridorMap.has(r.destination) && r.amount > 0);
  }, [bulkText]);

  const bulkTotal = bulkRows.reduce((s, r) => s + r.amount, 0);

  const bulk = useMutation({
    mutationFn: () => bulkFn({ data: { source, rows: bulkRows } }),
    onSuccess: (res) => toast.success(`Batch ${res.batchRef} queued — ${res.count} payouts.`),
    onError: (e: Error) => toast.error(e.message),
  });

  const canSend = fullName.trim().length > 1 && numericAmount > 0 && !!quote.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transfer"
        subtitle="International payouts to 190+ countries — bank, mobile money, cash pickup and wallet."
        action={
          <Badge variant="secondary" className="gap-1">
            <Globe2 className="h-3.5 w-3.5" /> 190+ countries
          </Badge>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Live corridors" value={`${corridors.length} instant`} />
        <StatCard label="Avg. settlement" value={corridor.eta} />
        <StatCard label="Payout methods" value={String(corridor.methods.length)} />
        <StatCard label="FX margin" value="0.4%" tone="success" />
      </div>

      <Tabs defaultValue="single">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="single">Single transfer</TabsTrigger>
          <TabsTrigger value="bulk">Bulk transfer</TabsTrigger>
          <TabsTrigger value="corridors">Corridors</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="mt-5">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <GlassCard className="space-y-5">
              <h2 className="font-display text-lg font-semibold">Transfer details</h2>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>You send</Label>
                  <Select value={source} onValueChange={(v) => setSource(v as typeof source)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amt">Amount</Label>
                  <Input id="amt" className="num" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Destination</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-72">
                      {corridors.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          <span className="mr-2">{c.flag}</span>{c.name} · {c.currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payout method</Label>
                <div className="flex flex-wrap gap-2">
                  {corridor.methods.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`rounded-xl border px-3.5 py-2 text-sm transition-colors ${
                        method === m ? "border-primary bg-primary/10 text-foreground" : "border-border/60 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {methodLabel[m]}
                      <span className="num ml-2 text-xs text-muted-foreground">
                        {(feeSchedule[m].pct * 100).toFixed(2)}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-border/60 bg-background/30 p-4">
                <p className="text-sm font-medium">Recipient</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rname">Full name</Label>
                    <Input id="rname" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ada Obi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="remail">Email</Label>
                    <Input id="remail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rphone">Phone</Label>
                    <Input id="rphone" className="num" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234…" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="raddr">Address</Label>
                    <Input id="raddr" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} placeholder="12 Marina Rd, Lagos" />
                  </div>
                </div>

                {method === "mobile_money" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Mobile money network</Label>
                      <Select value={mobileNetwork} onValueChange={setMobileNetwork}>
                        <SelectTrigger><SelectValue placeholder="Select network" /></SelectTrigger>
                        <SelectContent>
                          {(corridor.mobileNetworks ?? ["Mobile wallet"]).map((n) => (
                            <SelectItem key={n} value={n}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mnum">Mobile money number</Label>
                      <Input id="mnum" className="num" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                    </div>
                  </div>
                ) : method === "cash_pickup" ? (
                  <p className="text-xs text-muted-foreground">
                    Cash pickup uses the recipient&apos;s name and phone number. They collect at any partner agent in {corridor.name} with a valid ID.
                  </p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="bank">Bank name</Label>
                      <Input id="bank" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acct">Account / IBAN</Label>
                      <Input id="acct" className="num" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="swift">SWIFT / routing</Label>
                      <Input id="swift" className="num" value={swift} onChange={(e) => setSwift(e.target.value)} />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for transfer</Label>
                  <Input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>
              </div>
            </GlassCard>

            <div className="space-y-4">
              <GlassCard className="border-primary/30">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold">Live quote</h2>
                  <button
                    type="button"
                    onClick={() => void quote.refetch()}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${quote.isFetching ? "animate-spin" : ""}`} /> {countdown}s
                  </button>
                </div>
                <Progress value={(countdown / 30) * 100} className="mt-3 h-1" />

                {quote.isLoading ? (
                  <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : quote.data ? (
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">You send</span>
                      <span className="num font-medium">{money(numericAmount, source)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fee ({methodLabel[method]})</span>
                      <span className="num">{money(quote.data.fee, source)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Exchange rate</span>
                      <span className="num">1 {source} = {quote.data.rate} {quote.data.receiveCurrency}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/60 pt-3">
                      <span className="text-muted-foreground">Recipient gets</span>
                      <span className="num text-lg font-semibold text-success">
                        {money(quote.data.receives, quote.data.receiveCurrency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Arrives</span>
                      <span>{quote.data.flag} {quote.data.eta}</span>
                    </div>
                    <Button
                      className="brand-gradient mt-2 w-full text-white"
                      disabled={!canSend || send.isPending}
                      onClick={() => send.mutate()}
                    >
                      {send.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                      Send {money(numericAmount, source)}
                    </Button>
                    {!canSend && <p className="text-xs text-muted-foreground">Add a recipient name to continue.</p>}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">Enter an amount to see a live quote.</p>
                )}
              </GlassCard>

              <GlassCard className="border-accent/30">
                <p className="text-sm">
                  <Zap className="mr-1 inline h-4 w-4 text-accent" />
                  <span className="font-medium">AI routing:</span> this corridor is settling via the cheapest
                  available rail right now — you save an estimated 62% versus a typical bank wire.
                </p>
              </GlassCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="mt-5">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <GlassCard className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Bulk payouts</h2>
                <Badge variant="outline" className="gap-1"><Upload className="h-3.5 w-3.5" /> CSV paste</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                One recipient per line: <span className="num">name, country code, method, amount</span> — e.g.
                <span className="num"> Ada Obi,NG,mobile_money,150</span>
              </p>
              <Textarea rows={10} className="num" value={bulkText} onChange={(e) => setBulkText(e.target.value)} />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  className="brand-gradient text-white"
                  disabled={bulkRows.length === 0 || bulk.isPending}
                  onClick={() => bulk.mutate()}
                >
                  {bulk.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send {bulkRows.length} payouts
                </Button>
                <span className="num text-sm text-muted-foreground">Total {money(bulkTotal, source)}</span>
              </div>
            </GlassCard>

            <GlassCard className="p-0">
              <div className="p-5 pb-0">
                <h2 className="font-display text-lg font-semibold">Batch preview</h2>
              </div>
              <Table className="mt-3">
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bulkRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                        No valid rows yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {bulkRows.map((r, i) => (
                    <TableRow key={`${r.fullName}-${i}`}>
                      <TableCell>{r.fullName}</TableCell>
                      <TableCell>
                        {corridorMap.get(r.destination)?.flag} {corridorMap.get(r.destination)?.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{methodLabel[r.method]}</TableCell>
                      <TableCell className="num text-right">{money(r.amount, source)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="corridors" className="mt-5 space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search country or currency" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setDestination(c.code)}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  destination === c.code ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.flag}</span>
                  <Badge variant="outline" className="num text-xs">{c.currency}</Badge>
                </div>
                <p className="mt-2 font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.methods.map((m) => methodLabel[m]).join(" · ")}</p>
                <p className="num mt-1 text-xs text-success">{c.eta}</p>
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Plus 150+ additional countries reachable via partner bank settlement within 1–2 business days.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
