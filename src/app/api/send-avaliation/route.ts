import { Avaliation } from "@/components/emails/Avaliation";
import { Resend } from "resend";

const resend = new Resend(process.env.API_RESEND);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["diogo@diogocezar.com"],
      subject: "Avaliation",
      react: Avaliation({}),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
