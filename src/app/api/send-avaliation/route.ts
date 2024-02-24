import { EmailAvaliation } from "@/components/emails/EmailAvaliation";
import { Resend } from "resend";

const resend = new Resend(process.env.API_RESEND);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "Diogo Cezar <diogo@diogocezar.com>",
      to: ["diogo@diogocezar.com"],
      subject: "Hello world",
      react: EmailAvaliation({ firstName: "John" }) as React.ReactElement,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
