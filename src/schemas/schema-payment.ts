import { z } from "zod";

export const SchemaPayment = z.object({
  amount: z
    .string({
      required_error: "Valor é obrigatório",
    })
    .refine(
      (value) => {
        return Number(value) > 0;
      },
      {
        message: "Valor é obrigatório",
      },
    )
    .transform((v) => Number(v) || 0),
  mentoringId: z
    .string({
      required_error: "É necessário informar uma mentoria.",
    })
    .optional(),
  personId: z.string({
    required_error: "É necessário informar uma pessoa.",
  }),
});
