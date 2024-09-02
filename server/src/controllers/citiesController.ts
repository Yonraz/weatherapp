import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { trimCityData } from "../utils/dataNormalizer";
import { validateCityData } from "../utils/cityApiValidations";
import { CityData } from "../utils/citySchema";

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
    const url = `${BASE_URL}/search.json?q=${query}&key=${API_KEY}`;
    const response = await axios.get(url);
    if (!response.data || response.data.length === 0) {
      return res.status(200).send([]);
    }
    const cityData: CityData[] = response.data.map((city: any) =>
      validateCityData(city)
    );
    const cities = trimCityData(cityData);
    return res.status(200).send(cities);
  } catch (err) {
    next(err);
  }
};
