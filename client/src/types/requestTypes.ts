import { Method } from "axios";

export interface useRequestParams {
  url: string;
  method: Method;
  body?: unknown;
  onSuccess?: (value?: unknown) => void;
}
export interface RequestError {
  message: string;
}
