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
      <Container className="h-[calc(100vh-200px)]">
        <Header
          headerTitle="Obrigado pelo pagamento!"
          headerSubTitle="Agora você tem acesso a todos os benefícios da mentoria Pro!"
        />
        <SubSubTitle>Clique no botão abaixo para agendar!</SubSubTitle>
        <Button
          data-cal-namespace=""
          data-cal-link="diogocezar/mentoria-diogao-pro"
          data-cal-config='{"layout":"month_view"}'
          className="mb-2 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-green hover:bg-card hover:text-green sm:w-[300px] md:mb-8 md:mt-10 md:justify-center"
        >
          <Star size={20} />
          Agendar Mentoria Pro
        </Button>
        <Link href="/">
          <Button type="button" className="mt-20">
            Página Principal
          </Button>
        </Link>
      </Container>
    </>
  );
}
