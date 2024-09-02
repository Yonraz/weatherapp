import express, { json, Router } from "express";
import { weatherRouter } from "./routes/get";
import cors from "cors";
import { NotFoundError } from "./models/errors/notFoundError";
import { handleError } from "./middlewares/handleError";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(json());
app.use(weatherRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(handleError);

app.listen(8000, () => {
  console.log("listening on port 8000");
});

export default app;
