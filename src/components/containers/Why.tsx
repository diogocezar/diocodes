import React from "react";
import { SubSubTitle } from "@/components/app/titles";
import { Hightlight } from "@/components/app/hightlight";
import { Paragraph } from "@/components/app/paragraph";

const Why = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <SubSubTitle>Por que estou fazendo isso?</SubSubTitle>
      <Paragraph>
        Já a algum tempo, sinto que posso <Hightlight>compartilhar</Hightlight>{" "}
        um pouco do que aprendi.
      </Paragraph>
      <Paragraph>
        Estou disponibilizando parte do meu tempo para ajudar pessoas{" "}
        <Hightlight>(que realmente precisam)</Hightlight> a se aprimorarem na
        área de tecnologia.
      </Paragraph>
    </>
  );
});

Why.displayName = "Why";

export { Why };
