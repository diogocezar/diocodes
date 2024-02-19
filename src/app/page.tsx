"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Image from "next/image";
import { getXpYear } from "@/lib/utils";
import { SubSubTitle, SubTitle, Title } from "@/components/Titles";
import { Paragraph } from "@/components/Paragraphs";
import { Container } from "@/components/Container";
import { Hightlight } from "@/components/Hightlight";
import { Button } from "@/components/Button";

export default function Home() {
  const xpYears = getXpYear();
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
    <Container>
      <div className="mb-12 h-[250px] w-[250px] overflow-hidden rounded-full">
        <Image
          src="/perfil.jpeg"
          width={500}
          height={500}
          alt="Diogão Profile Picture"
        />
      </div>
      <Title>
        Mentorias com o <span className="text-green">&lt;/Diogão&gt;</span>
      </Title>
      <SubSubTitle>
        Olá, sou o <span className="underline">Diogo Cezar</span>, mas pode me
        chamar de <Hightlight>Diogão</Hightlight>.
      </SubSubTitle>
      <Paragraph>
        Estou na área de tecnologia a mais de{" "}
        <Hightlight>{xpYears} anos</Hightlight>.
      </Paragraph>
      <Paragraph>
        Eu já fui de tudo um pouco: <span className="underline">professor</span>
        , <span className="underline">palestrante</span>,{" "}
        <span className="underline">desenvolvedor</span>,{" "}
        <span className="underline">líder de tecnologia.</span>
      </Paragraph>
      <Paragraph>
        Caso queira conhecer um pouco mais sobre a minha história, por favorm
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
      <SubTitle>Por que estou fazendo isso?</SubTitle>
      <Paragraph>
        Já a algum tempo, sinto que posso <Hightlight>compartilhar</Hightlight>{" "}
        um pouco do que aprendi.
      </Paragraph>
      <Paragraph>
        Estou disponibilizando parte do meu tempo para ajudar pessoas{" "}
        <Hightlight>(que realmente precisam)</Hightlight> a se aprimorar na área
        de tecnologia.
      </Paragraph>
      <SubTitle>Para quem é a mentoria?</SubTitle>
      <Paragraph>
        Não importa qual é o seu nível de conhecimento. Se você está começando,
        ou se já tem alguma experiência, eu posso te ajudar!
      </Paragraph>
      <SubTitle>Qual é a pegadinha?</SubTitle>
      <SubSubTitle>
        É agora o momento que eu vendo um curso de como ser dev em 3 semanas?
      </SubSubTitle>
      <Paragraph>
        <Hightlight>NÃO!</Hightlight> Não tem pegadinha! Não tem venda de curso!
        Não preciso dos seus dados, não tem ebook!
      </Paragraph>
      <Paragraph>
        Estou disponibilizando 1 hora por semana (2 papos de 30 minutos), para
        realizar essas mentorias de forma totalmente{" "}
        <Hightlight>GRATUITA!</Hightlight>
      </Paragraph>
      <SubTitle>Tá! Curti! Como eu faço?</SubTitle>
      <Paragraph>Marque um papo comigo clicando no botão a seguir.</Paragraph>
      <Paragraph>
        Não se esqueça de preencher o campo{" "}
        <Hightlight>Como posso te ajudar?</Hightlight>
      </Paragraph>
      <Paragraph>
        Me conte de forma resumida, quais são as suas dificuldades, o que
        gostaria de aprender, ou qualquer outra coisa que achar relevante!
      </Paragraph>
      <Button
        data-cal-namespace=""
        data-cal-link="diogocezar/mentoria-diogao"
        data-cal-config='{"layout":"month_view"}'
      >
        Agendar Mentoria
      </Button>
    </Container>
  );
}
