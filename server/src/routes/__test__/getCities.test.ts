import request from "supertest";
import app from "../../app";
import { validateCityResponse } from "../../utils/cityApiValidations";

const GET_CITIES_ENDPOINT = `/api/cities`;

it("Returns an empty array for an invalid query param", async () => {
  const url = `${GET_CITIES_ENDPOINT}?query=asasds`;
  const { body } = await request(app).get(url).send().expect(200);
});

it("Returns an empty array for a non-existant or too short query param", async () => {
  const url = `${GET_CITIES_ENDPOINT}?query=as`;
  const { body } = await request(app).get(url).send().expect(200);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toEqual(0);
});

it("Returns an array of cities for a valid query", async () => {
  const query = "Lon";
  const url = `${GET_CITIES_ENDPOINT}?query=${query}`;
  const response = await request(app).get(url).send().expect(200);
  const { body } = response;
  expect(Array.isArray(body)).toBe(true);
  const city = validateCityResponse(body[0]);
  expect(city.name).toEqual("London");
});
