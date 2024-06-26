import React from "react";
import { SubSubTitle, SubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";
import { Hightlight } from "@/components/app/main/hightlight";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/app/main/box";

const IsTrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <SubSubTitle>Qual é a pegadinha?</SubSubTitle>
      <SubTitle>
        É agora o momento que eu vendo um curso de como ser dev em 3 semanas?
      </SubTitle>
      <Box>
        <Paragraph>
          <Hightlight>Não!</Hightlight> Não tem pegadinha! Não tem venda de
          curso! Não preciso dos seus dados, não tem e-book!
        </Paragraph>
        <Paragraph>
          Enquanto eu conseguir, vou disponibilizar meu tempo de forma gratúita
          para ajudar.
        </Paragraph>
        <Paragraph>
          As mentorias podem ser agendadas 2 vezes por semana (com papos de 30
          minutos).
        </Paragraph>
      </Box>
      <SubSubTitle>Poxa, não tem como furar a fila?</SubSubTitle>
      <Box>
        <Paragraph>
          Caso você não queira esperar, estou também disponibilizando uma
          mentoria <Hightlight>Pro</Hightlight>, com o valor de{" "}
          <Hightlight>R$ 120,00</Hightlight> por{" "}
          <Hightlight>45 minutos</Hightlight>.
        </Paragraph>
        <Paragraph>
          Marque uma mentoria <Hightlight>pro</Hightlight> comigo clicando em{" "}
          <Button
            variant={"link"}
            className="font-fira"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Hightlight className="underline">Mentoria Pro</Hightlight>
          </Button>
        </Paragraph>
      </Box>
    </>
  );
});

IsTrap.displayName = "IsTrap";

export { IsTrap };
