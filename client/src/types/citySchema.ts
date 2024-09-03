import { z } from "zod";

export const cityResponseSchema = z.object({
  name: z.string(),
  lattitude: z.number(),
  longitude: z.number(),
  country: z.string(),
});
export type City = z.infer<typeof cityResponseSchema>;
