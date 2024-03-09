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
import { useCallback, useEffect, useState } from "react";
import { api } from "@/services/api";
import { TypeDashboard } from "@/types/type-dashboard";
import { Spinner } from "@phosphor-icons/react";

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboard, setDashboard] = useState<TypeDashboard>(
    {} as TypeDashboard,
  );
  const getDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get("admin/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    getDashboard();
  }, [getDashboard]);
  return (
    <>
      <div className="flex-1 p-8 pt-6">
        <AdminTitle title="Dashboard" Icon={<ChartBar />} />
        {isLoading ? (
          <div className="text-foreground mt-8 flex w-full flex-row items-center gap-2">
            <Spinner size={20} className="animate-spin" />
            Carregando...
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-bold">
                    Mentorias Realizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">
                    {dashboard.mentoringDone}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-bold">
                    Mentorias a Realizar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">
                    {dashboard.mentoringToBe}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-bold">
                    Total de Mentorias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">
                    {dashboard.mentoring}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-bold">
                    Total de Avaliações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">
                    {dashboard.avaliation}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-bold">
                    Convites Enviados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">{dashboard.invite}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-bold">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">{dashboard.tag}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-bold">Pessoas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">{dashboard.person}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-bold">
                    Nota das Mentorias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 flex flex-row gap-1 text-3xl">
                    {[1, 2, 3, 4, 5].map((index) =>
                      index <= Math.round(dashboard.avaliationAvarage) ? (
                        <Star key={index} weight="fill" />
                      ) : (
                        <Star key={index} className="opacity-20" />
                      ),
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <CardDescription>
                    Nota {dashboard.avaliationAvarage}
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Avaliações por mês (2024)</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Graph data={dashboard.graph} />
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
        )}
      </div>
    </>
  );
}
