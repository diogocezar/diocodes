import React from "react";
import { SubSubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";
import { Box } from "@/components/app/main/box";

const Why = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <SubSubTitle>Por que estou fazendo isso?</SubSubTitle>
      <Box>
        <Paragraph>
          Há algum tempo, percebi que meu conhecimento e experiência poderiam ir
          além das minhas conquistas pessoais. Senti a necessidade de
          compartilhar o que aprendi e fazer a diferença na vida de outras
          pessoas.
        </Paragraph>
        <Paragraph>
          Disponibilizo parte do meu tempo para ajudar quem realmente precisa a
          se aprimorar na área de tecnologia. Acredito que, juntos, podemos
          transformar desafios em oportunidades e sonhos em realidades.
        </Paragraph>
        <Paragraph className="mb-0">
          Se você está em busca de orientação, inspiração ou simplesmente um
          empurrãozinho na direção certa, estou aqui para guiá-lo nessa jornada
          emocionante e cheia de possibilidades.
        </Paragraph>
      </Box>
    </>
  );
});

Why.displayName = "Why";

export { Why };
