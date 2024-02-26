"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data } = useSession();
  console.log(data);
  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        onClick={() => signOut({ redirect: true, callbackUrl: "/admin" })}
      >
        Sair
      </Button>
    </div>
  );
}
