import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
  Font,
  Hr,
  Button,
  Preview,
} from "@react-email/components";
import * as React from "react";
import { Tailwind } from "@react-email/tailwind";

interface EmailAvaliationProps {
  attendee: string;
  startTime: Date;
  link: string;
}

export const EmailAvaliation = ({
  attendee,
  startTime,
  link,
}: EmailAvaliationProps) => (
  <Html>
    <Head>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Olá, tudo certo? Você poderia avaliar a nossa mentoria?</Preview>
    <Tailwind>
      <Body className="mt-12">
        <Container>
          <Img
            src="https://diocodes.dev/diocodes.png"
            width="80"
            height="80"
            alt="Diocodes"
          />

          <Heading className="mb-0 mt-8 text-3xl font-bold text-[#282a36]">
            Mentoria com o <span className="text-[#50fa7b]">Diogão!</span>
          </Heading>

          <Section className="mt-8">
            <Text className="text-base leading-8 text-[#020817]">
              Olá <span className="text-[#ff79c6]">{attendee}</span>, tudo
              certo? Espero que sim! 😊
            </Text>
            <Text className="text-base leading-8 text-[#020817]">
              Escrevo este e-mail te pedir uma ajudinha.
            </Text>
            <Text className="text-base leading-8 text-[#020817]">
              Tivemos uma mentoria em{" "}
              <span className="font-bold text-[#ff79c6]">
                {`${new Date(startTime).toLocaleDateString("pt-BR")} - ${new Date(startTime).toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })}`}
              </span>
            </Text>
            <Text className="text-base leading-8 text-[#020817]">
              Sua avaliação irá me ajudar a melhorar como mentor.{" "}
            </Text>
            <Text className="text-base leading-8 text-[#020817]">
              <span className="font-bold text-[#ff79c6]">
                Prometo que não vai demorar mais que 5 minutos! 👍
              </span>
            </Text>
            <Button
              href={link}
              className="mb-6 mt-4 rounded-full bg-[#ff79c6] px-6 py-4 text-[#f8f8f2]"
            >
              Avaliar a Mentoria
            </Button>
            <Text className="text-base leading-8 text-[#020817]">
              Muito obrigado pela ajuda! 🚀
            </Text>
          </Section>
          <Hr />
          <Text className="text-sm text-[#020817]">
            Se precisar, pode chamar em:{" "}
            <Link
              href="mailto:diogo@diogocezar.com"
              className="text-[#50fa7b] underline"
            >
              diogo@diogocezar.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

EmailAvaliation.PreviewProps = {
  attendee: "Diogo Cezar",
  startTime: new Date("2024-02-21T20:30:00.000Z"),
  link: "https://www.diocodes.dev/",
} as EmailAvaliationProps;

export default EmailAvaliation;
