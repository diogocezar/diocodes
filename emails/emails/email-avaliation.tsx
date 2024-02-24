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
  date: string;
  time: string;
  firstName: string;
}

export const EmailAvaliation = ({
  firstName,
  date,
  time,
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
    <Preview>Avalie a sua mentoria!</Preview>
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
              Olá <span className="text-[#ff79c6]">{firstName}</span>, tudo
              certo? Espero que sim! 😊
            </Text>
            <Text className="text-base leading-8 text-[#020817]">
              Este e-mail é para pedir uma avaliação sobre a mentoria que
              tivemos no dia{" "}
              <span className="font-bold text-[#ff79c6]">{date}</span> às{" "}
              <span className="font-bold text-[#ff79c6]">{time}</span>.
            </Text>
            <Button
              href="https://diocodes.dev"
              className="mb-6 mt-4 rounded-full bg-[#50fa7b] px-6 py-4 text-[#282a36]"
            >
              Avaliar a Mentoria
            </Button>
            <Text className="text-base leading-8 text-[#020817]">
              Sua avaliação é muito importante para mim, e vai me ajudar a
              melhorar cada vez mais! 🚀
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
  firstName: "diogo",
  date: "31/02/2002",
  time: "12:00",
} as EmailAvaliationProps;

export default EmailAvaliation;
