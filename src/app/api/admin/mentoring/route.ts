import {
  getAllMentorings,
  createMentoring,
  removeMentoring,
  updateMentoring,
} from "@/database/mentoring";
import { logger } from "@/lib/logger";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await createMentoring(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    logger.error("[POST] api/admin/mentoring", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const { id, ...dataToUpdate } = data;
  try {
    const result = await updateMentoring(data.id, dataToUpdate);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[PATCH] api/admin/mentoring", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const result = await getAllMentorings();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/mentoring", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await removeMentoring(data);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[DELETE] api/admin/mentoring", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
