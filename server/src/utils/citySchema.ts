import { z } from "zod";

export const citySchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
});

export const cityResponseSchema = z.object({
  name: z.string(),
  lattitude: z.number(),
  longitude: z.number(),
  country: z.string(),
});

export type CityData = z.infer<typeof citySchema>;
export type CityResponse = z.infer<typeof cityResponseSchema>;