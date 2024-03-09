import { getAllMentorings } from "@/database/mentoring";

export const GET = async () => {
  try {
    const result = await getAllMentorings();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
