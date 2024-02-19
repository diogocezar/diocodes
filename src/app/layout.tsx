import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const fira = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diogão - Mentoria para desenvolvedores",
  description:
    "Estou disponibilizando parte do meu tempo para ajudar pessoas que desejam se aprimorar na área de tecnologia.",
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
