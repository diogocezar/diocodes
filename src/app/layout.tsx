import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const fira = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mentorias com o Diogão",
  icons: {
    icon: "/diocodes.png",
  },
  manifest: "/manifest.json",
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
      <GoogleAnalytics gaId="G-XRK77CENDK" />
    </html>
  );
}
