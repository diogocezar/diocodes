import { AVALIATION } from "@/contants/avaliation";
import { z } from "zod";

export const SchemaAvaliationPublic = z.object({
  rating: z.number({ required_error: "É necessário informar uma nota." }),
  avaliationTags: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .array()
    .length(
      AVALIATION.MAX_TAGS,
      `É necessário informar ${AVALIATION.MAX_TAGS} tags.`,
    ),
  comment: z
    .string({
      required_error: "Faça um comentário!",
    })
    .min(10, "O comentário deve ter no mínimo 10 caracteres.")
    .max(250, "O comentário deve ter no máximo 250 caracteres."),
});
