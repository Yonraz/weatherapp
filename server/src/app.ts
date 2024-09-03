import express, { json, Router } from "express";
import { weatherRouter } from "./routes/get";
import cors from "cors";
import { NotFoundError } from "./models/errors/notFoundError";
import { handleError } from "./middlewares/handleError";

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(json());
app.use(weatherRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(handleError);

export default app;
