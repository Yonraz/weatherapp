import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";
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
  const defaultErr: RequestError[] = [
    { message: "Some unknown error occured, Please try again later." },
  ];
  console.log(defaultErr);
  res.status(400).send({ errors: defaultErr });
};
