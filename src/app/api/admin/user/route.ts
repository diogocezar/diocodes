import {
  getAllUsers,
  createUser,
  removeUser,
  updateUser,
} from "@/database/user";
import { logger } from "@/lib/logger";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await createUser(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    logger.error("[POST] api/admin/user", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const { id, ...dataToUpdate } = data;
  try {
    const result = await updateUser(data.id, dataToUpdate);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[PATCH] api/admin/user", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const result = await getAllUsers();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/user", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await removeUser(data);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[DELETE] api/admin/user", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
