export const revalidate = 0;
export const fetchCache = "force-no-store";
import { RESEND } from "@/contants/resend";
import { getAllPersons } from "@/database/person";
import { logger } from "@/lib/logger";
import { Resend } from "resend";

const resend = new Resend(process.env.API_RESEND);

export const GET = async () => {
  try {
    const person = await getAllPersons();
    for (const item of person) {
      await resend.contacts.create({
        email: item.email,
        firstName: item.name,
        unsubscribed: false,
        audienceId: RESEND.AUDIENCE_ID_GENERAL,
      });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    logger.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
