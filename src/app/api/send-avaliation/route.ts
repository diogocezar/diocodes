import { EmailAvaliation } from "#/emails/emails/email-avaliation";
import { Resend } from "resend";

const resend = new Resend(process.env.API_RESEND);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "Diogo Cezar <diogo@diogocezar.com>",
      to: ["diogo@diogocezar.com"],
      subject: "Hello world",
      react: EmailAvaliation({
        firstName: "diogo",
        date: "31/02/2002",
        time: "12:00",
      }) as React.ReactElement,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
