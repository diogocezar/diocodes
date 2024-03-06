import { z } from "zod";

export const SchemaMentoring = z.object({
  hostId: z.string({
    required_error: "É necessário informar um host.",
  }),
  attendeeId: z.string({
    required_error: "É necessário informar um participante.",
  }),
  externalMessage: z.string().optional(),
  startTime: z.date({
    required_error: "É necessário informar uma data de início.",
  }),
  endTime: z.date({
    required_error: "É necessário informar uma data de término.",
  }),
});
