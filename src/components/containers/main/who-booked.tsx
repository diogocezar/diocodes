import React, { useCallback, useEffect, useState } from "react";
import { SubSubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";
import { Spinner } from "@phosphor-icons/react";
import { Mentoring } from "@/components/app/main/mentoring";
import { TypeMentoring } from "@/types/type-mentoring";
import { api } from "@/services/api";

const WhoBooked = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  const [isLoadingMentoring, setIsLoadingMentoring] = useState(false);
  const [mentoring, setMentoring] = useState(Array<TypeMentoring>);
  const getMentoring = useCallback(async () => {
    try {
      setIsLoadingMentoring(true);
      const response = await api.get("mentoring");
      setMentoring(response.data);
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
        <ul className="mb-8 flex w-full flex-row flex-wrap">
          {mentoring.map((item: TypeMentoring, index) => (
            <Mentoring
              key={index}
              startTime={item.startTime}
              attendee={item.attendee}
            />
          ))}
        </ul>
      )}
    </>
  );
});

WhoBooked.displayName = "WhoBooked";

export { WhoBooked };
