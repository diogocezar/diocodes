import React from "react";
import { HeaderImage } from "@/components/app/image";
import Diocodes from "@/assets/diocodes";
import { SubTitle, Title } from "@/components/app/titles";

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <HeaderImage>
        <Diocodes />
      </HeaderImage>
      <Title className="md:max-w-[80%] lg:max-w-[50%]">
        Mentoria Gratuita em Tecnologia com{" "}
        <span className="text-green text-4xl md:text-7xl">Diogão</span>
      </Title>
      <SubTitle>Explorando as Oportunidades na Área de Tecnologia</SubTitle>
    </>
  );
});

Header.displayName = "Header";

export { Header };
