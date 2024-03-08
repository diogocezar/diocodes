import { createAvaliation } from "@/database/avaliation";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await createAvaliation(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
