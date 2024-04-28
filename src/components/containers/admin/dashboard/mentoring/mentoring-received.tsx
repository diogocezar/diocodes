import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PRICE } from "@/contants/price";
import { sumPayments } from "@/database/dashboard";
import { formatCurrency } from "@/lib/utils";
import { Money } from "@phosphor-icons/react/dist/ssr";

export default async function MentoringReceived() {
  const { _sum } = await sumPayments();
  const priceByMentoring = formatCurrency(PRICE.MENTORING_PRO);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
          <Money className="h-6 w-6" /> Total Recebido
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-4xl font-bold">
          {formatCurrency(_sum.amount)}
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>Preço por mentoria {priceByMentoring}</CardDescription>
      </CardFooter>
    </Card>
  );
}
