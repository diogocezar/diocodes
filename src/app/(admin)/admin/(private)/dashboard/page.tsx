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
import { RecentMentoring } from "@/components/containers/admin/dashboard/recent-mentoring";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/services/api";
import { TypeDashboard } from "@/types/type-dashboard";
import {
  Spinner,
  Plant,
  Star,
  ChartBar,
  EnvelopeSimple,
  Tag,
  Users,
} from "@phosphor-icons/react";

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboard, setDashboard] = useState<TypeDashboard>(
    {} as TypeDashboard
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
                  <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
                    <Plant className="h-6 w-6" /> Mentorias Realizadas
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
                  <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
                    <Plant className="h-6 w-6" /> Mentorias Agendadas
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
                  <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
                    <Plant className="h-6 w-6" /> Total de Mentorias
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
                  <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
                    <Star className="h-6 w-6" /> Total de Avaliações
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
                  <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
                    <EnvelopeSimple className="h-6 w-6" /> Convites Enviados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">{dashboard.invite}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
                    <Tag className="h-6 w-6" /> Tags Cadastradas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">{dashboard.tag}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
                    <Users className="h-6 w-6" /> Pessoas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-7xl font-bold">{dashboard.person}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
                    <Star className="h-6 w-6" /> Média de Avaliações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 flex flex-row gap-1 text-3xl">
                    {[1, 2, 3, 4, 5].map((index) =>
                      index <= Math.round(dashboard.avaliationAvarage) ? (
                        <Star key={index} weight="fill" />
                      ) : (
                        <Star key={index} className="opacity-20" />
                      )
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
                  <CardTitle>
                    Avaliações por mês ({new Date().getFullYear()})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Graph data={dashboard.graph} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle className="mb-4">Próximas Mentorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentMentoring mentoring={dashboard.recentMentoring} />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
