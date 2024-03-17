import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countMentoringTotal } from "@/database/dashboard";
import { Plant } from "@phosphor-icons/react/dist/ssr";

export default async function MentoringTotal() {
  const result = await countMentoringTotal();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
          <Plant className="h-6 w-6" /> Total de Mentorias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-7xl font-bold">{result}</div>
      </CardContent>
    </Card>
  );
}
