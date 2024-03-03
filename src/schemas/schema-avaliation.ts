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
  rating: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Você precisa informar um número.",
  }),
  comment: z
    .string({
      required_error: "É necessário informar um comentário.",
    })
    .optional(),
  wasSent: z.boolean().optional(),
});
