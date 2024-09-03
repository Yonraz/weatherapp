import NodeCache from "node-cache";
import app from "./app";
import { CacheWrapper } from "./cache";

const startup = () => {
  if (!process.env.WEATHER_API_KEY) {
    throw new Error("Must have env variable WEATHER_API_KEY");
  }
  if (!process.env.WEATHER_API_BASE_URL) {
    throw new Error("Must have env variable WEATHER_API_BASE_URL");
  }

  app.listen(8000, () => {
    console.log("Listening on port 8000");
  });
};

startup();
