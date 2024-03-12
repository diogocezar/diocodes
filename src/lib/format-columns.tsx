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

export const formatRowValue = (row: any, field: string) => {
  return row.getValue(field);
};

export const formatExternalMessage = (row: any) => {
  return (
    <div className="h-[30px] w-full overflow-hidden overflow-ellipsis text-xs">
      {row.getValue("externalMessage")}
    </div>
  );
};

export const formatType = (row: any) => {
  return row?.original?.externalEventId === CAL.MENTORING_FREE
    ? "Grátis"
    : "Pro";
};

export const formatAttendee = (row: any) => {
  const { original } = row;
  const { attendee } = original;
  return `${attendee.name}`;
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
                <Circle className="text-pink h-5 w-5 cursor-pointer" />
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
                  className="text-green h-5 w-5 cursor-pointer"
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
                  <Circle className="text-green h-5 w-5 cursor-pointer" />
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
                className="text-green h-5 w-5 cursor-pointer"
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
              <Circle className="text-green h-5 w-5 cursor-pointer" />
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

export const formatCreatedAt = (row: any) => {
  return new Date(row.getValue("createdAt")).toLocaleDateString("pt-BR");
};

export const formatMentoring = (row: any) => {
  const { original } = row;
  const { mentoring } = original;
  const { attendee } = mentoring;
  return `${attendee.name}`;
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
            className="bg-background text-foreground rounded-md px-4 py-1 text-sm font-normal"
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
