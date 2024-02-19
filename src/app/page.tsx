"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#50FA7B" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <main className="bg-background min-h-screen flex-col items-center justify-between p-5 md:p-24 lg:p-36">
      <div className="mb-12 h-[250px] w-[250px] overflow-hidden rounded-full">
        <Image
          src="/perfil.jpeg"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <h1 className="text-pink mb-12 text-6xl font-bold">Mentoria Diogão</h1>
      <h2 className="text-green mb-4 text-4xl font-bold">
        Chegou a hora de devolver!
      </h2>
      <h3 className="text-foreground mb-12 mt-2 text-xl">
        Olá, sou o Diogo Cezar, mas o pessoal me chama de{" "}
        <span className="text-purple">Diogão</span>.
      </h3>
      <p className="text-foreground mb-4">
        Tenho <span className="text-purple">38 anos</span>, e estou na área de
        desenvolvimento a mais de <span className="text-purple">17 anos</span>.
      </p>
      <p className="text-foreground mb-4">
        Durante esse tempo, tive a oportunidade de trabalhar em diversas
        empresas, e com isso, adquiri alguma experiência. Caso queira saber mais
        sobre mim, acesse o meu site pessoal:{" "}
        <a
          href="https://diogocezar.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple underline"
        >
          https://diogocezar.dev
        </a>
      </p>
      <p className="text-foreground mb-4">
        E agora, chegou a hora de <span className="text-purple">devolver</span>{" "}
        um pouco do que aprendi.
      </p>
      <p className="text-foreground mb-4">
        Estou disponibilizando parte do meu tempo para ajudar pessoas que
        desejam se aprimorar na área de tecnologia.
      </p>
      <h2 className="text-green mb-4 mt-12 text-4xl font-bold">
        Como funciona?
      </h2>
      <p className="text-foreground mb-4">
        Marque um papo comigo usando o calendário abaixo!
      </p>
      <p className="text-foreground mb-4">
        Não se esqueça de preencher o campo{" "}
        <span className="text-purple">Como posso te ajudar?</span>
      </p>
      <p className="text-foreground mb-12">
        Me conte de forma resumida, quais são as suas dificuldades, o que
        gostaria de aprender, ou qualquer outra coisa que achar relevante!
      </p>
      <Cal
        calLink="diogocezar/mentoria-diocodes"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </main>
  );
}
