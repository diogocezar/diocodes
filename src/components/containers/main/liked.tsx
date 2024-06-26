import React from "react";
import { SubSubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";
import { Hightlight } from "@/components/app/main/hightlight";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/app/main/box";

const Liked = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <SubSubTitle>Tá! Curti! Como eu faço?</SubSubTitle>
      <Box>
        <Paragraph>
          Marque uma mentoria <Hightlight>free</Hightlight> comigo clicando em{" "}
          <Button
            variant={"link"}
            className="font-fira"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Hightlight className="underline">Mentoria Free</Hightlight>
          </Button>
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
          É importante que você aguarde a <Hightlight>confirmação</Hightlight>{" "}
          do agendamento! Caso eu não consiga confirmar, tente agendar em um
          outro horário!
        </Paragraph>
      </Box>
    </>
  );
});

Liked.displayName = "Liked";

export { Liked };
