"use client";
import * as React from "react";
import { GithubLogo } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid justify-center gap-6", className)} {...props}>
      <div className="flex w-[300px] flex-col gap-2">
        <Button
          variant={"destructive"}
          className="flex flex-row justify-center gap-2"
          onClick={() =>
            signIn("github", {
              callbackUrl: `/admin/dashboard`,
            })
          }
        >
          <GithubLogo size={20} />
          GitHub
        </Button>
        <Button
          variant={"destructive"}
          className="flex flex-row justify-center gap-2"
          onClick={() =>
            signIn("google", {
              callbackUrl: `/admin/dashboard`,
            })
          }
        >
          <GoogleLogo size={20} />
          Conta do Google
        </Button>
      </div>
    </div>
  );
}
