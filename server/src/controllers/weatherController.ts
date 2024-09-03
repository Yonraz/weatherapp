import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { BadRequestError } from "../models/errors/badRequestError";
import { NotFoundError } from "../models/errors/notFoundError";
import { validateWeatherData } from "../utils/weatherApiValidations";
import { getNormalizedWeatherData } from "../utils/dataNormalizer";

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
    const now = new Date().getTime();
    let days = now <= 18 ? 1 : 2;
    const url = `${BASE_URL}/forecast.json?q=${query}&key=${API_KEY}${
      days > 1 && "&days=" + days
    }`;
    const { data } = await axios.get(url);
    if (!data) throw new NotFoundError();
    const weatherData = validateWeatherData(data);
    const weatherResponse = getNormalizedWeatherData(weatherData);
    return res.status(200).send(weatherResponse);
  } catch (error) {
    next(error);
  }
};
