import React, { useCallback, useEffect, useState } from "react";
import { SubSubTitle, SubTitle } from "@/components/app/main/titles";
import { Mentoring } from "@/components/app/main/mentoring";
import { TypeMentoring } from "@/types/type-mentoring";
import { api } from "@/services/api";
import { Hightlight } from "@/components/app/main/hightlight";
import { CAL } from "@/contants/cal";
import { Skeleton } from "@/components/ui/skeleton";

const WhoBooked = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  const [isLoadingMentoring, setIsLoadingMentoring] = useState(false);
  const [mentoring, setMentoring] = useState(Array<TypeMentoring>);
  const [lastDate, setLastDate] = useState<Date>();
  const getMentoring = useCallback(async () => {
    try {
      setIsLoadingMentoring(true);
      const response = await api.get("mentoring");
      const { data } = response;
      setLastDate(
        new Date(
          Math.max.apply(
            null,
            data.map((item: TypeMentoring) => new Date(item.startTime)),
          ),
        ),
      );
      setMentoring(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMentoring(false);
    }
  }, []);

  useEffect(() => {
    getMentoring();
  }, [getMentoring]);
  return (
    <>
      <SubSubTitle>Quem já reservou?</SubSubTitle>
      {isLoadingMentoring ? (
        <div className="flex w-full flex-row flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <div
              key={index}
              className="w-full space-y-4 md:w-[50%] lg:w-[33.3%] xl:w-[25%]"
            >
              <div className="mt-10">
                <Skeleton className="mb-4 h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[180px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <SubTitle>
            Temos revervas gratúitas até:{" "}
            <Hightlight>{lastDate?.toLocaleDateString("pt-BR")}</Hightlight>
          </SubTitle>
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
