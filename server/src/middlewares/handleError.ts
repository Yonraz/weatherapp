import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/errors/customError";
import { RequestError } from "../types/errors";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const reqErrors = err.serializeErrors();

    return res.status(err.statusCode).send({ errors: reqErrors });
  }
  console.error(err);
  const defaultErr: RequestError[] = [{ message: "Something went wrong" }];
  res.status(400).send({ errors: defaultErr });
};
