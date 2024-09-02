import { InternalServerError } from "../models/errors/internalServerError";
import { City } from "../types/city";
import { CityData, cityResponseSchema, citySchema } from "./citySchema";

export const validateCityResponse = (res: any) => {
  try {
    const obj = cityResponseSchema.parse(res);
    return obj;
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Could not process city data");
  }
};

export const validateCityData = (res: any) => {
  try {
    const obj: CityData = citySchema.parse(res);
    return obj;
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Could not process city data");
  }
};
