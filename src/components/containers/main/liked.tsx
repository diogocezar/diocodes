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
          É fácil! Marque uma mentoria gratuita comigo clicando em{" "}
          <Button
            variant={"link"}
            className="font-fira shadow-none text-background-dark tracking-tighter"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Hightlight className="underline">Mentoria Free</Hightlight>
          </Button>
        </Paragraph>
        <Paragraph>
          Não se esqueça de preencher o campo “Como posso te ajudar?”. Me conte,
          de forma resumida, suas dificuldades, o que gostaria de aprender, ou
          qualquer outra coisa relevante.
        </Paragraph>
        <Paragraph className="mb-0">
          Aguarde a confirmação do agendamento. Se eu não conseguir confirmar,
          tente agendar em outro horário. Vamos juntos transformar suas ideias
          em conquistas!
        </Paragraph>
      </Box>
    </>
  );
});

Liked.displayName = "Liked";

export { Liked };
