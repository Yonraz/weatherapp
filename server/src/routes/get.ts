import { Router } from "express";
import { getCities, getWeather } from "../controllers/weatherController";

const router = Router();

router.get("/api/weather", getWeather);
router.get("/api/cities", getCities);

export { router as weatherRouter };
