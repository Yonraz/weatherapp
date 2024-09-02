import { Router } from "express";
import { getWeather } from "../controllers/weatherController";
import { getCities } from "../controllers/citiesController";

const router = Router();

router.get("/api/weather", getWeather);
router.get("/api/cities", getCities);

export { router as weatherRouter };
