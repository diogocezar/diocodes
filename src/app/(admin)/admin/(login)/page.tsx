import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserAuthForm } from "@/components/containers/admin/login/auth";
import authOptions from "@/app/api/auth/[...nextauth]/auth-options";
import Diocodes from "@/assets/diocodes";

export default async function AuthenticationPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const error = searchParams?.error;
  if (session?.user) {
    return redirect("/admin/dashboard");
  }
  return (
    <>
      <div className="bg-dots container relative m-0 flex h-screen w-[100%] flex-col items-center justify-center p-0 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
        <div className="bg-background-dark m-0 flex h-screen w-[100vw] p-0 md:w-auto lg:w-auto">
          <div className="mx-auto flex w-[100vw] flex-col justify-center space-y-6 p-6">
            <div className="flex flex-col justify-center space-y-2 text-center">
              <h1 className="text-green text-2xl font-semibold tracking-tight">
                Faça o Login
              </h1>
              {error ? (
                <div>
                  <p className="text-destructive mb-6 mt-4 text-base font-bold">
                    Houve um problema ao tentar realizar o login!
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {error === "AccessDenied" &&
                      "Você precisa de permissão para realizar o login neste painel."}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Acesse a plataforma com o seu GitHub
                </p>
              )}
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
