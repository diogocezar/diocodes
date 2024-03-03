// import { EmailAvaliation } from "#/emails/emails/email-avaliation";
// import { Resend } from "resend";
// import { randomUUID } from "crypto";

// const SUBJECT = "Avaliação de Mentoria (Diogão)";
// const LINK = "https://diocodes.dev/avaliation";

// const resend = new Resend(process.env.API_RESEND);

// export async function POST(request: Request) {
//   const body = await request.json();
//   const id = randomUUID();
//   const { attendee, startTime } = body;
//   const link = `${LINK}/${id}`;
//   try {
//     const data = await resend.emails.send({
//       from: "Diogão <diogo@diogocezar.com>",
//       to: ["diogo@diogocezar.com"],
//       subject: SUBJECT,
//       react: EmailAvaliation({
//         attendee,
//         startTime,
//         link,
//       }) as React.ReactElement,
//     });
//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error });
//   }
// }
