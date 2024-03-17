import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAvaliationsByMonth } from "@/database/dashboard";
import { GraphAvaliationByMonth } from "./graph-avaliation-by-month";

export default async function AvaliationByMonth() {
  const result = await getAvaliationsByMonth();
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Avaliações por mês ({new Date().getFullYear()})</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <GraphAvaliationByMonth data={result} />
      </CardContent>
    </Card>
  );
}
