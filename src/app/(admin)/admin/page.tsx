import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { UserAuthForm } from "@/components/containers/auth";
import authOptions from "@/app/api/auth/[...nextauth]/auth-options";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

import Diocodes from "@/assets/diocodes";

export default async function AuthenticationPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect("/admin/dashboard");
  }
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-transparent p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-transparent" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div className="mr-4 h-8 w-8">
              <Diocodes />
            </div>
            Diocodes.dev
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">Sistema de Mentorias</p>
            </blockquote>
          </div>
        </div>
        <div className="bg-background-dark flex h-screen lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-pink text-2xl font-semibold tracking-tight">
                Faça o Login
              </h1>
              <p className="text-muted-foreground text-sm">
                Acesse a plataforma com o seu GitHub
              </p>
            </div>
            <UserAuthForm />
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-primary underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
