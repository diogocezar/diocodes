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
import { formatCurrency } from "@/lib/utils";

interface EmailPaymentSucceededProps {
  name: string;
  email: string;
  phone: string;
  amount: number;
}
export const EmailPaymentSucceeded = ({
  name,
  email,
  phone,
  amount,
}: EmailPaymentSucceededProps) => {
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
      <Preview>Houve um novo pagamento</Preview>
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
              Novo pagamento de mentoria
            </Heading>

            <Section className="mt-8">
              {name && (
                <Text className="text-base leading-8 text-[#020817]">
                  Houve um novo pagamento realizado por{" "}
                  <span className="font-bold text-[#ff79c6]">{name}</span>
                </Text>
              )}
              {email && (
                <Text className="text-base leading-8 text-[#020817]">
                  Email{" "}
                  <span className="font-bold text-[#ff79c6]">{email}</span>
                </Text>
              )}
              {phone && (
                <Text className="text-base leading-8 text-[#020817]">
                  Telefone{" "}
                  <span className="font-bold text-[#ff79c6]">{phone}</span>
                </Text>
              )}
              <Text className="text-base leading-8 text-[#020817]">
                O valor pago foi de{" "}
                <span className="font-bold text-[#ff79c6]">
                  {formatCurrency(amount)}
                </span>
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

EmailPaymentSucceeded.PreviewProps = {
  name: "Diogo Cezar",
  email: "diogo@diogocezar.com",
  phone: "43 933000663",
  amount: 120,
} as EmailPaymentSucceededProps;

export default EmailPaymentSucceeded;
