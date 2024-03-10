import { EmailAvaliation } from "#/emails/emails/email-avaliation";
import { Resend } from "resend";
import { EMAIL } from "@/contants/email";
import { getMentoring } from "@/database/mentoring";
import { logger } from "@/lib/logger";

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
      subject: EMAIL.SUBJECT,
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
  const data = await req.json();
  try {
    const { mentoringId } = data;
    const mentoring = await getMentoring(mentoringId);
    if (mentoring) await sendInvite(mentoring);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
