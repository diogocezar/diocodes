import React from "react";
import { SubSubTitle } from "@/components/app/main/titles";
import { Mentoring } from "@/components/app/main/mentoring";
import { TypeMentoring } from "@/types/type-mentoring";
import { CAL } from "@/contants/cal";
import { useGetMentoring } from "@/hooks/use-get-mentoring";
import SkeletonWhoBooked from "@/components/skeletons/skeleton-who-booked";

const WhoBooked = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  const { mentoring, isLoadingMentoring } = useGetMentoring("mentoring");
  return (
    <>
      <SubSubTitle>Quem já reservou?</SubSubTitle>
      {isLoadingMentoring ? (
        <SkeletonWhoBooked />
      ) : (
        <div>
          <ul className="mb-8 flex w-full flex-row flex-wrap">
            {mentoring.map((item: TypeMentoring, index) => (
              <Mentoring
                key={index}
                startTime={item.startTime}
                attendee={item.attendee}
                isFree={item.externalEventId === CAL.MENTORING_FREE}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
});

WhoBooked.displayName = "WhoBooked";

export { WhoBooked };
