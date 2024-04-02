import { z } from "zod";

export const onRampTransactionSchema = z.object({
  id: z.string(),
  status: z.string(),
  token: z.string(),
  provider: z.string(),
  amount: z.number(),
  startTime: z.date(),
  userId: z.number(),
});

export const UpdateRampTranaction = onRampTransactionSchema.pick({
  amount: true,
  token: true,
  userId: true,
});
export type UpdateRampTranactionType = z.infer<typeof UpdateRampTranaction>;
