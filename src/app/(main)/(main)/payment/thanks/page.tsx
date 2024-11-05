"use client";
import { Container } from "@/components/app/main/container";
import { SubSubTitle } from "@/components/app/main/titles";
import { Header } from "@/components/containers/main/header";
import { Button } from "@/components/ui/button";
import { MeImage } from "@/components/app/main/image";
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
      <Container>
        <MeImage />
        <Header
          headerTitle="Obrigado pelo pagamento!"
          headerSubTitle="Agora você tem acesso a todos os benefícios da mentoria Pro!"
        />
        <SubSubTitle>Clique no botão abaixo para agendar!</SubSubTitle>
        <Button
          data-cal-namespace=""
          data-cal-link="diogocezar/mentoria-diogao-pro"
          data-cal-config='{"layout":"month_view"}'
          className="bg-pink-primary text-foreground hover:bg-background hover:text-foreground rounded-lg mb-0 mt-6 flex w-full flex-row items-center justify-center h-[60px] gap-2 lg:w-[350px] lg:mb-8 lg:mt-10 lg:justify-center"
        >
          MENTORIA PRO{" "}
        </Button>
      </Container>
    </>
  );
}
