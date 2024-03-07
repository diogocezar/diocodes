import { getAllTags } from "@/database/tag";

export const GET = async () => {
  try {
    const result = await getAllTags();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
