import React from "react";
import { SubTitle, Title } from "@/components/app/main/titles";

type HeaderProps = {
  headerTitle?: string;
  headerSubTitle?: string;
};

const Header: React.FC<HeaderProps> = ({ headerTitle, headerSubTitle }) => {
  return (
    <>
      <Title className="md:max-w-[80%] lg:max-w-[60%]">
        {headerTitle ? (
          <span>{headerTitle}</span>
        ) : (
          <>
            <span className="mt-10">Mentoria Gratuita em Tecnologia com </span>
            <span className="text-5xl text-pink-primary md:text-8xl">
              Diogão
            </span>
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
