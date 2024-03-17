import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countTagTotal } from "@/database/dashboard";
import { Tag } from "@phosphor-icons/react/dist/ssr";

export default async function TagTotal() {
  const result = await countTagTotal();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
          <Tag className="h-6 w-6" /> Tags Cadastradas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-7xl font-bold">{result}</div>
      </CardContent>
    </Card>
  );
}
