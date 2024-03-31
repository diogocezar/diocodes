"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { compactName } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  ChartBar,
  Star,
  SignOut,
  Browsers,
  Tag,
  User,
  Plant,
  Users,
  EnvelopeSimple,
  Calendar as CalendarIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const { data: session } = useSession();
  const { image, name } = session?.user || {};
  const pathname = usePathname().replace("/admin/", "");
  return (
    <div className="fixed flex h-screen w-[240px] min-w-[240px] flex-col gap-4 overflow-y-auto bg-background-dark px-4 py-6">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex h-14 w-full flex-row items-center gap-4">
            <Avatar className="h-12 w-12 items-center rounded-full">
              <AvatarImage
                src={image || ""}
                className="h-12 w-12 rounded-full"
              />
              <AvatarFallback className="h-12 w-12 rounded-full">
                {name &&
                  name
                    .split(" ")
                    .map((name) => name[0].toUpperCase())
                    .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-lg font-bold text-foreground">
              {name && compactName(name)}
            </div>
          </div>
          <Separator />
          <ul className="mt-1 flex flex-col gap-3">
            <li>
              <Link
                href="/admin/dashboard"
                className={clsx(
                  "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
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
                href="/admin/mentoring"
                className={clsx(
                  "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                  pathname === "mentoring"
                    ? "text-background"
                    : "text-foreground",
                  pathname === "mentoring" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <Plant size={18} />
                Mentorias
              </Link>
            </li>
            <li>
              <Link
                href="/admin/avaliation"
                className={clsx(
                  "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                  pathname === "avaliation"
                    ? "text-background"
                    : "text-foreground",
                  pathname === "avaliation" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <Star size={18} />
                Avaliações
              </Link>
            </li>
            <li>
              <Link
                href="/admin/invite"
                className={clsx(
                  "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                  pathname === "invite" ? "text-background" : "text-foreground",
                  pathname === "invite" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <EnvelopeSimple size={18} />
                Convites
              </Link>
            </li>
            <li>
              <Link
                href="/admin/tag"
                className={clsx(
                  "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                  pathname === "tag" ? "text-background" : "text-foreground",
                  pathname === "tag" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <Tag size={18} />
                Tags
              </Link>
            </li>
            <li>
              <Link
                href="/admin/person"
                className={clsx(
                  "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                  pathname === "person" ? "text-background" : "text-foreground",
                  pathname === "person" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <Users size={18} />
                Pessoas
              </Link>
            </li>
            <li>
              <Link
                href="/admin/user"
                className={clsx(
                  "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                  pathname === "user" ? "text-background" : "text-foreground",
                  pathname === "user" &&
                    "bg-pink hover:bg-background hover:text-foreground",
                )}
              >
                <User size={18} />
                Usuários
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link href="/" target="_blank">
            <Button
              variant="link"
              className="m-0 flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold text-foreground"
            >
              <Browsers size={18} />
              Acessar o site
            </Button>
          </Link>
          <Button
            variant="link"
            onClick={() => signOut({ redirect: true, callbackUrl: "/admin" })}
            className="m-0 flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold text-foreground"
          >
            <SignOut size={18} />
            Deslogar
          </Button>
        </div>
      </div>
    </div>
  );
}
