import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface EmailAvaliationProps {
  firstName: string;
}

export const EmailAvaliation: React.FC<Readonly<EmailAvaliationProps>> = ({
  firstName,
}) => (
  <Html>
    <Head />
    <Preview>Join in {firstName} workspace.</Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container>
          <Img
            src="https://storage.googleapis.com/typper-bi/Blue%20combination%20mark.png"
            width="80"
            height="25"
            alt="Typper"
          />

          <Hr className="mt-8 border-[#E2E8F0]" />

          <Heading className="mb-0 mt-8 text-3xl font-bold text-[#020817]">
            Join {firstName}
          </Heading>

          <Section className="mt-8">
            <Text className="text-base leading-8 text-[#020817]">
              You have been invited to join the workspace {firstName} by{" "}
              {firstName}.
            </Text>
            <Text className="text-base leading-8 text-[#020817]">
              <Link href="#" className="text-[#2563EB] underline-offset-1">
                Join the workspace
              </Link>{" "}
              to collaborate with your colleagues even more efficiently.
            </Text>
            <Button
              href="#"
              className="mt-4 rounded-md bg-[#2563EB] px-4 py-2 text-center text-[#F8FAFC]"
            >
              Join workspace
            </Button>
            <Text className="mt-4 text-base leading-8 text-[#020817]">
              Best regards,
              <br /> Typper BI Team
            </Text>
          </Section>

          <Hr className="my-12 border-[#E2E8F0]" />

          <Text className="text-sm text-[#020817]">Needing help?</Text>
          <Text className="text-sm text-[#020817]">
            Contact us at:{" "}
            <Link
              href="mailto:help-bi@typper.io"
              className="text-[#2563EB] underline-offset-1"
            >
              help-bi@typper.io
            </Link>
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
