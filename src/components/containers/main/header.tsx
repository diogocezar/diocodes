import React from "react";
import { SubTitle, Title } from "@/components/app/main/titles";
import Image from "next/image";

type HeaderProps = {
  headerTitle?: string;
  headerSubTitle?: string;
};

const Header: React.FC<HeaderProps> = ({ headerTitle, headerSubTitle }) => {
  return (
    <>
      <Title className="md:max-w-[85%] lg:max-w-[70%]">
        {headerTitle ? (
          <span>{headerTitle}</span>
        ) : (
          <>
            <span className="mt-10">
              <span className="leading-[4rem]">
                Mentoria Gratuita em Tecnologia com{"  "}
              </span>
              <Image
                className="h-[120px] inline"
                src="assets/images/logo/logo-simple.svg"
                width={200}
                height={120}
                alt="Avatar do Diogão"
              />
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
