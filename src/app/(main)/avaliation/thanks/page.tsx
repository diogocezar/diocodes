"use client";
import { Container } from "@/components/app/main/container";
import { SubSubTitle } from "@/components/app/main/titles";
import { Header } from "@/components/containers/main/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainPage() {
  return (
    <>
      <Container className="h-[calc(100vh-225px)] md:h-[calc(100vh-230px)] lg:h-[calc(100vh-220px)]">
        <Header
          headerTitle="Obrigado por avaliar!"
          headerSubTitle="Sua avaliação é muito importante!"
        />
        <SubSubTitle>Se cuide e até mais!</SubSubTitle>
        <Link href="/">
          <Button
            type="button"
            className="mb-2 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-pink hover:bg-card hover:text-green sm:w-[300px] md:mb-8 md:mt-10 md:justify-center"
          >
            Página Principal
          </Button>
        </Link>
      </Container>
    </>
  );
}
