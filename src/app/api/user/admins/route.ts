import { getAllUsers } from "@/database/user";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const result = await getAllUsers("ADMIN");
    const emails = result.map((user) => user.person.email);
    return new Response(JSON.stringify(emails), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/user", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
