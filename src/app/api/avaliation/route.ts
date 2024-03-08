import {
  createAvaliation,
  getAvaliationByMentoring,
} from "@/database/avaliation";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const avaliation = await getAvaliationByMentoring(data.mentoringId);
    if (avaliation)
      return new Response(
        JSON.stringify({ error: "Avaliation already exists" }),
        { status: 400 },
      );
    const result = await createAvaliation(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
