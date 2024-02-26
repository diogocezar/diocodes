import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Viewport } from "next";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
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
  title:
    "Desenvolva suas habilidades com Diogão | Mentorias Tech Gratuitas | diocodes.dev",
  description:
    "Descubra o mundo da tecnologia com Diogão! Mentorias gratuitas, recursos de aprendizado, carreira e orientação em programação.",
  keywords: [
    "mentorias gratuitas em tecnologia",
    "mentoria para profissionais de TI",
    "orientação tecnológica gratuita",
    "mentoria em programação gratuita",
    "mentor de desenvolvimento de software",
    "guia para programadores iniciantes",
    "mentor de design de interface",
    "mentor de carreira em tecnologia",
    "desenvolvimento profissional em TI",
    "estratégias de crescimento na carreira de TI",
    "comunidade de mentoria em tecnologia",
    "networking para profissionais de TI",
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
    siteName:
      "Desenvolva suas habilidades com Diogão | Mentorias Tech Gratuitas | diocodes.dev",
    title:
      "Desenvolva suas habilidades com Diogão | Mentorias Tech Gratuitas | diocodes.dev",
    description:
      "Descubra o mundo da tecnologia com Diogão! Mentorias gratuitas, recursos de aprendizado, carreira e orientação em programação.",
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
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
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
      <body
        className={cn(
          "bg-background-dark antialiased",
          GeistSans.className,
          GeistSans.variable,
        )}
      >
        <CustomSessionProvider session={session}>
          {children}
          <Toaster />
          <SpeedInsights />
          <Analytics />
          <GoogleAnalytics gaId="G-XRK77CENDK" />
        </CustomSessionProvider>
      </body>
    </html>
  );
}
