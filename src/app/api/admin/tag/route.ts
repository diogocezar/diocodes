import { getAllTags, createTag, removeTag, updateTag } from "@/database/tag";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await createTag(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    logger.error("[POST] api/admin/tag", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const { id, ...dataToUpdate } = data;
  try {
    const result = await updateTag(data.id, dataToUpdate);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[PATCH] api/admin/tag", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const result = await getAllTags();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/tag", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await removeTag(data);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[DELETE] api/admin/tag", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
