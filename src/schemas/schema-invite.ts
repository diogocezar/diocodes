import { z } from "zod";

export const SchemaInvite = z.object({
  mentoringId: z.string({
    required_error: "É necessário informar uma mentoria.",
  }),
});
