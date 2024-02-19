import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Viewport } from "next";
import { cn } from "@/lib/utils";

const fira = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Mentorias com o Diogão",
  description:
    "Mentorias com o Diogão é um projeto de mentoria para desenvolvedores que desejam evoluir suas habilidades e carreira.",
  keywords: [
    "mentoria",
    "techlead",
    "dicas",
    "tecnologia",
    "programação",
    "desenvolvimento",
  ],
  authors: [
    {
      name: "Diogo Cezar",
      url: "https://diogocezar.dev",
    },
  ],
  creator: "Diogo Cezar",
  manifest: "/manifest.json",
  metadataBase: new URL("https://diocodes.dev"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://diocodes.dev",
    siteName: "Mentorias com o Diogão",
    title: "Mentorias com o Diogão",
    description:
      "Mentorias com o Diogão é um projeto de mentoria para desenvolvedores que desejam evoluir suas habilidades e carreira.",
    images: [
      {
        url: "https://diocodes.dev/diocodes.png",
        width: 280,
        height: 280,
        alt: "Mentorias com o Diogão",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn("bg-background min-h-screen antialiased", fira.className)}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-XRK77CENDK" />
    </html>
  );
}
