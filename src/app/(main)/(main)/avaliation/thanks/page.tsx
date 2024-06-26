"use client";
import { Container } from "@/components/app/main/container";
import { SubSubTitle } from "@/components/app/main/titles";
import { Header } from "@/components/containers/main/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainPage() {
  return (
    <>
      <Container className="h-[calc(100vh-264px)] md:h-[calc(100vh-280px)] lg:h-[calc(100vh-204px)]">
        <Header
          headerTitle="Obrigado por avaliar!"
          headerSubTitle="Sua avaliação é muito importante!"
        />
        <SubSubTitle>Se cuide e até mais!</SubSubTitle>
        <Link href="/">
          <Button
            type="button"
            className="me-button rounded-none mb-0 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-foreground hover:bg-green hover:text-background-dark md:w-[270px] md:mb-8 md:mt-10 md:justify-center"
          >
            Página Principal
          </Button>
        </Link>
      </Container>
    </>
  );
}
