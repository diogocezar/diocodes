import {
  getAllInvites,
  createInvite,
  removeInvite,
  updateInvite,
} from "@/database/invite";

import { getMentoring } from "@/database/mentoring";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";
import { sendInviteEmail } from "@/services/resend";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const { mentoringId } = data;
    const mentoring = await getMentoring(mentoringId);

    if (mentoring) await sendInviteEmail(mentoring);

    const result = await createInvite(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    logger.error("[POST] api/admin/invite", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const { id, ...dataToUpdate } = data;
  try {
    const result = await updateInvite(data.id, dataToUpdate);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[PATCH] api/admin/invite", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const result = await getAllInvites();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/invite", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await removeInvite(data);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[DELETE] api/admin/invite", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
