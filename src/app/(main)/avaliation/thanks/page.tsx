"use client";
import { Container } from "@/components/app/main/container";
import { SubSubTitle } from "@/components/app/main/titles";
import { Header } from "@/components/containers/main/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainPage() {
  return (
    <>
      <Container className="h-[calc(100vh-200px)]">
        <Header
          headerTitle="Obrigado por avaliar!"
          headerSubTitle="Sua avaliação é muito importante!"
        />
        <SubSubTitle>Se cuide e até mais!</SubSubTitle>
        <Link href="/">
          <Button type="button" className="mt-20">
            Página Principal
          </Button>
        </Link>
      </Container>
    </>
  );
}
