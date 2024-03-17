import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNextMentoring } from "@/database/dashboard";
import { generateGravatarHash } from "@/lib/utils";

export default async function MentoringNext() {
  const mentoring = await getNextMentoring();
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="mb-4">Próximas Mentorias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex flex-col justify-between gap-6">
            {mentoring?.map((item) => (
              <div key={item.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`https://gravatar.com/avatar/${generateGravatarHash(item.attendee.email)}`}
                    alt="Gravatar"
                  />
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {item.attendee.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {item.attendee.email}
                  </p>
                </div>
                <div className="ml-auto text-xs">
                  {new Date(item.startTime).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(item.startTime).toLocaleTimeString("pt-BR")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
