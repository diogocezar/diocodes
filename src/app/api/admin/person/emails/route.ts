import { getAllPersons } from "@/database/person";
import { logger } from "@/lib/logger";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const result = await getAllPersons();
    const emails = result.map((person) => person.email);
    return new Response(JSON.stringify(emails), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/person/emails", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
