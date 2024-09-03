import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { getNormalizedCityData } from "../utils/dataNormalizer";
import { validateCityData } from "../utils/cityApiValidations";
import { CityData, CityResponse } from "../utils/citySchema";
import { cacheWrapper as cache } from "../cache";

dotenv.config();
const BASE_URL = process.env.WEATHER_API_BASE_URL;
const API_KEY = process.env.WEATHER_API_KEY;

export const getCities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string" || query.length < 3) {
      return res.status(200).send([]);
    }

    const cacheKey = query.toLocaleLowerCase();

    try {
      const cachedCities = cache.get<CityResponse[]>(cacheKey);
      if (cachedCities) {
        console.log("cache hit for " + query);
        return res.status(200).send(cachedCities);
      }
      console.log("cache miss for " + query);
    } catch (err) {
      console.error(err);
    }

    const url = `${BASE_URL}/search.json?q=${query}&key=${API_KEY}`;
    const response = await axios.get(url);
    if (!response.data) {
      return res.status(200).send([]);
    }
    const cityData: CityData[] = response.data.map((city: any) =>
      validateCityData(city)
    );
    const cities = getNormalizedCityData(cityData);

    try {
      cache.set(cacheKey, cities);
    } catch (err) {
      console.log("could not set cache");
      console.error(err);
    }

    return res.status(200).send(cities);
  } catch (err) {
    next(err);
  }
};
