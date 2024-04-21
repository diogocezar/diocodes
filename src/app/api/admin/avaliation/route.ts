import {
  getAllAvaliations,
  createAvaliation,
  removeAvaliation,
  updateAvaliation,
} from "@/database/avaliation";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await createAvaliation(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    logger.error("[POST] api/admin/avaliation", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const { id, ...dataToUpdate } = data;
  try {
    const result = await updateAvaliation(data.id, dataToUpdate);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[PATCH] api/admin/avaliation", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const result = await getAllAvaliations();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/avaliation", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await removeAvaliation(data);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[DELETE] api/admin/avaliation", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
