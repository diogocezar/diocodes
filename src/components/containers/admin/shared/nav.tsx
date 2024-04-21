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
  PiggyBank,
  Binoculars,
  WebhooksLogo,
} from "@phosphor-icons/react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useOpenedState } from "@/hooks/use-opened-state";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Nav() {
  const { data: session } = useSession();
  const { image, name } = session?.user || {};
  const pathname = usePathname().replace("/admin/", "");
  const setIsOpened = useOpenedState((state) => state.setIsOpened);
  const isOpened = useOpenedState((state) => state.isOpened);
  return (
    <div
      style={{ width: isOpened ? 240 : 72 }}
      className="fixed flex h-screen flex-col gap-4 bg-background-dark px-4 py-6 z-50"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex h-14 w-full flex-row items-center gap-4">
            <Avatar className="h-10 w-10 items-center rounded-full">
              <AvatarImage
                src={image || ""}
                className="h-10 w-10 rounded-full"
              />
              <AvatarFallback className="h-10 w-10 rounded-full">
                {name &&
                  name
                    .split(" ")
                    .map((name) => name[0].toUpperCase())
                    .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-lg font-bold text-foreground line-clamp-1">
              {name && compactName(name)}
            </div>
            {isOpened && (
              <div className="flex items-center justify-center w-[35px] h-[35px] absolute right-[-15px]">
                <Button
                  className="flex w-full h-9 bg-green cursor-crosshair flex-row items-center justify-center gap-2 rounded-lg px-1 py-1 font-bold hover:bg-pink m-0"
                  onClick={() => setIsOpened(!isOpened)}
                >
                  <ChevronsLeft size={16} />
                </Button>
              </div>
            )}
          </div>
          <Separator />
          <ul className="mt-1 flex flex-col gap-3">
            {!isOpened && (
              <li>
                <Button
                  onClick={() => setIsOpened(!isOpened)}
                  className="flex h-9 bg-green cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-pink m-0"
                >
                  <ChevronsRight size={16} />
                </Button>
              </li>
            )}
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
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
                      {isOpened && "Dashboard"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right" className="opacity-100">
                      Dashboard
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Link
                      href="/admin/payment"
                      className={clsx(
                        "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                        pathname === "payment"
                          ? "text-background"
                          : "text-foreground",
                        pathname === "payment" &&
                          "bg-pink hover:bg-background hover:text-foreground",
                      )}
                    >
                      <PiggyBank size={18} />
                      {isOpened && "Pagamentos"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right" className="opacity-100">
                      Pagamentos
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
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
                      {isOpened && "Mentorias"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Mentorias</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
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
                      {isOpened && "Avaliações"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Avaliações</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Link
                      href="/admin/invite"
                      className={clsx(
                        "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                        pathname === "invite"
                          ? "text-background"
                          : "text-foreground",
                        pathname === "invite" &&
                          "bg-pink hover:bg-background hover:text-foreground",
                      )}
                    >
                      <EnvelopeSimple size={18} />
                      {isOpened && "Convites"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Convites</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Link
                      href="/admin/tag"
                      className={clsx(
                        "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                        pathname === "tag"
                          ? "text-background"
                          : "text-foreground",
                        pathname === "tag" &&
                          "bg-pink hover:bg-background hover:text-foreground",
                      )}
                    >
                      <Tag size={18} />
                      {isOpened && "Tags"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Tags</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Link
                      href="/admin/person"
                      className={clsx(
                        "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                        pathname === "person"
                          ? "text-background"
                          : "text-foreground",
                        pathname === "person" &&
                          "bg-pink hover:bg-background hover:text-foreground",
                      )}
                    >
                      <Users size={18} />
                      {isOpened && "Pessoas"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Pessoas</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Link
                      href="/admin/user"
                      className={clsx(
                        "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                        pathname === "user"
                          ? "text-background"
                          : "text-foreground",
                        pathname === "user" &&
                          "bg-pink hover:bg-background hover:text-foreground",
                      )}
                    >
                      <User size={18} />
                      {isOpened && "Usuários"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Usuários</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Link
                      href="/admin/log"
                      className={clsx(
                        "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                        pathname === "user"
                          ? "text-background"
                          : "text-foreground",
                        pathname === "user" &&
                          "bg-pink hover:bg-background hover:text-foreground",
                      )}
                    >
                      <Binoculars size={18} />
                      {isOpened && "Logs"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Logs</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Link
                      href="/admin/webhook-log"
                      className={clsx(
                        "flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-background",
                        pathname === "user"
                          ? "text-background"
                          : "text-foreground",
                        pathname === "user" &&
                          "bg-pink hover:bg-background hover:text-foreground",
                      )}
                    >
                      <WebhooksLogo size={18} />
                      {isOpened && "Webhook Logs"}
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Webhook Logs</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </div>
        <div>
          <Separator />
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full" asChild>
                    <Link href="/" target="_blank">
                      <Button
                        variant="link"
                        className="m-0 flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold text-foreground"
                      >
                        <Browsers size={18} />
                        {isOpened && "Acessar o site"}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Acessar o site</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full" asChild>
                    <Button
                      variant="link"
                      onClick={() =>
                        signOut({ redirect: true, callbackUrl: "/admin" })
                      }
                      className="m-0 flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold text-foreground"
                    >
                      <SignOut size={18} />
                      {isOpened && "Deslogar"}
                    </Button>
                  </TooltipTrigger>
                  {!isOpened && (
                    <TooltipContent side="right">Deslogar</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
