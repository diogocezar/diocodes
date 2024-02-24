import { z } from "zod";

export const SchemaAvaliation = z.object({
  attendee: z.string(),
});
