import { InternalServerError } from "../models/errors/internalServerError";
import { weatherDataSchema, weatherResponseSchema } from "./weatherSchema";

export const validateWeatherData = (data: any) => {
  try {
    const obj = weatherDataSchema.parse(data);
    return obj;
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Could not process weather data");
  }
};

export const validateWeatherResponse = (res: any) => {
  try {
    const obj = weatherResponseSchema.parse(res);
    return obj;
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Could not process weather data");
  }
};
