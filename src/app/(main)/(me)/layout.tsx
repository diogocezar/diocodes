import type { Metadata } from "next";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Viewport } from "next";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import authOptions from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import CustomSessionProvider from "@/context/session-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Os Links Pessoais do Diogão | Conecte-se nas Redes | diocodes.dev/me",
  description:
    "Explore os links pessoais do Diogão! Encontre-me no TikTok, Instagram, LinkedIn, GitHub, Portfólio Pessoal e Site de Mentorias.",
  keywords: [
    "links pessoais",
    "conecte-se com Diogão",
    "Diogão no TikTok",
    "Diogão no Instagram",
    "Diogão no LinkedIn",
    "Diogão no GitHub",
    "portfólio pessoal de Diogão",
    "site de mentorias de Diogão",
    "rede social de Diogão",
    "mentoria em tecnologia",
    "recursos de tecnologia",
  ],
  authors: [
    {
      name: "Diogo Cezar",
      url: "https://diogocezar.dev",
    },
  ],
  creator: "Diogo Cezar",
  manifest: "/manifest.json",
  metadataBase: new URL("https://diocodes.dev/me"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://diocodes.dev/me",
    siteName:
      "Os Links Pessoais do Diogão | Conecte-se nas Redes | diocodes.dev/me",
    title:
      "Os Links Pessoais do Diogão | Conecte-se nas Redes | diocodes.dev/me",
    description:
      "Explore os links pessoais do Diogão! Encontre-me no TikTok, Instagram, LinkedIn, GitHub, Portfólio Pessoal e Site de Mentorias.",
    images: [
      {
        url: "https://diocodes.dev/assets/images/og/og.png",
        width: 1200,
        height: 630,
        alt: "Links Pessoais do Diogão",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/slx4mdu.css" />
        <link
          rel="icon"
          type="image/png"
          href="assets/images/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="assets/images/favicon/favicon.svg"
        />
        <link rel="shortcut icon" href="assets/images/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="assets/images/favicon/apple-touch-icon.png"
        />
      </head>
      <body className={cn("bg-dots-me antialiased font-obviously")}>
        <CustomSessionProvider session={session}>
          {children}
          <SpeedInsights />
          <Analytics />
          <GoogleAnalytics gaId="G-XRK77CENDK" />
        </CustomSessionProvider>
      </body>
    </html>
  );
}
