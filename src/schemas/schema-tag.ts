import { z } from "zod";

export const SchemaTag = z.object({
  name: z
    .string({ required_error: "É necessário informar um nome para a tag." })
    .min(3, { message: "A tag precisa ter no mínimo 3 caracteres." })
    .max(255, { message: "A tag precisa ter no máximo 255 caracteres." }),
});
