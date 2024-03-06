import {
  getAllInvites,
  createInvite,
  removeInvite,
  updateInvite,
} from "@/database/invite";

import { EmailAvaliation } from "#/emails/emails/email-avaliation";
import { Resend } from "resend";
import { EMAIL } from "@/contants/email";
import { randomUUID } from "crypto";
import { getMentoring } from "@/database/mentoring";
import { getPerson } from "@/database/person";

const resend = new Resend(process.env.API_RESEND);

const generateToken = () => {
  return randomUUID();
};

const sendInvite = async (mentoring: any, token: string) => {
  const link = `${EMAIL.LINK}/${token}`;
  const { startTime, attendee } = mentoring;
  const { name, email } = attendee;
  try {
    await resend.emails.send({
      from: EMAIL.FROM,
      //to: [EMAIL.COPY_EMAIL, email],
      to: [EMAIL.COPY_EMAIL],
      subject: EMAIL.SUBJECT,
      react: EmailAvaliation({
        attendee: name,
        startTime,
        link,
      }) as React.ReactElement,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const { mentoringId } = data;
    const mentoring = await getMentoring(mentoringId);
    const token = generateToken();

    if (mentoring) await sendInvite(mentoring, token);

    const result = await createInvite({ ...data, token });
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const { id, ...dataToUpdate } = data;
  try {
    const result = await updateInvite(data.id, dataToUpdate);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const result = await getAllInvites();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await removeInvite(data);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
