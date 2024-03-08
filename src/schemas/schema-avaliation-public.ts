import { z } from "zod";

export const SchemaAvaliationPublic = z.object({
  rating: z.number({ required_error: "É necessário informar uma nota." }),
  avaliationTags: z
    .string()
    .array()
    .length(10, "É necessário informar 10 tags."),
  comment: z.string().min(10, "O comentário deve ter no mínimo 10 caracteres."),
});
