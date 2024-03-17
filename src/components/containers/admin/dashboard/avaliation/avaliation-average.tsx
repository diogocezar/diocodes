import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { averageAvaliationTotal } from "@/database/dashboard";
import { Star } from "@phosphor-icons/react/dist/ssr";

export default async function AvaliationAverage() {
  const result = await averageAvaliationTotal();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
          <Star className="h-6 w-6" /> Média de Avaliações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex flex-row gap-1 text-3xl">
          {[1, 2, 3, 4, 5].map((index) =>
            index <= Math.round(result) ? (
              <Star key={index} weight="fill" />
            ) : (
              <Star key={index} className="opacity-20" />
            ),
          )}
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>Nota {result}</CardDescription>
      </CardFooter>
    </Card>
  );
}
