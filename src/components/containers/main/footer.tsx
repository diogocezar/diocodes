"use client";
import React from "react";
import Link from "next/link";
import { GithubLogo, AddressBook } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Footer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return (
    <>
      <footer className="bg-purple-contrast mt-10 w-full shadow-2xl absolute z-0">
        <div className="flex flex-col items-center justify-between gap-6 p-5 pt-10 lg:flex-row lg:gap-0 lg:p-12 lg:pt-14">
          <div className="text-foreground font-poppins flex flex-col lg:flex-row items-center justify-center gap-3 text-center text-sm md:items-start">
            <Link href="https://github.com/diogocezar/diocodes" target="_blank">
              <Button className="bg-foreground text-background-dark hover:bg-pink-primary hover:text-foreground rounded-lg mb-0 mt-6 flex w-full flex-row items-center justify-center h-[60px] gap-2 sm:w-[250px] md:w-[250px] md:mb-8 md:mt-10 md:justify-center">
                <GithubLogo size={20} />
                VEJA O CÓDIGO
              </Button>
            </Link>
            <Link href="https://diocodes.dev/me" target="_blank">
              <Button className="bg-foreground text-background-dark hover:bg-pink-primary hover:text-foreground rounded-lg mb-0 mt-6 flex w-full flex-row items-center justify-center h-[60px] gap-2 sm:w-[250px] md:w-[250px] md:mb-8 md:mt-10 md:justify-center">
                <AddressBook size={20} />
                ENTRE EM CONTATO
              </Button>
            </Link>
          </div>
          <div>
            <Image
              width={320}
              height={132}
              alt="Logotipo DioGO!"
              src="assets/images/logo/logo.svg"
            />
          </div>
        </div>
      </footer>
    </>
  );
});

Footer.displayName = "Footer";

export { Footer };
