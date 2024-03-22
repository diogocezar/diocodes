import { z } from "zod";

export const SchemaAvaliation = z.object({
  mentoringId: z.string({
    required_error: "É necessário informar uma mentoria.",
  }),
  avaliationTags: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  rating: z.array(
    z
      .number({
        required_error: "A nota deve ser um número.",
      })
      .min(1, {
        message: "A nota deve ser no mínimo 1.",
      })
      .max(5, {
        message: "A nota deve ser no máximo 5.",
      })
      .default(1),
  ),
  comment: z
    .string({
      required_error: "É necessário informar um comentário.",
    })
    .optional(),
  showComment: z.boolean().default(true),
});
