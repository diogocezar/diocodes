"use client";
import { Container } from "@/components/app/main/container";
import { SubSubTitle } from "@/components/app/main/titles";
import { Header } from "@/components/containers/main/header";
import { Button } from "@/components/ui/button";
import { MeImage } from "@/components/app/main/image";
import Link from "next/link";

export default function MainPage() {
  return (
    <>
      <Container>
        <MeImage />
        <Header
          headerTitle="Obrigado por avaliar!"
          headerSubTitle="Sua avaliação é muito importante!"
        />
        <SubSubTitle>Se cuide e até mais!</SubSubTitle>
        <Link href="/">
          <Button className="bg-pink-primary text-foreground hover:bg-background hover:text-foreground rounded-lg mb-0 mt-6 flex w-full flex-row items-center justify-center h-[60px] gap-2 lg:w-[350px] lg:mb-8 lg:mt-10 lg:justify-center">
            PÁGINA PRINCIPAL
          </Button>
        </Link>
      </Container>
    </>
  );
}
