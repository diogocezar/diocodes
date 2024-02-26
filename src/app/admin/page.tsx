import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { UserAuthForm } from "@/components/containers/auth";
import authOptions from "@/app/api/auth/[...nextauth]/auth-options";

export default async function AuthenticationPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect("/admin/dashboard");
  }

  return (
    <>
      <div className="bg-background font-geist container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col justify-between p-10 lg:flex"></div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="font-geist text-2xl font-semibold tracking-tight">
                Login or Create an account
              </h1>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
