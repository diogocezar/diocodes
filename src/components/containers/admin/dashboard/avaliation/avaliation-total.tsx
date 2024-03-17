import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countAvaliationTotal } from "@/database/dashboard";
import { Star } from "@phosphor-icons/react/dist/ssr";

export default async function AvaliationTotal() {
  const result = await countAvaliationTotal();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
          <Star className="h-6 w-6" /> Total de Avaliações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-7xl font-bold">{result}</div>
      </CardContent>
    </Card>
  );
}
