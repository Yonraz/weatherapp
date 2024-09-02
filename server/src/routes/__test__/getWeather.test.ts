import request from "supertest";
import app from "../../app";
import { validateWeatherResponse } from "../../utils/weatherApiValidations";

const GET_WEATHER_ENDPOINT = `/api/weather`;

it("Returns a 400 for no query params", async () => {
  const url = `${GET_WEATHER_ENDPOINT}?query=""`;
  const response = await request(app).get(url).send().expect(400);
});

it("Returns a 400 for a non-valid query param", async () => {
  const url = `${GET_WEATHER_ENDPOINT}?query="asdasd"`;
  const response = await request(app).get(url).send().expect(400);
});

it("Returns a valid response object with all fields", async () => {
  const query = "Jerusalem";
  const url = `${GET_WEATHER_ENDPOINT}?query=${query}`;
  const response = await request(app).get(url).send().expect(200);
  const weatherData = validateWeatherResponse(response.body);
  expect(weatherData.name).toEqual(query);
});

it("returns a 200 for a valid city param", async () => {
  const query = "Jerusalem";
  const url = `${GET_WEATHER_ENDPOINT}?query=${query}`;
  const response = await request(app).get(url).send().expect(200);
  const { name } = response.body;
  expect(name).toEqual(query);
});
