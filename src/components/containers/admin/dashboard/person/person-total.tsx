import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countPersonTotal } from "@/database/dashboard";
import { Users } from "@phosphor-icons/react/dist/ssr";

export default async function PersonTotal() {
  const result = await countPersonTotal();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
          <Users className="h-6 w-6" /> Pessoas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-7xl font-bold">{result}</div>
      </CardContent>
    </Card>
  );
}
