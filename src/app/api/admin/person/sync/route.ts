import { RESEND } from "@/contants/resend";
import { getAllPersons } from "@/database/person";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";
import { createContact } from "@/services/resend";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const listOfPersons = await getAllPersons();
    await createContact({
      person: listOfPersons,
      audienceId: RESEND.AUDIENCE_ID_GENERAL,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/person/sync", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
