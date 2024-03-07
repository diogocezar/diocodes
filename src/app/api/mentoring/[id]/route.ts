import { getMentoring } from "@/database/mentoring";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;
    const result = await getMentoring(id);
    if (!result) throw new Error("Mentoria não encontrada.");
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: error?.message }), {
      status: 500,
    });
  }
};
