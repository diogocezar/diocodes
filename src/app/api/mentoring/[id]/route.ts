import { getMentoring } from "@/database/mentoring";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;
    const result = await getMentoring(id);
    if (!result)
      return new NextResponse(JSON.stringify({ founded: false }), {
        status: 200,
      });
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error?.message }), {
      status: 500,
    });
  }
};
