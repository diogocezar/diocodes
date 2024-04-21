import { getMentoring } from "@/database/mentoring";
import { sendInviteEmail } from "@/services/resend";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const { mentoringId } = data;
    const mentoring = await getMentoring(mentoringId);
    if (mentoring) await sendInviteEmail(mentoring);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
