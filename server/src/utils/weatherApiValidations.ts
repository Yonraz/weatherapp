import { z } from "zod";
import { InternalServerError } from "../models/errors/internalServerError";
import { weatherDataSchema, weatherResponseSchema } from "./weatherSchema";

export const validateWeatherData = (data: any) => {
  try {
    weatherDataSchema.parse(data);
    return null;
  } catch (error) {
    console.error(error);
    return new InternalServerError("Could not process weather data");
  }
};

export const validateWeatherResponse = (res: any) => {
  try {
    const obj = weatherResponseSchema.parse(res);
    return obj;
  } catch (error) {
    console.error(error);
    return new InternalServerError("Could not process weather data");
  }
};
