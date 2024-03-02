import { getAllUsers } from "@/database/user";

export const GET = async () => {
  try {
    const result = await getAllUsers("ADMIN");
    const emails = result.map((user) => user.person.email);
    return new Response(JSON.stringify(emails), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
