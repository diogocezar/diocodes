"use client";
import React from "react";
import Link from "next/link";
import { Heart, GithubLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const Footer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <footer className="bg-background mt-10 w-full shadow-2xl aboslute z-0">
        <div className="flex flex-col items-center justify-between gap-6 p-5 pt-10 md:flex-row md:gap-0 md:p-16 md:pt-12 lg:p-12 lg:pt-14">
          <div className="text-foreground font-poppins flex flex-col items-center justify-center gap-2 text-center text-sm md:items-start font-poppi">
            Este site é um projeto open-source, disponível em:
            <Link href="https://github.com/diogocezar/diocodes" target="_blank">
              <Button className="me-button rounded-none mb-0 mt-0 flex w-full flex-row items-center justify-start gap-2 bg-foreground hover:bg-green hover:text-background-dark md:mb-0 md:mt-2 md:justify-start">
                <GithubLogo size={20} />
                Acessar o GitHub
              </Button>
            </Link>
          </div>
          <div>
            <p className="text-foreground font-poppins m-0 flex flex-row items-center justify-center gap-2 font-semibold">
              Feito com{" "}
              <Heart
                weight="fill"
                className="text-pink animate-pulse"
                size={20}
              />
              ️por
              <a
                href="https://diocodes.dev/me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green"
              >
                Diogo Cezar
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
});

Footer.displayName = "Footer";

export { Footer };
