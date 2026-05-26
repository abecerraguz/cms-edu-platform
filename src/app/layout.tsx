import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://react-ts.abecerraguz.com";
const SITE_NAME = "React + TypeScript";
const SITE_DESCRIPTION =
  "Programa formativo React + TypeScript — 9 semanas desde fundamentos hasta testing y arquitectura de aplicaciones modernas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "React + TypeScript · Programa de Formación",
    template: "%s · React + TypeScript",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "react",
    "typescript",
    "vite",
    "hooks",
    "context api",
    "react router",
    "tanstack query",
    "testing",
    "programación",
    "desarrollo frontend",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": 150,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE_NAME,
    title: "React + TypeScript · Programa de Formación",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "React + TypeScript · Programa de Formación",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-background text-foreground">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
