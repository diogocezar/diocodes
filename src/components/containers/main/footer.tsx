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
      <footer className="bg-purple mt-10 w-full shadow-2xl">
        <div className="flex flex-col items-center justify-between gap-6 p-5 pt-10 md:flex-row md:gap-0 md:p-16 md:pt-12 lg:p-12 lg:pt-14">
          <div className="text-background flex flex-col items-center justify-center gap-2 text-center text-sm md:items-start">
            Código fonte disponível em
            <Link href="https://github.com/diogocezar/diocodes" target="_blank">
              <Button
                variant={"destructive"}
                className="flex flex-row justify-center gap-2 px-5 py-3 text-base"
              >
                <GithubLogo size={20} />
                GitHub
              </Button>
            </Link>
          </div>
          <div>
            <p className="text-background font-poppins m-0 flex flex-row items-center justify-center gap-2 font-semibold">
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
