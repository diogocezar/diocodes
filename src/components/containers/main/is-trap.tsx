import React from "react";
import { SubSubTitle, SubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";
import { Hightlight } from "@/components/app/main/hightlight";

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
      <Paragraph>
        Caso você não queira esperar, então é possível realizar uma mentoria{" "}
        <Hightlight>Premium</Hightlight>, com um valor simbólico de{" "}
        <Hightlight>R$ 100,00</Hightlight>.
      </Paragraph>
      <Paragraph>
        Por enquanto, basta enviar um e-mail para:{" "}
        <Hightlight>diogo@diogocezar.com</Hightlight>
      </Paragraph>
    </>
  );
});

IsTrap.displayName = "IsTrap";

export { IsTrap };
