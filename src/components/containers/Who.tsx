import React from "react";
import { SubSubTitle } from "@/components/app/Titles";
import { Paragraph } from "@/components/app/Paragraphs";

const Who = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <SubSubTitle>Para quem é a mentoria?</SubSubTitle>
      <Paragraph>
        Não importa qual é o seu nível de conhecimento. Se você está começando,
        ou se já tem alguma experiência, eu posso te ajudar!
      </Paragraph>
    </>
  );
});

Who.displayName = "Who";

export { Who };
