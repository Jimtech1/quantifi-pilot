import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ActivateInput = z.object({
  strategy: z.enum(["SMART_SAVE", "GROWTH", "STABLE", "AGGRESSIVE"]),
  amount: z.number().positive(),
});

/** Activates a NexaFi strategy for the demo user. Routing details stay server-side. */
export const activateStrategy = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ActivateInput.parse(input))
  .handler(async ({ data }) => {
    const { StrategyService } = await import("./nomba-strategy.server");
    const service = new StrategyService(process.env["PROVIDER_API_KEY"]);
    const result = await service.executeStrategy("demo-user", data.strategy, data.amount);
    return {
      reference: result.reference,
      projectedApy: result.projectedApy,
      message: `Your funds are now working inside the NexaFi ${data.strategy
        .toLowerCase()
        .replace("_", " ")} strategy.`,
    };
  });
