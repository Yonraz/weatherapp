import { z } from "zod";
import {
  currentTimeSchema,
  forecastdaySchema,
  forecastSchema,
  hourSchema,
  locationSchema,
  weatherConditionSchema,
  weatherDataSchema,
  weatherResponseSchema,
} from "../schemas/weatherSchema";

export type ForecastDay = z.infer<typeof forecastdaySchema>;
export type Forecast = z.infer<typeof forecastSchema>;
export type WeatherCondition = z.infer<typeof weatherConditionSchema>;
export type Hour = z.infer<typeof hourSchema>;
export type Location = z.infer<typeof locationSchema>;
export type CurrentTime = z.infer<typeof currentTimeSchema>;
export type WeatherData = z.infer<typeof weatherDataSchema>;
export type WeatherResponse = z.infer<typeof weatherResponseSchema>;
