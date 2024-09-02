import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { BadRequestError } from "../models/errors/badRequestError";
import { NotFoundError } from "../models/errors/notFoundError";
import { validateWeatherData } from "../utils/weatherApiValidations";
import { trimCityData, trimWeatherData } from "../utils/dataNormalizer";

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
    const err = validateWeatherData(data);
    if (err) throw err;
    const weatherData = trimWeatherData(data);
    return res.status(200).send(weatherData);
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
    if (!query) throw new BadRequestError("Must provide a valid city!");
    if (typeof query === "string" && query.length < 3) return [];
    const url = `${BASE_URL}/search.json?q=${query}&key=${API_KEY}`;
    const { data } = await axios.get(url);
    if (!data) throw new NotFoundError();
    const cities = trimCityData(data);
    return res.status(200).send(cities);
  } catch (err) {
    next(err);
  }
};
