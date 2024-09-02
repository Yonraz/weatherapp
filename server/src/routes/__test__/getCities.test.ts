import request from "supertest";
import app from "../../app";
import { validateCityResponse } from "../../utils/cityApiValidations";

const GET_CITIES_ENDPOINT = `/api/cities`;

it("Returns an empty array for an invalid query param", async () => {
  const url = `${GET_CITIES_ENDPOINT}?query=asasds`;
  const { body } = await request(app).get(url).send().expect(200);
  console.log(body);
});

it("Returns an empty array for a non-existant or too short query param", async () => {
  const url = `${GET_CITIES_ENDPOINT}?query=as`;
  const { body } = await request(app).get(url).send().expect(200);
  console.log("in empty array");
  console.log(body);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toEqual(0);
});

it("Returns a valid response object with all fields", async () => {
  const query = "Tel Aviv-Yafo";
  const url = `${GET_CITIES_ENDPOINT}?query=${query}`;
  const response = await request(app).get(url).send().expect(200);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toEqual(1);
  const cityData = validateCityResponse(response.body[0]);
  expect(cityData.name).toEqual(query);
});

it("Returns an array of cities when there's more than one result", async () => {
  const query = "Jeru";
  const url = `${GET_CITIES_ENDPOINT}?query=${query}`;
  const response = await request(app).get(url).send().expect(200);
  const { body } = response;
  console.log(body[0]);
  expect(Array.isArray(body)).toBe(true);
  const cityData = validateCityResponse(body[0]);
  expect(cityData.name).toEqual("Jerusalem");
});
