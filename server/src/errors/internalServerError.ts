import { RequestError } from "../types/errors";
import { CustomError } from "./customError";

const defaultMessage = "The server has encountered an unexpected error";

export class InternalServerError extends CustomError {
  statusCode: number = 500;

  constructor(message?: string) {
    super(message || defaultMessage);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors(): RequestError[] {
    return [{ message: this.message || defaultMessage }];
  }
}
