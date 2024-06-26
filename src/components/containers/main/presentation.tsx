import React from "react";
import { Paragraph } from "@/components/app/main/paragraph";
import { Hightlight } from "@/components/app/main/hightlight";
import { getXpYear } from "@/lib/utils";
import { Box } from "@/components/app/main/box";

const Presentation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  const xpYears = getXpYear();
  return (
    <Box>
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
    </Box>
  );
});

Presentation.displayName = "Presentation";

export { Presentation };
