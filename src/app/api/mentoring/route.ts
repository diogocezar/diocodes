import { getAllAcceptedMentorings } from "@/database/mentoring";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const result = await getAllAcceptedMentorings();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
