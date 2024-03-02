import { api } from "@/services/api";
import { z } from "zod";

export const SchemaPerson = z.object({
  name: z
    .string({ required_error: "É necessário informar um nome para a pessoa." })
    .min(3, { message: "A pessoa precisa ter no mínimo 3 caracteres." })
    .max(255, { message: "A pessoa precisa ter no máximo 255 caracteres." }),
  email: z
    .string({
      required_error: "É necessário informar um email para a pessoa.",
    })
    .email({ message: "O email informado não é válido." })
    .refine(async (e) => {
      const result = await api.get("/admin/person/emails");
      const emails = result.data;
      return !emails.includes(e);
    }, "Este e-mail já está sendo utilizado"),
});
