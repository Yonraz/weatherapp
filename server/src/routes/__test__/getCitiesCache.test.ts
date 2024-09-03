import app from "../../app";
import request from "supertest";
import { cacheWrapper as cache, cacheWrapper } from "../../cache";
import axios from "axios";

jest.mock("axios");
jest.mock("../../cache");

describe("cache tests for /api/cities", () => {
  beforeAll(() => {
    (cache.get as jest.Mock) = jest.fn();
    (cache.set as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached cities on cache hit", async () => {
    const cachedCities = [
      { name: "Test City", lattitude: 0, longitude: 0, country: "Testland" },
    ];
    (cache.get as jest.Mock).mockReturnValue(cachedCities);

    const response = await request(app)
      .get("/api/cities?query=test")
      .expect(200);

    expect(cache.get).toHaveBeenCalledWith("test");
    expect(response.body).toEqual(cachedCities);
  });

  it("should fetch cities from API and cache them on cache miss", async () => {
    const apiResponse = [
      { name: "Test City", lat: 0, lon: 0, country: "Testland" },
    ];
    const trimmedCityData = {
      name: "Test City",
      lattitude: 0,
      longitude: 0,
      country: "Testland",
    };

    cache.get = jest.fn().mockReturnValue(undefined);
    (axios.get as jest.Mock).mockResolvedValue({ data: apiResponse });

    const response = await request(app)
      .get("/api/cities")
      .query({ query: "test" });

    expect(cache.get).toHaveBeenCalledWith("test");
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.WEATHER_API_BASE_URL}/search.json?q=test&key=${process.env.WEATHER_API_KEY}`
    );
    expect(cache.set).toHaveBeenCalledWith("test", [trimmedCityData]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([trimmedCityData]);
  });
});
