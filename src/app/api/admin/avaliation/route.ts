import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/auth-options";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.redirect("http://localhost:3000/");
  }
};
