import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeftRight, Copy, Loader2, Plus, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard, PageHeader } from "@/components/nexafi/app-shell";
import {
  convertFunds,
  getAccountOverview,
  recordDeposit,
  removeBeneficiary,
  saveBeneficiary,
  sendPayout,
} from "@/lib/banking/accounts.functions";

const title = "Accounts — NexaFi";
const description =
  "Receivable accounts in NGN, USD, GBP and EUR with instant FX, deposits, payouts and saved beneficiaries.";

export const Route = createFileRoute("/_authenticated/dashboard/accounts")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AccountsPage,
});

const SYMBOL: Record<string, string> = { NGN: "₦", USD: "$", GBP: "£", EUR: "€" };

function money(amount: number, currency: string) {
  return `${SYMBOL[currency] ?? ""}${Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function CopyField({ label, value }: { label: string; value: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(value);
        toast.success(`${label} copied`);
      }}
      className="group flex w-full items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-left transition hover:border-primary/50"
    >
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="block truncate font-mono text-sm">{value}</span>
      </span>
      <Copy className="ml-3 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
    </button>
  );
}

function AccountsPage() {
  const queryClient = useQueryClient();
  const fetchOverview = useServerFn(getAccountOverview);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["account-overview"],
    queryFn: () => fetchOverview(),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["account-overview"] });

  const deposit = useMutation({
    mutationFn: useServerFn(recordDeposit),
    onSuccess: (r) => {
      toast.success(`Deposit confirmed · ${r.reference}`);
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const convert = useMutation({
    mutationFn: useServerFn(convertFunds),
    onSuccess: (r) => {
      toast.success(`Converted at ${r.rate} · received ${r.received}`);
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const payout = useMutation({
    mutationFn: useServerFn(sendPayout),
    onSuccess: (r) => {
      toast.success(`Payout sent · ${r.reference}`);
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const addBeneficiary = useMutation({
    mutationFn: useServerFn(saveBeneficiary),
    onSuccess: () => {
      toast.success("Beneficiary saved");
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const dropBeneficiary = useMutation({
    mutationFn: useServerFn(removeBeneficiary),
    onSuccess: () => {
      toast.success("Beneficiary removed");
      void invalidate();
    },
  });

  const accounts = data?.accounts ?? [];
  const beneficiaries = data?.beneficiaries ?? [];
  const transactions = data?.transactions ?? [];

  const [depositCurrency, setDepositCurrency] = useState("NGN");
  const [depositAmount, setDepositAmount] = useState("");
  const [fxFrom, setFxFrom] = useState("USD");
  const [fxTo, setFxTo] = useState("NGN");
  const [fxAmount, setFxAmount] = useState("");
  const [payoutCurrency, setPayoutCurrency] = useState("NGN");
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutBeneficiary, setPayoutBeneficiary] = useState("");
  const [benef, setBenef] = useState({
    label: "",
    kind: "bank",
    bankName: "",
    accountNumber: "",
    walletAddress: "",
  });

  const fxPreview = useMemo(() => {
    const rates = data?.rates;
    const amount = Number(fxAmount);
    if (!rates || !amount) return null;
    const usd = amount / (rates[fxFrom] ?? 1);
    return usd * (rates[fxTo] ?? 1);
  }, [data?.rates, fxAmount, fxFrom, fxTo]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <GlassCard>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t load your accounts right now. Refresh the page to try again.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accounts"
        subtitle="Receivable accounts in NGN, USD, GBP and EUR — fund, convert and pay out in one place."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {accounts.map((account) => (
          <GlassCard key={account.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{account.currency} account</p>
                <p className="mt-1 text-2xl font-semibold">{money(Number(account.balance), account.currency)}</p>
                <p className="text-xs text-muted-foreground">{account.bank_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{account.status}</Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" aria-label={`Share ${account.currency} details`}>
                      <Share2 className="size-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{account.currency} receivable account</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4">
                      <div className="rounded-xl bg-white p-3">
                        <QRCodeSVG
                          value={[
                            account.account_name,
                            account.bank_name,
                            account.account_number,
                            account.iban,
                            account.sort_code,
                          ]
                            .filter(Boolean)
                            .join(" | ")}
                          size={168}
                        />
                      </div>
                      <p className="text-center text-xs text-muted-foreground">
                        Scan to share your {account.currency} account details.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <CopyField label="Account name" value={account.account_name} />
              {account.account_number ? <CopyField label="Account number" value={account.account_number} /> : null}
              {account.sort_code ? <CopyField label="Sort code" value={account.sort_code} /> : null}
              {account.iban ? <CopyField label="IBAN" value={account.iban} /> : null}
              {account.routing_number ? <CopyField label="Routing number" value={account.routing_number} /> : null}
              {account.swift_code ? <CopyField label="SWIFT / BIC" value={account.swift_code} /> : null}
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <GlassCard>
          <Tabs defaultValue="deposit">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="convert">Convert</TabsTrigger>
              <TabsTrigger value="payout">Pay out</TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="mt-5 space-y-4">
              <Tabs defaultValue="bank_transfer">
                <TabsList>
                  <TabsTrigger value="bank_transfer">Bank transfer</TabsTrigger>
                  <TabsTrigger value="card">Card top-up</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                </TabsList>

                {(["bank_transfer", "card", "crypto"] as const).map((method) => (
                  <TabsContent key={method} value={method} className="mt-4 space-y-4">
                    {method === "crypto" ? (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Send USDT, USDC or BNB on BNB Chain to your NexaFi wallet address.
                        </p>
                        {data?.wallet ? <CopyField label="BNB Chain address" value={data.wallet.address} /> : null}
                      </div>
                    ) : null}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Currency</Label>
                        <Select value={depositCurrency} onValueChange={setDepositCurrency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map((a) => (
                              <SelectItem key={a.id} value={a.currency}>
                                {a.currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Amount</Label>
                        <Input
                          inputMode="decimal"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    {method === "card" ? (
                      <p className="text-xs text-muted-foreground">Card top-ups carry a 1.4% processing fee.</p>
                    ) : null}
                    <Button
                      disabled={deposit.isPending || !Number(depositAmount)}
                      onClick={() =>
                        deposit.mutate({
                          data: { currency: depositCurrency, amount: Number(depositAmount), method },
                        })
                      }
                    >
                      {deposit.isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                      Confirm deposit
                    </Button>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="convert" className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>From</Label>
                  <Select value={fxFrom} onValueChange={setFxFrom}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((a) => (
                        <SelectItem key={a.id} value={a.currency}>
                          {a.currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>To</Label>
                  <Select value={fxTo} onValueChange={setFxTo}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((a) => (
                        <SelectItem key={a.id} value={a.currency}>
                          {a.currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input inputMode="decimal" value={fxAmount} onChange={(e) => setFxAmount(e.target.value)} />
                </div>
              </div>
              {fxPreview ? (
                <p className="text-sm text-muted-foreground">
                  <ArrowLeftRight className="mr-1 inline size-4" />
                  You receive about {money(fxPreview, fxTo)}
                </p>
              ) : null}
              <Button
                disabled={convert.isPending || !Number(fxAmount) || fxFrom === fxTo}
                onClick={() => convert.mutate({ data: { from: fxFrom, to: fxTo, amount: Number(fxAmount) } })}
              >
                {convert.isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                Convert
              </Button>
            </TabsContent>

            <TabsContent value="payout" className="mt-5 space-y-4">
              {beneficiaries.length === 0 ? (
                <p className="text-sm text-muted-foreground">Add a beneficiary first to send a payout.</p>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={payoutCurrency} onValueChange={setPayoutCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((a) => (
                        <SelectItem key={a.id} value={a.currency}>
                          {a.currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Beneficiary</Label>
                  <Select value={payoutBeneficiary} onValueChange={setPayoutBeneficiary}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {beneficiaries.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input inputMode="decimal" value={payoutAmount} onChange={(e) => setPayoutAmount(e.target.value)} />
                </div>
              </div>
              <Button
                disabled={payout.isPending || !payoutBeneficiary || !Number(payoutAmount)}
                onClick={() =>
                  payout.mutate({
                    data: {
                      currency: payoutCurrency,
                      amount: Number(payoutAmount),
                      beneficiaryId: payoutBeneficiary,
                    },
                  })
                }
              >
                {payout.isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                Send payout
              </Button>
            </TabsContent>
          </Tabs>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Beneficiaries</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary">
                  <Plus className="mr-1 size-4" /> Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New beneficiary</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input value={benef.label} onChange={(e) => setBenef({ ...benef, label: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={benef.kind} onValueChange={(v) => setBenef({ ...benef, kind: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank account</SelectItem>
                        <SelectItem value="crypto">BNB Chain wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {benef.kind === "bank" ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Bank</Label>
                        <Input
                          value={benef.bankName}
                          onChange={(e) => setBenef({ ...benef, bankName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Account number</Label>
                        <Input
                          value={benef.accountNumber}
                          onChange={(e) => setBenef({ ...benef, accountNumber: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>Wallet address</Label>
                      <Input
                        value={benef.walletAddress}
                        onChange={(e) => setBenef({ ...benef, walletAddress: e.target.value })}
                      />
                    </div>
                  )}
                  <Button
                    disabled={addBeneficiary.isPending || benef.label.trim().length < 2}
                    onClick={() =>
                      addBeneficiary.mutate({
                        data: {
                          label: benef.label,
                          kind: benef.kind as "bank" | "crypto",
                          bankName: benef.bankName || undefined,
                          accountNumber: benef.accountNumber || undefined,
                          walletAddress: benef.walletAddress || undefined,
                        },
                      })
                    }
                  >
                    Save beneficiary
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-4 space-y-2">
            {beneficiaries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No saved beneficiaries yet.</p>
            ) : (
              beneficiaries.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{b.label}</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {b.kind === "crypto" ? b.wallet_address : `${b.bank_name ?? ""} · ${b.account_number ?? ""}`}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Remove ${b.label}`}
                    onClick={() => dropBeneficiary.mutate({ data: { id: b.id } })}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h2 className="text-sm font-semibold">Recent account activity</h2>
        <div className="mt-3 space-y-2">
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No movements yet — make your first deposit above.</p>
          ) : (
            transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium capitalize">{t.kind.replace(/_/g, " ")}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.counterparty ?? t.reference} · {new Date(t.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={t.direction === "in" ? "text-emerald-400" : ""}>
                    {t.direction === "in" ? "+" : "−"}
                    {money(Number(t.amount), t.currency)}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}
