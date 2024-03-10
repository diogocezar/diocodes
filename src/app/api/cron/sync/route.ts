import { sync } from "@/lib/sync";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async (req: Request) => {
  try {
    if (
      req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return new Response("Unauthorized", { status: 401 });
    }
    const result = sync(true);
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
