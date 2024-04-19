import { logger } from "@/lib/logger";
import { EmailAvaliation } from "#/emails/emails/email-avaliation";
import { Resend } from "resend";
import { EMAIL } from "@/contants/email";
import { getMentoring } from "@/database/mentoring";
import { createInvite } from "@/database/invite";
import { createWebhookLog } from "@/database/webhook-log";
import { authCalWebhook } from "@/lib/auth-webhook";

export const revalidate = 0;
export const fetchCache = "force-no-store";

const resend = new Resend(process.env.API_RESEND);

const sendInvite = async (mentoring: any) => {
  const { startTime, attendee, id } = mentoring;
  const link = `${EMAIL.LINK}/${id}`;
  const { name, email } = attendee;
  const to = [email, EMAIL.COPY_EMAIL];
  try {
    const config = {
      from: EMAIL.FROM,
      to,
      subject: EMAIL.SUBJECT_INVITE,
      react: EmailAvaliation({
        attendee: name,
        startTime,
        link,
      }) as React.ReactElement,
    };
    await resend.emails.send(config);
  } catch (error) {
    logger.error(error);
  }
};

export const POST = async (req: Request) => {
  try {
    const secret = process.env.WEBHOOK_CAL_SECRET;
    const signature = req.headers.get("X-Cal-Signature-256");
    const data = await req.json();
    if (!authCalWebhook(secret, signature, data)) {
      return new Response("Unauthorized", { status: 401 });
    }
    logger.info("Creating webhook log");
    await createWebhookLog({
      type: "CAL_MEETING_ENDED",
      payload: JSON.stringify(data),
    } as any);
    const { id: externalId } = data;
    logger.info("External ID", externalId);
    if (!externalId) throw new Error("Missing external ID");
    const mentoring = await getMentoring(externalId);
    logger.info("Mentoring", JSON.stringify(mentoring, null, 2));
    if (!mentoring) throw new Error("Mentoring not found");
    if (mentoring) await sendInvite(mentoring);
    logger.info("Invite Sent");
    const invite = await createInvite({
      createdAt: new Date(),
      mentoringId: mentoring.id,
    } as any);
    logger.info("Invite Created", JSON.stringify(invite, null, 2));
    return new Response(JSON.stringify({ data, mentoring, invite }, null, 2), {
      status: 200,
    });
  } catch (error) {
    logger.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
