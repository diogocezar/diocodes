import { Badge } from "@/components/ui/badge";
import { Star, Circle } from "@phosphor-icons/react";
import { Checkbox } from "@/components/ui/checkbox";
import { CAL } from "@/contants/cal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { capitalizeString, compactName, generateGravatarHash } from "./utils";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

export const formatRowValue = (row: any, field: string) => {
  return row.getValue(field);
};

export const formatExternalMessage = (row: any) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="line-clamp-2 w-full overflow-hidden overflow-ellipsis text-xs">
            {row.getValue("externalMessage")}
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[300px] bg-background-dark text-xs">
          <p>{row.getValue("externalMessage")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const formatType = (row: any) => {
  return row?.original?.externalEventId === CAL.MENTORING_FREE ? (
    <Badge
      className="rounded-md bg-background px-4 py-1 text-xs font-normal text-foreground"
      variant="secondary"
    >
      Free
    </Badge>
  ) : (
    <Badge
      className="rounded-md bg-green px-4 py-1 text-xs font-bold text-background"
      variant="secondary"
    >
      Pro
    </Badge>
  );
};

export const formatStatus = (row: any) => {
  return row?.original?.externalStatus === CAL.STATUS_ACCEPTED ? (
    <Badge
      className="rounded-md bg-green px-4 py-1 text-xs font-bold text-background"
      variant="secondary"
    >
      Confirmado
    </Badge>
  ) : (
    <Badge
      className="rounded-md bg-background-dark px-4 py-1 text-xs font-bold text-foreground"
      variant="secondary"
    >
      Cancelado
    </Badge>
  );
};

export const formatTagQuantity = (row: any, maxTagUsed: number) => {
  const value = row.original?.avaliationTags?.length || 0;
  const percentage = (value / maxTagUsed) * 100;
  return (
    <div className="flex flex-row gap-2">
      <Progress value={percentage} className="w-[60%]" />
      <span className="text-xs text-foreground">
        {value} / {maxTagUsed}
      </span>
    </div>
  );
};

export const formatNameEmailWithAvatar = (email: string, name: string) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage
          src={`https://gravatar.com/avatar/${generateGravatarHash(email)}`}
          alt="Gravatar"
        />
      </Avatar>
      {capitalizeString(compactName(name))}
    </div>
  );
};

export const formatMentoring = (row: any) => {
  const { original } = row;
  const { mentoring } = original;
  const { attendee } = mentoring;
  const { name, email } = attendee;
  return formatNameEmailWithAvatar(email, name);
};

export const formatAttendee = (row: any) => {
  const { original } = row;
  const { attendee } = original;
  const { name, email } = attendee;
  return formatNameEmailWithAvatar(email, name);
};

export const formatSelect = (row: any) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
};

export const formatSelectMentoring = (row: any) => {
  const hasInvite = row.original?.invite.length > 0;
  const hasAvaliation = row.original?.avaliation === null;
  const isPast = new Date(row.original?.startTime) < new Date();
  return (
    <div className="flex flex-row items-center gap-4">
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
      {hasInvite ? (
        hasAvaliation ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Circle className="h-5 w-5 cursor-pointer text-pink" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Já foi enviado um convite</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Circle
                  weight="fill"
                  className="h-5 w-5 cursor-pointer text-green"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Já possui uma avaliação</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      ) : (
        <div>
          {isPast ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Circle className="h-5 w-5 cursor-pointer text-green" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Já aconteceu!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Circle className="h-5 w-5 cursor-pointer opacity-50" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Está agendado</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </div>
  );
};

export const formatSelectInvite = (row: any) => {
  const hasAvaliation = row.original.mentoring.avaliation;
  return (
    <div className="flex flex-row items-center gap-4">
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
      {hasAvaliation ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Circle
                weight="fill"
                className="h-5 w-5 cursor-pointer text-green"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Avaliação já foi enviada</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Circle className="h-5 w-5 cursor-pointer text-green" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Ainda não enviou a avaliação</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export const formatDate = (startTime: Date, endTime: Date) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs">{`${new Date(startTime).toLocaleDateString("pt-BR")}`}</span>
      <span className="text-xs opacity-40">
        {new Date(startTime).toLocaleTimeString("pt-BR")}
        {" - "}
        {new Date(endTime).toLocaleTimeString("pt-BR")}
      </span>
    </div>
  );
};

export const formatShowComment = (row: any) => {
  return row.getValue("showComment")!! === true ? (
    <Switch className="important:mt-0" checked={true} disabled={true} />
  ) : (
    <Switch className="important:mt-0" checked={false} disabled={true} />
  );
};

export const formatCreatedAt = (row: any) => {
  return new Date(row.getValue("createdAt")).toLocaleDateString("pt-BR");
};

export const formatTags = (row: any) => {
  const { original } = row;
  const { avaliationTags } = original;
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {avaliationTags.map((avaliationTag: any) => {
        return (
          <Badge
            key={avaliationTag?.tag?.name}
            className="rounded-md bg-background px-2 py-1 text-xs font-normal text-foreground"
            variant="secondary"
          >
            {avaliationTag?.tag?.name}
          </Badge>
        );
      })}
    </div>
  );
};

export const formatRating = (row: any) => {
  const { original } = row;
  const { rating } = original;
  const normalizedValue = Math.min(Math.max(rating, 1), 5);
  const filledStars = Array.from(
    { length: normalizedValue },
    (_, index) => index + 1,
  );
  const emptyStars = Array.from(
    { length: 5 - normalizedValue },
    (_, index) => index + 1 + normalizedValue,
  );
  return (
    <div className="flex flex-row">
      {filledStars.map((_, index) => (
        <Star key={index} weight="fill" className="text-foreground" size={20} />
      ))}
      {emptyStars.map((_, index) => (
        <Star key={index} className="text-foreground opacity-20" size={20} />
      ))}
    </div>
  );
};
