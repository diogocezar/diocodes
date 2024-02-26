import authOptions from "@/app/api/auth/[...nextauth]/auth-options";
import nextAuth from "next-auth";

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
