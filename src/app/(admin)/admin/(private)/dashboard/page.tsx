"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Graph } from "@/components/containers/admin/dashboard/graph";
import { RecentBookings } from "@/components/containers/admin/dashboard/recent-bookings";
import { ChartBar, Star } from "@phosphor-icons/react";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";

export default function AdminDashboardPage() {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdminTitle title="Dashboard" Icon={<ChartBar />} />
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
                <Star className="opacity-20" />
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
              <CardTitle>Avaliações por mês (2024)</CardTitle>
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
      </div>
    </>
  );
}
