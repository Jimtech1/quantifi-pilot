/**
 * Internal yield routing layer. Never referenced in user-facing copy or UI.
 * The product surface only ever speaks about "NexaFi strategies".
 */

type Product = "SAFE_STASH" | "FIXED_DEPOSIT" | "MONEY_MARKET";

export type StrategyType = "SMART_SAVE" | "GROWTH" | "STABLE" | "AGGRESSIVE";

type Allocation = { product: Product; percentage: number };

const ALLOCATIONS: Record<StrategyType, Allocation[]> = {
  SMART_SAVE: [{ product: "SAFE_STASH", percentage: 100 }],
  STABLE: [
    { product: "SAFE_STASH", percentage: 70 },
    { product: "FIXED_DEPOSIT", percentage: 30 },
  ],
  GROWTH: [
    { product: "SAFE_STASH", percentage: 40 },
    { product: "FIXED_DEPOSIT", percentage: 30 },
    { product: "MONEY_MARKET", percentage: 30 },
  ],
  AGGRESSIVE: [
    { product: "MONEY_MARKET", percentage: 60 },
    { product: "FIXED_DEPOSIT", percentage: 40 },
  ],
};

/**
 * Provider client. In the demo build this simulates the upstream provider;
 * swap the transport for real credentials without touching any UI code.
 */
class ProviderClient {
  constructor(private readonly apiKey: string | undefined) {}

  async allocateFunds(input: { userId: string; amount: number; allocations: Allocation[] }) {
    if (!this.apiKey) {
      return {
        reference: `sim_${Date.now().toString(36)}`,
        simulated: true,
        ...input,
      };
    }
    // Real transport would post to the provider here.
    return { reference: `ref_${Date.now().toString(36)}`, simulated: false, ...input };
  }
}

export class StrategyService {
  private readonly client: ProviderClient;

  constructor(apiKey?: string) {
    this.client = new ProviderClient(apiKey);
  }

  async executeStrategy(userId: string, strategyType: StrategyType, amount: number) {
    const allocations = ALLOCATIONS[strategyType] ?? ALLOCATIONS.SMART_SAVE;
    const result = await this.client.allocateFunds({ userId, amount, allocations });
    return {
      reference: result.reference,
      // Only NexaFi-branded facts leave this boundary.
      strategy: strategyType,
      amount,
      projectedApy: PROJECTED_APY[strategyType],
    };
  }
}

export const PROJECTED_APY: Record<StrategyType, string> = {
  SMART_SAVE: "15–20%",
  GROWTH: "10–18%",
  STABLE: "6–8%",
  AGGRESSIVE: "18–30%",
};
