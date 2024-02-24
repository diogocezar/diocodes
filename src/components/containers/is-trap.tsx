import React from "react";
import { SubSubTitle, SubTitle } from "@/components/app/titles";
import { Paragraph } from "@/components/app/paragraph";
import { Hightlight } from "@/components/app/hightlight";

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

      <Paragraph>
        <Hightlight>Não!</Hightlight> Não tem pegadinha! Não tem venda de curso!
        Não preciso dos seus dados, não tem e-book!
      </Paragraph>
      <Paragraph>
        Enquanto eu conseguir, vou disponibilizar meu tempo de forma gratúita
        para ajudar.
      </Paragraph>
      <Paragraph>
        As mentorias podem ser agendadas 2 vezes por semana (com papos de 30
        minutos).
      </Paragraph>
    </>
  );
});

IsTrap.displayName = "IsTrap";

export { IsTrap };