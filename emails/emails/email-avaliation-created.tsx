import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Text,
  Font,
  Hr,
  Preview,
} from "@react-email/components";
import * as React from "react";
import { Tailwind } from "@react-email/tailwind";

interface EmailAvaliationCreatedProps {
  attendee: string;
  rating: number;
  tags: string[];
  comment: string;
  startTime: Date;
}
export const EmailAvaliationCreated = ({
  attendee,
  rating,
  tags,
  comment,
  startTime,
}: EmailAvaliationCreatedProps) => {
  const normalizedValue = Math.min(Math.max(rating, 1), 5);
  const filledStars = Array.from(
    { length: normalizedValue },
    (_, index) => index + 1
  );
  const emptyStars = Array.from(
    { length: 5 - normalizedValue },
    (_, index) => index + 1 + normalizedValue
  );
  return (
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
      <Preview>Houve uma nova avaliação!</Preview>
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
              Nova avaliação de Mentoria com o{" "}
              <span className="font-bold text-[#50fa7b]">Diogão!</span>
            </Heading>

            <Section className="mt-8">
              <Text className="text-base leading-8 text-[#020817]">
                Houve uma nova avaliação realizada por{" "}
                <span className="font-bold text-[#ff79c6]">{attendee}</span>
              </Text>
              <Text className="text-base leading-8 text-[#020817]">
                A mentoria foi realizada em{" "}
                <span className="font-bold text-[#ff79c6]">
                  {`${new Date(startTime).toLocaleDateString(
                    "pt-BR"
                  )} - ${new Date(startTime).toLocaleTimeString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                  })}`}
                </span>
              </Text>
              <Text className="text-base leading-8 text-[#020817]">
                A nota da avaliação foi:{" "}
                <div className="flex flex-row">
                  {filledStars.map((_, index) => (
                    <div key={index} className="h-7 w-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                      >
                        <rect width="256" height="256" fill="none" />
                        <path
                          fill="#50fa7b"
                          d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"
                        />
                      </svg>
                    </div>
                  ))}
                  {emptyStars.map((_, index) => (
                    <div key={index} className="h-7 w-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                      >
                        <rect width="256" height="256" fill="none" />
                        <path
                          d="M135.34,28.9l23.23,55.36a8,8,0,0,0,6.67,4.88l59.46,5.14a8,8,0,0,1,4.54,14.07L184.13,147.7a8.08,8.08,0,0,0-2.54,7.89l13.52,58.54a8,8,0,0,1-11.89,8.69l-51.1-31a7.93,7.93,0,0,0-8.24,0l-51.1,31a8,8,0,0,1-11.89-8.69l13.52-58.54a8.08,8.08,0,0,0-2.54-7.89L26.76,108.35A8,8,0,0,1,31.3,94.28l59.46-5.14a8,8,0,0,0,6.67-4.88L120.66,28.9A8,8,0,0,1,135.34,28.9Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="16"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </Text>
              <Text className="text-base leading-8 text-[#020817]">
                As tags selecionadas foram:
                <div className="flex flex-row flex-wrap gap-2 text-[#50fa7b]">
                  {tags.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-[#282a36] px-4 py-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Text>
              <Text className="text-base leading-8 text-[#020817]">
                O comentário foi:{" "}
                <span className="font-bold text-[#ff79c6]">{comment}</span>
              </Text>
            </Section>
            <Hr />
            <Text className="text-sm text-[#020817]">
              Sistema de Mentorias do{" "}
              <span className="text-[#50fa7b]">Diogão</span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailAvaliationCreated.PreviewProps = {
  attendee: "Diogo Cezar",
  rating: 3,
  tags: [
    "Explicação Clara",
    "Explicação Clara",
    "Explicação Clara",
    "Explicação Clara",
    "Explicação Clara",
    "Explicação Clara",
    "Explicação Clara",
    "Explicação Clara",
    "Explicação Clara",
    "Explicação Clara",
  ],
  comment: "Testando um comentário.",
  startTime: new Date(),
} as EmailAvaliationCreatedProps;

export default EmailAvaliationCreated;
