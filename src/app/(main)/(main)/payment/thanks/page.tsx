"use client";
import { Container } from "@/components/app/main/container";
import { SubSubTitle } from "@/components/app/main/titles";
import { Header } from "@/components/containers/main/header";
import { Button } from "@/components/ui/button";
import { Star } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function MainPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: {
          branding: { brandColor: "#50FA7B" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <>
      <Container className="h-[calc(100vh-264px)] md:h-[calc(100vh-280px)] lg:h-[calc(100vh-204px)]">
        <Header
          headerTitle="Obrigado pelo pagamento!"
          headerSubTitle="Agora você tem acesso a todos os benefícios da mentoria Pro!"
        />
        <SubSubTitle>Clique no botão abaixo para agendar!</SubSubTitle>
        <Button
          data-cal-namespace=""
          data-cal-link="diogocezar/mentoria-diogao-pro"
          data-cal-config='{"layout":"month_view"}'
          className="me-button rounded-none mb-0 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-foreground hover:bg-green hover:text-background-dark md:w-[270px] md:mb-8 md:mt-10 md:justify-center"
        >
          <Star size={20} />
          Agendar Mentoria Pro
        </Button>
      </Container>
    </>
  );
}
