import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countInviteTotal } from "@/database/dashboard";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

export default async function InviteSent() {
  const result = await countInviteTotal();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-green flex flex-row gap-2 text-base font-bold">
          <EnvelopeSimple className="h-6 w-6" /> Convites Enviados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-7xl font-bold">{result}</div>
      </CardContent>
    </Card>
  );
}
