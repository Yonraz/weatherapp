import { InternalServerError } from "../errors/internalServerError";
import { cityResponseSchema, citySchema } from "../schemas/citySchema";
import { CityData } from "../types/city";

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
