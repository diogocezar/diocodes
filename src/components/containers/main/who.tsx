import React from "react";
import { SubSubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";
import { Box } from "@/components/app/main/box";

const Who = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <SubSubTitle>Para quem é a mentoria?</SubSubTitle>
      <Box>
        <Paragraph>
          Não importa qual é o seu nível de conhecimento. Se você está
          começando, ou se já tem alguma experiência, eu posso te ajudar!
        </Paragraph>
      </Box>
    </>
  );
});

Who.displayName = "Who";

export { Who };
