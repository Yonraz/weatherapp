import { z } from "zod";

const weatherConditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
  code: z.number(),
});

const locationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  localtime: z.string(),
  country: z.string(),
});

const hourSchema = z.object({
  time: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
});

const forecastdaySchema = z.object({
  date: z.string(),
  hour: z.array(hourSchema),
});

const forecastSchema = z.object({
  forecastday: z.array(forecastdaySchema),
});

const currentTimeSchema = z.object({
  temp_c: z.number(),
  temp_f: z.number(),
  condition: weatherConditionSchema,
  wind_mph: z.number(),
  wind_kph: z.number(),
  precip_mm: z.number(),
  precip_in: z.number(),
  humidity: z.number(),
  last_updated: z.string(),
});

export const weatherDataSchema = z.object({
  location: locationSchema,
  current: currentTimeSchema,
  forecast: forecastSchema,
});

export const weatherResponseSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  localtime: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
  condition: weatherConditionSchema,
  country: z.string(),
  wind_mph: z.number(),
  wind_kph: z.number(),
  precip_mm: z.number(),
  precip_in: z.number(),
  humidity: z.number(),
  forecast: forecastSchema,
});
export type ForecastDay = z.infer<typeof forecastdaySchema>;
export type Forecast = z.infer<typeof forecastSchema>;
export type WeatherCondition = z.infer<typeof weatherConditionSchema>;
export type Hour = z.infer<typeof hourSchema>;
export type Location = z.infer<typeof locationSchema>;
export type CurrentTime = z.infer<typeof currentTimeSchema>;
export type WeatherData = z.infer<typeof weatherDataSchema>;
export type WeatherResponse = z.infer<typeof weatherResponseSchema>;
