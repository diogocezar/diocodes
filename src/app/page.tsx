"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { getXpYear } from "@/lib/utils";
import { SubSubTitle, SubTitle, Title } from "@/components/Titles";
import { Paragraph } from "@/components/Paragraphs";
import { Container } from "@/components/Container";
import { Hightlight } from "@/components/Hightlight";
import { Button, ButtonFooter, ButtonLink } from "@/components/Button";
import { HeaderImage } from "@/components/Image";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Diocodes from "@/assets/diocodes";
import { Heart, Calendar, FileCode, Spinner } from "@phosphor-icons/react";

type TypeBooking = {
  attendees: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
};

export default function Home() {
  const xpYears = getXpYear();
  const [bookings, setBookints] = useState(Array<TypeBooking>);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const request = await fetch("/api/bookings");
      const bookings = await request.json();
      setBookints(bookings);
      setIsLoading(false);
    })();
  }, []);
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
      <main>
        <Container>
          <HeaderImage>
            <Diocodes />
          </HeaderImage>
          <Title>
            Mentorias com o <span className="text-green">&lt;/Diogão&gt;</span>
          </Title>
          <SubTitle>
            Olá, sou o <span className="underline">Diogo Cezar</span>, mas pode
            me chamar de <Hightlight>Diogão</Hightlight>.
          </SubTitle>
          <Paragraph>
            Estou na área de tecnologia a mais de{" "}
            <Hightlight>{xpYears} anos</Hightlight>.
          </Paragraph>
          <Paragraph>
            Eu já fui de tudo um pouco:{" "}
            <span className="underline">professor</span>,{" "}
            <span className="underline">palestrante</span>,{" "}
            <span className="underline">desenvolvedor</span>,{" "}
            <span className="underline">líder de tecnologia.</span>
          </Paragraph>
          <Paragraph>
            Caso queira conhecer um pouco mais sobre a minha história, por favor
            acesse o meu site:{" "}
            <a
              href="https://diogocezar.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple underline"
            >
              https://diogocezar.dev
            </a>
          </Paragraph>
          <Button
            data-cal-namespace=""
            data-cal-link="diogocezar/mentoria-diogao"
            data-cal-config='{"layout":"month_view"}'
            className="mt-10 flex flex-row items-center justify-start gap-2 md:mt-14 md:justify-center"
          >
            <Calendar size={20} />
            Agendar Mentoria
          </Button>
          <SubSubTitle>Quem já agendou?</SubSubTitle>
          {isLoading ? (
            <Paragraph className="flex flex-row gap-2">
              <Spinner size={20} className="animate-spin" />
              Carregando...
            </Paragraph>
          ) : (
            <ul className="flex w-full flex-row flex-wrap">
              {bookings.map((booking: TypeBooking, index) => (
                <li
                  key={index}
                  className={`w-full md:w-[50%] ${booking.isActive ? "opacity-100" : "opacity-20"}`}
                >
                  <div className="bg-comment m-2 gap-2 rounded-3xl p-6">
                    <div className="text-background mb-2 text-sm font-bold">
                      <Calendar size={32} className="mb-3" />{" "}
                      {booking.attendees.toUpperCase()}
                    </div>
                    <div className="text-xs">
                      {new Date(booking.startTime).toLocaleString("pt-BR")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <SubSubTitle>Por que estou fazendo isso?</SubSubTitle>
          <Paragraph>
            Já a algum tempo, sinto que posso{" "}
            <Hightlight>compartilhar</Hightlight> um pouco do que aprendi.
          </Paragraph>
          <Paragraph>
            Estou disponibilizando parte do meu tempo para ajudar pessoas{" "}
            <Hightlight>(que realmente precisam)</Hightlight> a se aprimorarem
            na área de tecnologia.
          </Paragraph>
          <SubSubTitle>Para quem é a mentoria?</SubSubTitle>
          <Paragraph>
            Não importa qual é o seu nível de conhecimento. Se você está
            começando, ou se já tem alguma experiência, eu posso te ajudar!
          </Paragraph>
          <SubSubTitle>Qual é a pegadinha?</SubSubTitle>
          <SubTitle>
            É agora o momento que eu vendo um curso de como ser dev em 3
            semanas?
          </SubTitle>
          <Paragraph>
            <Hightlight>Não!</Hightlight> Não tem pegadinha! Não tem venda de
            curso! Não preciso dos seus dados, não tem e-book!
          </Paragraph>
          <Paragraph>
            Estou disponibilizando 1 hora por semana (2 papos de 30 minutos),
            para realizar essas mentorias de forma totalmente{" "}
            <Hightlight>gratuita!</Hightlight>
          </Paragraph>
          <SubSubTitle>Tá! Curti! Como eu faço?</SubSubTitle>
          <Paragraph>
            Marque um papo comigo clicando no{" "}
            <ButtonLink
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Hightlight className="underline">Agendar Mentoria</Hightlight>
            </ButtonLink>
            .
          </Paragraph>
          <Paragraph>
            Não se esqueça de preencher o campo{" "}
            <Hightlight>como posso te ajudar?</Hightlight>
          </Paragraph>
          <Paragraph>
            Me conte de forma resumida, quais são as suas dificuldades, o que
            gostaria de aprender, ou qualquer outra coisa que achar relevante!
          </Paragraph>
          <Paragraph>
            É importante que você aguarde a <Hightlight>confirmação</Hightlight>{" "}
            do agendamento! Caso eu não consiga confirmar, tente agendar em um
            outro horário!
          </Paragraph>
        </Container>
      </main>
      <Footer>
        <div>
          <Link href="https://github.com/diogocezar/diocodes" target="_blank">
            <ButtonFooter className="flex flex-row justify-center gap-2">
              <FileCode size={20} />
              Acessar código fonte!
            </ButtonFooter>
          </Link>
        </div>
        <div>
          <p className="text-background m-0 flex flex-row items-center justify-center gap-2 font-semibold">
            Feito com{" "}
            <Heart
              weight="fill"
              className="text-pink animate-pulse"
              size={20}
            />
            ️por
            <a
              href="https://diogocezar.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Diogo Cezar
            </a>
          </p>
        </div>
      </Footer>
    </>
  );
}
