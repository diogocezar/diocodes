"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Graph } from "@/components/containers/admin/dashboard/graph";
import { RecentBookings } from "@/components/containers/admin/dashboard/recent-bookings";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { compactName } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  ChartBar,
  Star,
  Calendar,
  SignOut,
  Browsers,
} from "@phosphor-icons/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { image, name } = session?.user || {};
  return (
    <>
      <div className="bg-dots flex h-screen">
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
                    className="text-background bg-pink hover:bg-background hover:text-foreground flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold"
                  >
                    <ChartBar size={18} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/avaliation"
                    className="text-foreground hover:bg-background flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold"
                  >
                    <Star size={18} />
                    Avaliações
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/booking"
                    className="text-foreground hover:bg-background flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold"
                  >
                    <Calendar size={18} />
                    Reservas
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="text-foreground hover:bg-background flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold"
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
                onClick={() =>
                  signOut({ redirect: true, callbackUrl: "/admin" })
                }
                className="text-foreground m-0 flex h-9 cursor-crosshair flex-row items-center gap-2 rounded-lg px-3 py-2 font-bold"
              >
                <SignOut size={18} />
                Deslogar
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-foreground mb-3 mt-2 flex flex-row gap-2 text-4xl font-bold tracking-tight">
              <ChartBar className="h-9 w-9" /> Dashboard
            </h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-bold">
                      Mentorias Realizadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-7xl font-bold">35</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-bold">
                      Mentorias a Realizar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-7xl font-bold">45</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-bold">
                      Total de Agendamentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-7xl font-bold">80</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-bold">
                      Total de Avaliações
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-7xl font-bold">45</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-bold">
                      Mentorias Realizadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-7xl font-bold">35</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-bold">
                      Mentorias a Realizar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-7xl font-bold">45</div>
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-bold">
                      Nota das Mentorias
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2 flex flex-row gap-1 text-3xl">
                      {[1, 2, 3, 4].map((index) => (
                        <Star weight="fill" key={index} />
                      ))}
                      <Star />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <CardDescription>Nota 4.56</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Mentorias por mês (2024)</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Graph />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle className="mb-4">Últimos Agendamentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentBookings />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
