"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { getXpYear } from "@/lib/utils";
import { SubSubTitle, SubTitle, Title } from "@/components/Titles";
import { Paragraph } from "@/components/Paragraphs";
import { Container } from "@/components/Container";
import { Hightlight } from "@/components/Hightlight";
import { Button } from "@/components/Button";
import { HeaderImage } from "@/components/Image";

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
      <HeaderImage src="/perfil.jpeg" alt="Diogão Profile Picture" />
      <Title>
        Mentorias com o <span className="text-green">&lt;/Diogão&gt;</span>
      </Title>
      <SubTitle>
        Olá, sou o <span className="underline">Diogo Cezar</span>, mas pode me
        chamar de <Hightlight>Diogão</Hightlight>.
      </SubTitle>
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
      <SubSubTitle>Por que estou fazendo isso?</SubSubTitle>
      <Paragraph>
        Já a algum tempo, sinto que posso <Hightlight>compartilhar</Hightlight>{" "}
        um pouco do que aprendi.
      </Paragraph>
      <Paragraph>
        Estou disponibilizando parte do meu tempo para ajudar pessoas{" "}
        <Hightlight>(que realmente precisam)</Hightlight> a se aprimorarem na
        área de tecnologia.
      </Paragraph>
      <SubSubTitle>Para quem é a mentoria?</SubSubTitle>
      <Paragraph>
        Não importa qual é o seu nível de conhecimento. Se você está começando,
        ou se já tem alguma experiência, eu posso te ajudar!
      </Paragraph>
      <SubSubTitle>Qual é a pegadinha?</SubSubTitle>
      <SubTitle>
        É agora o momento que eu vendo um curso de como ser dev em 3 semanas?
      </SubTitle>
      <Paragraph>
        <Hightlight>NÃO!</Hightlight> Não tem pegadinha! Não tem venda de curso!
        Não preciso dos seus dados, não tem ebook!
      </Paragraph>
      <Paragraph>
        Estou disponibilizando 1 hora por semana (2 papos de 30 minutos), para
        realizar essas mentorias de forma totalmente{" "}
        <Hightlight>GRATUITA!</Hightlight>
      </Paragraph>
      <SubSubTitle>Tá! Curti! Como eu faço?</SubSubTitle>
      <Paragraph>Marque um papo comigo clicando no botão a seguir.</Paragraph>
      <Paragraph>
        Não se esqueça de preencher o campo{" "}
        <Hightlight>como posso te ajudar?</Hightlight>
      </Paragraph>
      <Paragraph>
        Me conte de forma resumida, quais são as suas dificuldades, o que
        gostaria de aprender, ou qualquer outra coisa que achar relevante!
      </Paragraph>
      <Paragraph>
        É importante que você aguarde a <Hightlight>CONFIRMAÇÃO</Hightlight> do
        agendamento! Caso eu não consiga confirmar, tente agendar em um outro
        horário!
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
