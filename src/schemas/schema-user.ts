import { z } from "zod";

export const SchemaUser = z.object({
  personId: z.string({
    required_error: "É necessário informar uma pessoa.",
  }),
  role: z.string({
    required_error: "É necessário informar um papel.",
  }),
});
