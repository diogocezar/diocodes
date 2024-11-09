import React from "react";
import { SubSubTitle, SubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";
import { Hightlight } from "@/components/app/main/hightlight";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/app/main/box";
import { formatCurrency } from "@/lib/utils";
import { PRICE } from "@/contants/price";

const IsTrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <SubSubTitle>Qual é a pegadinha?</SubSubTitle>
      <SubTitle>
        Você deve estar esperando que agora eu tente te vender um curso de “Como
        ser Dev em 3 Semanas”, certo?
      </SubTitle>
      <Box>
        <Paragraph>
          <Hightlight>Errado!</Hightlight> Aqui não tem pegadinha, não tem venda
          de curso, nem coleta de dados ou e-book “milagroso”. Meu objetivo é
          simples e genuíno: ajudar você a crescer na área de tecnologia, de
          forma totalmente gratuita.
        </Paragraph>
        <Paragraph className="mb-0">
          Enquanto eu puder, vou disponibilizar parte do meu tempo para oferecer
          mentorias gratuitas, sem compromisso.
        </Paragraph>
      </Box>
      <SubSubTitle>Poxa, não tem como furar a fila?</SubSubTitle>
      <Box>
        <Paragraph>
          Quer evitar a espera? Sem problemas! Estou oferecendo também uma
          mentoria Pro, onde você terá acesso a uma sessão exclusiva de 45
          minutos por {formatCurrency(PRICE.MENTORING_PRO)}.
        </Paragraph>
        <Paragraph className="mb-0">
          Garanta seu horário e acelere seu aprendizado clicando em{" "}
          <Button
            variant={"link"}
            className="font-fira shadow-none text-background-dark tracking-tighter"
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
