import React, { useCallback, useEffect, useState } from "react";
import { SubSubTitle, SubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";
import { Spinner } from "@phosphor-icons/react";
import { Mentoring } from "@/components/app/main/mentoring";
import { TypeMentoring } from "@/types/type-mentoring";
import { api } from "@/services/api";
import { Hightlight } from "@/components/app/main/hightlight";
import { CAL } from "@/contants/cal";

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
        <Paragraph className="mb-8 flex flex-row gap-2">
          <Spinner size={20} className="animate-spin" />
          Carregando...
        </Paragraph>
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
