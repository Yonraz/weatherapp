import { Request, Response } from "express";
import axios from "axios";
import { BadRequestError } from "../errors/badRequestError";
import { NotFoundError } from "../errors/notFoundError";
import { validateWeatherData } from "../utils/weatherApiValidations";
import { getNormalizedWeatherData } from "../utils/dataNormalizer";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.WEATHER_API_BASE_URL;
const API_KEY = process.env.WEATHER_API_KEY;

export const getWeather = async (req: Request, res: Response) => {
  const { query } = req.query;
  if (!query) throw new BadRequestError("Must provide a valid query!");

  const url = getUrl(query as string);

  const { data } = await axios.get(url);
  if (!data) throw new NotFoundError();

  const weatherData = validateWeatherData(data);
  const weatherResponse = getNormalizedWeatherData(weatherData);

  return res.status(200).send(weatherResponse);
};

function getUrl(query: string) {
  const now = new Date().getTime();
  let days = now <= 18 ? 1 : 2;
  return `${BASE_URL}/forecast.json?q=${query}&key=${API_KEY}${
    days > 1 && "&days=" + days
  }`;
}