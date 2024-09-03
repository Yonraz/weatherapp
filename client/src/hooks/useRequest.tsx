import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { RequestError, useRequestParams } from "../types/requestTypes";

export default function useRequest() {
  const [requestErrors, setRequestErrors] = useState<RequestError[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = useCallback(
    async ({ url, method, body, onSuccess }: useRequestParams) => {
      try {
        setRequestErrors(null);
        setIsLoading(true);

        const response = await withRetry(
          () =>
            axios({
              url,
              method,
              data: body,
            }).then((res) => {
              if (onSuccess) onSuccess(res.data);
              return res.data;
            }),
          setRequestErrors
        );
        return response;
      } catch (err) {
        console.error(err);
        if (err instanceof AxiosError && err.response?.data.errors) {
          const errors: RequestError[] = err.response?.data.errors;
          setRequestErrors(errors);
        } else {
          setRequestErrors([
            {
              message: "Some unknown error occured, Please try again later.",
            },
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { requestErrors, sendRequest, isLoading };
}

const withRetry = async (
  requestFn: () => Promise<unknown>,
  setErrors: (errs: RequestError[] | null) => void,
  retries: number = 3,
  retryDelay: number = 1000
) => {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await requestFn();
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      if (err instanceof AxiosError) {
        if (err.status && err.status < 500) {
          throw err;
        }
      }
      setErrors([{ message: "Operation failed, retrying..." }]);

      const delay = Math.pow(2, attempt) * retryDelay;
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt += 1;
    }
  }
};
