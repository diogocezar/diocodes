import React from "react";
import { Paragraph } from "@/components/app/main/paragraph";
import { Hightlight } from "@/components/app/main/hightlight";
import { getXpYear } from "@/lib/utils";
import { Box } from "@/components/app/main/box";

const Presentation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  const xpYears = getXpYear();
  return (
    <Box>
      <Paragraph>
        Sou Diogo, um entusiasta da tecnologia com{" "}
        <Hightlight>{xpYears} anos</Hightlight> de experiência, ex-professor na
        UTFPR e atual Head de Tecnologia e CEO de uma startup de IA. Minha
        trajetória é marcada pela paixão em transformar ideias em realidade e
        ajudar outros a fazerem o mesmo.
      </Paragraph>
      <Paragraph>
        Como mentor, palestrante e líder, minha missão é impulsionar talentos e
        moldar a próxima geração de profissionais de tecnologia. Minha abordagem
        prática e visionária combina anos de experiência em gestão de equipes,
        desenvolvimento de produtos e ensino acadêmico.
      </Paragraph>
      <Paragraph className="mb-0">
        Junte-se a mim nessa jornada! Se você busca orientação personalizada,
        insights sobre tendências ou estratégias para superar desafios, estou
        aqui para ajudar. Vamos transformar suas ambições em realizações
        concretas na vibrante indústria de tecnologia.
      </Paragraph>
    </Box>
  );
});

Presentation.displayName = "Presentation";

export { Presentation };
