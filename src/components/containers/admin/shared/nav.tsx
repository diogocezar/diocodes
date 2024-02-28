"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { compactName } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  ChartBar,
  Star,
  Calendar,
  SignOut,
  Browsers,
  CheckFat,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const { data: session } = useSession();
  const { image, name } = session?.user || {};
  const pathname = usePathname().replace("/admin/", "");
  return (
    <div className="bg-background-dark flex w-[240px] min-w-[240px] flex-col gap-4 overflow-y-auto px-4 py-6">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex h-14 w-full flex-row items-center gap-4">
            <Avatar className="h-12 w-12 items-center rounded-full">
              <AvatarImage
                src={image || ""}
                className="h-12 w-12 rounded-full"
              />
              <AvatarFallback className="h-8 w-8 rounded-sm">
                {name &&
                  name
                    .split(" ")
                    .map((name) => name[0].toUpperCase())
                    .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-foreground text-lg font-bold">
              {name && compactName(name)}
            </div>
          </div>
          <Separator />
          <ul className="mt-1 flex flex-col gap-3">
            <li>
              <Link
                href="/admin/dashboard"
                className={clsx(
                  "hover:bg-background flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold",
                  pathname === "dashboard"
                    ? "text-background"
                    : "text-foreground",
                  pathname === "dashboard" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <ChartBar size={18} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/avaliation/list"
                className={clsx(
                  "hover:bg-background flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold",
                  pathname === "avaliation/list"
                    ? "text-background"
                    : "text-foreground",
                  pathname === "avaliation/list" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <Star size={18} />
                Avaliações
              </Link>
            </li>
            <li>
              <Link
                href="/admin/avaliation/request"
                className={clsx(
                  "hover:bg-background flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold",
                  pathname === "avaliation/request"
                    ? "text-background"
                    : "text-foreground",
                  pathname === "avaliation/request" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <CheckFat size={18} />
                Solicitar Avaliação
              </Link>
            </li>
            <li>
              <Link
                href="/admin/booking"
                className={clsx(
                  "hover:bg-background flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold",
                  pathname === "booking"
                    ? "text-background"
                    : "text-foreground",
                  pathname === "booking" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <Calendar size={18} />
                Reservas
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={clsx(
                  "text-foreground hover:bg-background flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold",
                )}
              >
                <Browsers size={18} />
                Acessar o site
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Button
            variant="link"
            onClick={() => signOut({ redirect: true, callbackUrl: "/admin" })}
            className="text-foreground m-0 flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold"
          >
            <SignOut size={18} />
            Deslogar
          </Button>
        </div>
      </div>
    </div>
  );
}
