"use client";
import * as React from "react";
import { GithubLogo } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex w-full flex-col gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            signIn("github", {
              callbackUrl: `/admin/dashboard`,
            })
          }
        >
          <GithubLogo size={16} className="mr-2 h-4 w-4" />
          Github
        </Button>
      </div>
    </div>
  );
}
