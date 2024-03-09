import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypeMentoring } from "@/types/type-mentoring";

type RecentMentoringProps = {
  mentoring: {
    attendee: { name: string; email: string };
    id: string;
    startTime: Date;
  }[];
};

export function RecentMentoring({ mentoring }: RecentMentoringProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-6">
        {mentoring?.map((item) => (
          <div key={item.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={`/avatars/0${Math.floor(Math.random() * 5) + 1}.png`}
                alt="Avatar"
              />
              <AvatarFallback>OM</AvatarFallback>
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
  );
}
