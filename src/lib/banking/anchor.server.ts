/**
 * Internal banking rail. Never referenced in user-facing copy or UI.
 * The product surface only speaks about "NexaFi accounts".
 */

export type Currency = "NGN" | "USD" | "GBP" | "EUR";

const BASE_URL = "https://api.getanchor.co/api/v1";

type PayoutInput = {
  currency: Currency;
  amount: number;
  bankName?: string | null;
  accountNumber?: string | null;
  reference: string;
};

type ChainTransferInput = {
  address: string;
  amount: number;
  token: string;
  reference: string;
};

function apiKey() {
  return process.env["ANCHOR_API_KEY"];
}

/** Banking rail client — simulates upstream until live credentials are present. */
export const bankingRail = {
  simulated() {
    return !apiKey();
  },

  async createPayout(input: PayoutInput) {
    const key = apiKey();
    if (!key) {
      return { reference: input.reference, status: "pending", simulated: true };
    }
    const res = await fetch(`${BASE_URL}/payments`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-anchor-key": key },
      body: JSON.stringify({
        currency: input.currency,
        amount: Math.round(input.amount * 100),
        counterparty: { bankName: input.bankName, accountNumber: input.accountNumber },
        reference: input.reference,
      }),
    });
    if (!res.ok) throw new Error("Payout could not be completed right now.");
    return { reference: input.reference, status: "processing", simulated: false };
  },
};

/** BNB Chain settlement layer for all on-chain operations. */
export const chainRail = {
  chainId: 56,
  explorer: "https://bscscan.com/tx/",
  tokens: ["USDT", "USDC", "BNB"] as const,

  async sendToken(input: ChainTransferInput) {
    // Broadcast happens through the custody provider; simulated in this build.
    const hash = `0x${Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")}`;
    return { hash, chainId: 56, status: "pending", reference: input.reference };
  },
};
