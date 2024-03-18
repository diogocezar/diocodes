import React from "react";
import { SubSubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";

const Statistics = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <SubSubTitle>Estatísticas das mentorias</SubSubTitle>
      <Paragraph>
        A seguir, um pouco sobre as mentorias já realizadas!
      </Paragraph>
    </>
  );
});

Statistics.displayName = "Statistics";

export { Statistics };
