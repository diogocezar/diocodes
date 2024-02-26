import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    signIn: async ({ user }) => {
      const allowedEmails = ["diogo@diogocezar.com"];
      if (allowedEmails.includes(user.email!)) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/admin",
    error: "/admin",
    newUser: "/admin",
    signOut: "/admin",
    verifyRequest: "/admin",
  },
};

export default authOptions;
