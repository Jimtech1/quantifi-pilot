import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CURRENCIES = ["NGN", "USD", "GBP", "EUR"] as const;
const CurrencyEnum = z.enum(CURRENCIES);

/** Indicative FX rates against USD. Kept server-side so pricing stays consistent. */
const USD_RATE: Record<string, number> = { NGN: 1580, USD: 1, GBP: 0.78, EUR: 0.92 };

function convert(amount: number, from: string, to: string) {
  const usd = amount / (USD_RATE[from] ?? 1);
  return usd * (USD_RATE[to] ?? 1);
}

function ref(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1000)}`;
}

export const getAccountOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [accounts, wallets, beneficiaries, transactions, profile] = await Promise.all([
      supabase.from("accounts").select("*").eq("user_id", userId).order("currency"),
      supabase.from("wallets").select("*").eq("user_id", userId),
      supabase.from("beneficiaries").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("transactions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(25),
      supabase.from("profiles").select("full_name, kyc_status, kyc_tier").eq("id", userId).maybeSingle(),
    ]);

    return {
      accounts: accounts.data ?? [],
      wallet: wallets.data?.[0] ?? null,
      beneficiaries: beneficiaries.data ?? [],
      transactions: transactions.data ?? [],
      profile: profile.data ?? null,
      rates: USD_RATE,
    };
  });

const DepositInput = z.object({
  currency: CurrencyEnum,
  amount: z.number().positive().max(50_000_000),
  method: z.enum(["bank_transfer", "card", "crypto"]),
});

/** Simulated money-in. Live rails replace this once banking credentials are issued. */
export const recordDeposit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => DepositInput.parse(input))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: account } = await supabaseAdmin
      .from("accounts")
      .select("*")
      .eq("user_id", userId)
      .eq("currency", data.currency)
      .maybeSingle();
    if (!account) throw new Error("Account not found for that currency.");

    const fee = data.method === "card" ? Number((data.amount * 0.014).toFixed(2)) : 0;
    const net = Number((data.amount - fee).toFixed(2));
    const reference = ref("DEP");

    await supabaseAdmin
      .from("accounts")
      .update({ balance: Number(account.balance) + net })
      .eq("id", account.id);

    await supabaseAdmin.from("transactions").insert({
      user_id: userId,
      account_id: account.id,
      direction: "in",
      kind: data.method === "crypto" ? "crypto_deposit" : data.method === "card" ? "card_topup" : "bank_deposit",
      currency: data.currency,
      amount: net,
      fee,
      status: "completed",
      reference,
      counterparty: data.method === "crypto" ? "BNB Chain" : "NexaFi receivable account",
      chain_tx_hash:
        data.method === "crypto"
          ? `0x${Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")}`
          : null,
    });

    return { reference, credited: net, fee };
  });

const ConvertInput = z.object({
  from: CurrencyEnum,
  to: CurrencyEnum,
  amount: z.number().positive(),
});

export const convertFunds = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => {
    const parsed = ConvertInput.parse(input);
    if (parsed.from === parsed.to) throw new Error("Choose two different currencies.");
    return parsed;
  })
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: accounts } = await supabaseAdmin
      .from("accounts")
      .select("*")
      .eq("user_id", userId)
      .in("currency", [data.from, data.to]);

    const source = accounts?.find((a) => a.currency === data.from);
    const target = accounts?.find((a) => a.currency === data.to);
    if (!source || !target) throw new Error("Both accounts are required for this conversion.");
    if (Number(source.balance) < data.amount) throw new Error("Not enough balance in the source account.");

    const received = Number(convert(data.amount, data.from, data.to).toFixed(2));
    const reference = ref("FX");

    await supabaseAdmin.from("accounts").update({ balance: Number(source.balance) - data.amount }).eq("id", source.id);
    await supabaseAdmin.from("accounts").update({ balance: Number(target.balance) + received }).eq("id", target.id);

    await supabaseAdmin.from("transactions").insert([
      {
        user_id: userId,
        account_id: source.id,
        direction: "out",
        kind: "fx_convert",
        currency: data.from,
        amount: data.amount,
        status: "completed",
        reference,
        counterparty: `Converted to ${data.to}`,
      },
      {
        user_id: userId,
        account_id: target.id,
        direction: "in",
        kind: "fx_convert",
        currency: data.to,
        amount: received,
        status: "completed",
        reference,
        counterparty: `Converted from ${data.from}`,
      },
    ]);

    return { reference, received, rate: Number((received / data.amount).toFixed(6)) };
  });

const PayoutInput = z.object({
  currency: CurrencyEnum,
  amount: z.number().positive(),
  beneficiaryId: z.string().uuid(),
});

export const sendPayout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => PayoutInput.parse(input))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: account }, { data: beneficiary }] = await Promise.all([
      supabaseAdmin.from("accounts").select("*").eq("user_id", userId).eq("currency", data.currency).maybeSingle(),
      supabaseAdmin.from("beneficiaries").select("*").eq("user_id", userId).eq("id", data.beneficiaryId).maybeSingle(),
    ]);
    if (!account) throw new Error("Account not found for that currency.");
    if (!beneficiary) throw new Error("Beneficiary not found.");

    const fee = data.currency === "NGN" ? 50 : 1;
    const total = data.amount + fee;
    if (Number(account.balance) < total) throw new Error("Not enough balance to cover this payout and its fee.");

    const reference = ref("PAY");
    const { bankingRail, chainRail } = await import("./anchor.server");

    let chainHash: string | null = null;
    if (beneficiary.kind === "crypto" && beneficiary.wallet_address) {
      const result = await chainRail.sendToken({
        address: beneficiary.wallet_address,
        amount: data.amount,
        token: "USDT",
        reference,
      });
      chainHash = result.hash;
    } else {
      await bankingRail.createPayout({
        currency: data.currency,
        amount: data.amount,
        bankName: beneficiary.bank_name,
        accountNumber: beneficiary.account_number,
        reference,
      });
    }

    await supabaseAdmin.from("accounts").update({ balance: Number(account.balance) - total }).eq("id", account.id);
    await supabaseAdmin.from("transactions").insert({
      user_id: userId,
      account_id: account.id,
      direction: "out",
      kind: beneficiary.kind === "crypto" ? "crypto_payout" : "bank_payout",
      currency: data.currency,
      amount: data.amount,
      fee,
      status: "processing",
      reference,
      counterparty: beneficiary.label,
      chain_tx_hash: chainHash,
    });

    return { reference, fee, chainHash };
  });

const BeneficiaryInput = z.object({
  label: z.string().min(2).max(60),
  kind: z.enum(["bank", "crypto"]),
  currency: CurrencyEnum.optional(),
  bankName: z.string().max(80).optional(),
  accountNumber: z.string().max(34).optional(),
  walletAddress: z.string().max(64).optional(),
});

export const saveBeneficiary = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => BeneficiaryInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("beneficiaries").insert({
      user_id: userId,
      label: data.label,
      kind: data.kind,
      currency: data.currency ?? null,
      bank_name: data.bankName ?? null,
      account_number: data.accountNumber ?? null,
      wallet_address: data.walletAddress ?? null,
      network: data.kind === "crypto" ? "BNB Chain" : null,
    });
    if (error) throw new Error("Could not save that beneficiary.");
    return { ok: true };
  });

export const removeBeneficiary = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await supabase.from("beneficiaries").delete().eq("id", data.id).eq("user_id", userId);
    return { ok: true };
  });
