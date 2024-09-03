import { RequestError } from "../types/errors";

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): RequestError[];
}
