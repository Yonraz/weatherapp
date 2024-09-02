import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import axios, { AxiosError } from "axios";
import { BadRequestError } from "../models/errors/badRequestError";
import { NotFoundError } from "../models/errors/notFoundError";
import { validateWeatherData } from "../utils/weatherApiValidations";
import { trimCityData, trimWeatherData } from "../utils/dataNormalizer";
import { validateCityData } from "../utils/cityApiValidations";
import { CityData } from "../utils/citySchema";

dotenv.config();
const BASE_URL = process.env.WEATHER_API_BASE_URL;
const API_KEY = process.env.WEATHER_API_KEY;

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;
    if (!query) throw new BadRequestError("Must provide a valid query!");
    const url = `${BASE_URL}/forecast.json?q=${query}&key=${API_KEY}`;
    const { data } = await axios.get(url);
    if (!data) throw new NotFoundError();
    const weatherData = validateWeatherData(data);
    const weatherResponse = trimWeatherData(weatherData);
    return res.status(200).send(weatherResponse);
  } catch (error) {
    next(error);
  }
};

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
