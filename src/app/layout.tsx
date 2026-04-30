import type { Metadata } from "next";
import { Caveat, Space_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-hero",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Playground — YARZ",
  description:
    "I make things on the internet. Sometimes they work, sometimes they're art. Mostly both.",
  keywords: [
    "digital playground",
    "creative developer",
    "fullstack",
    "web experiments",
    "YARZ",
  ],
  authors: [{ name: "YARZ" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Digital Playground — YARZ",
    description:
      "I make things on the internet. Sometimes they work, sometimes they're art. Mostly both.",
    siteName: "Digital Playground",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Playground — YARZ",
    description:
      "I make things on the internet. Sometimes they work, sometimes they're art. Mostly both.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${spaceMono.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
