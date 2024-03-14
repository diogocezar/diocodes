import EmailAvaliationCreated from "#/emails/emails/email-avaliation-created";
import { EMAIL } from "@/contants/email";
import {
  createAvaliation,
  getAvaliationByMentoring,
} from "@/database/avaliation";
import { logger } from "@/lib/logger";
import { Resend } from "resend";

export const revalidate = 0;
export const fetchCache = "force-no-store";

const resend = new Resend(process.env.API_RESEND);

const sendAvaliationNotification = async (avaliation: any) => {
  const { mentoring, rating, avaliationTags, comment } = avaliation;
  try {
    const config = {
      from: EMAIL.FROM,
      to: [EMAIL.COPY_EMAIL],
      subject: EMAIL.SUBJECT,
      react: EmailAvaliationCreated({
        attendee: mentoring.attendee.name,
        startTime: mentoring.startTime,
        rating,
        tags: avaliationTags.map((tag: any) => tag.name),
        comment,
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
    const avaliation = await getAvaliationByMentoring(data.mentoringId);
    if (avaliation)
      return new Response(
        JSON.stringify({ error: "Avaliation already exists" }),
        { status: 400 }
      );
    const result = await createAvaliation(data);
    if (result) {
      sendAvaliationNotification(data);
      return new Response(JSON.stringify(result), { status: 201 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
