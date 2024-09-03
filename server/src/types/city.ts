import { z } from "zod";
import { cityResponseSchema, citySchema } from "../schemas/citySchema";

export type CityResponse = z.infer<typeof cityResponseSchema>;
export type CityData = z.infer<typeof citySchema>;
