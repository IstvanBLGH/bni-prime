import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Ziua Invitatului — Eveniment de Business Networking | BNI Prime Bistrița",
    template: "%s | BNI Prime",
  },
  description:
    "Ziua Invitatului este evenimentul de business networking organizat de grupul BNI Prime din Bistrița. Networking structurat, membri BNI și oportunități de business pentru antreprenori din județul Bistrița-Năsăud. Înscrie-te acum.",
  keywords: [
    "BNI Prime",
    "networking business",
    "eveniment business",
    "BNI România",
    "networking profesional",
    "eveniment antreprenori Bistrița",
    "networking business Bistrița",
  ],
  authors: [{ name: "BNI Prime" }],
  metadataBase: new URL("https://bniprime.ro"),
  alternates: {
    canonical: "/",
    languages: { "ro-RO": "/" },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://bniprime.ro",
    title: "Eveniment de Networking Business — Grupul BNI Prime",
    description:
      "Eveniment de networking business organizat de grupul BNI Prime din Bistrița.",
    siteName: "BNI Prime",
    images: [
      {
        url: "/og-image.png",
        width: 2000,
        height: 2000,
        alt: "BNI Prime — Eveniment de networking business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eveniment de Networking Business — BNI Prime",
    description: "Eveniment de networking business organizat de grupul BNI Prime din Bistrița",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "[GOOGLE_SITE_VERIFICATION_PLACEHOLDER]",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={openSans.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
