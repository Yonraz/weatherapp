import { z } from "zod";

export function validateResponse(
  schema: z.Schema,
  data: unknown,
  handleError: (err: Error) => void
) {
  try {
    return schema.parse(data);
  } catch (err) {
    handleError(err as Error);
  }
}
