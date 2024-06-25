import React from "react";
import { HeaderImage } from "@/components/app/main/image";
import Diocodes from "@/assets/diocodes";
import { SubTitle, Title } from "@/components/app/main/titles";

type HeaderProps = {
  headerTitle?: string;
  headerSubTitle?: string;
};

const Header: React.FC<HeaderProps> = ({ headerTitle, headerSubTitle }) => {
  return (
    <>
      <HeaderImage>
        <Diocodes />
      </HeaderImage>
      <Title className="md:max-w-[80%] lg:max-w-[60%]">
        {headerTitle ? (
          headerTitle
        ) : (
          <>
            Mentoria Gratuita em Tecnologia com{" "}
            <span className="text-4xl text-green md:text-7xl">Diogão</span>
          </>
        )}
      </Title>
      <SubTitle>
        {headerSubTitle
          ? headerSubTitle
          : "Explorando as Oportunidades na Área de Tecnologia"}
      </SubTitle>
    </>
  );
};

Header.displayName = "Header";

export { Header };
