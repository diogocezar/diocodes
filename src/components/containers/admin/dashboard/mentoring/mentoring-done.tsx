import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countMentoringDone } from "@/database/dashboard";
import { Plant } from "@phosphor-icons/react/dist/ssr";

export default async function MentoringDone() {
  const result = await countMentoringDone();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
          <Plant className="h-6 w-6" /> Mentorias Realizadas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-7xl font-bold">{result}</div>
      </CardContent>
    </Card>
  );
}
