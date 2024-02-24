import React from "react";
import { SubSubTitle } from "@/components/app/titles";
import { Paragraph } from "@/components/app/paragraph";
import { Hightlight } from "@/components/app/hightlight";
import { Button } from "@/components/ui/button";

const Liked = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <SubSubTitle>Tá! Curti! Como eu faço?</SubSubTitle>
      <Paragraph>
        Marque um papo comigo clicando no{" "}
        <Button
          variant={"link"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Hightlight className="underline">Agendar Mentoria</Hightlight>
        </Button>
        .
      </Paragraph>
      <Paragraph>
        Não se esqueça de preencher o campo{" "}
        <Hightlight>como posso te ajudar?</Hightlight>
      </Paragraph>
      <Paragraph>
        Me conte de forma resumida, quais são as suas dificuldades, o que
        gostaria de aprender, ou qualquer outra coisa que achar relevante!
      </Paragraph>
      <Paragraph>
        É importante que você aguarde a <Hightlight>confirmação</Hightlight> do
        agendamento! Caso eu não consiga confirmar, tente agendar em um outro
        horário!
      </Paragraph>
    </>
  );
});

Liked.displayName = "Liked";

export { Liked };
