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
          Se você é um iniciante curioso ou um profissional experiente buscando
          novos desafios, essa mentoria é para você. Não importa o seu nível de
          conhecimento, estou aqui para te ajudar a crescer e alcançar seus
          objetivos na área de tecnologia.
        </Paragraph>
        <Paragraph className="mb-0">
          Vamos juntos transformar suas dúvidas em soluções, suas ideias em
          projetos e suas ambições em realizações. Venha fazer parte dessa
          jornada de aprendizado e inovação!
        </Paragraph>
      </Box>
    </>
  );
});

Who.displayName = "Who";

export { Who };
