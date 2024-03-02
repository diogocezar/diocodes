import { getAllPersons } from "@/database/person";

export const GET = async () => {
  try {
    const result = await getAllPersons();
    const emails = result.map((person) => person.email);
    return new Response(JSON.stringify(emails), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
