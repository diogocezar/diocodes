import { getAllTags, createTag } from "@/database/tag";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await createTag(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const result = await getAllTags();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
