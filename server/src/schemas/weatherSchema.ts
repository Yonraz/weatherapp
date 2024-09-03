import { z } from "zod";

export const weatherConditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
  code: z.number(),
});

export const locationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  localtime: z.string(),
  country: z.string(),
});

export const hourSchema = z.object({
  time: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
});

export const forecastdaySchema = z.object({
  date: z.string(),
  hour: z.array(hourSchema),
});

export const forecastSchema = z.object({
  forecastday: z.array(forecastdaySchema),
});

export const currentTimeSchema = z.object({
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
  last_updated: z.string(),
  forecast: forecastSchema,
});
