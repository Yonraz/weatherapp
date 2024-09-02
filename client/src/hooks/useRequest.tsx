import axios, { AxiosError } from "axios";
import { useState } from "react";
import { RequestError, useRequestParams } from "../types/requestTypes";


export default function useRequest() {
  const [requestErrors, setRequestErrors] = useState<RequestError[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = async ({
    url,
    method,
    body,
    onSuccess,
  }: useRequestParams) => {
    try {
      setRequestErrors(null);
      setIsLoading(true);
      const response = await axios({
        url,
        method,
        data: body,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }
      setIsLoading(false);
      return response.data;
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError && err.response?.data.errors) {
        const errors: string[] = err.response?.data.errors;
        const reqErrs: RequestError[] = errors.map((e) => ({ message: e }));
        setRequestErrors(reqErrs);
      } else {
        setRequestErrors([
          {
            message: "Some unknown error occured, Please try again later.",
          },
        ]);
      }
    }
    setIsLoading(false);
  };

  return { requestErrors, sendRequest, isLoading };
}
