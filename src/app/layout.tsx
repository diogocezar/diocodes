import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "@/styles/globals.css";

const fira = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mentorias com o Diogão",
  description:
    "Mentorias com o Diogão é um projeto de mentoria para desenvolvedores que desejam evoluir suas habilidades e carreira.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={fira.className}>{children}</body>
    </html>
  );
}
