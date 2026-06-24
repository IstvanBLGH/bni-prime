import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Eveniment de Networking Business — Grupul BNI Prime | 9 Iulie 2026",
    template: "%s | BNI Prime",
  },
  description:
    "Eveniment de networking business organizat de grupul BNI Prime din Bistrița. Networking profesional, echipa de conducere a grupului și oportunități de business pentru antreprenori. 9 iulie 2026. Înscrie-te acum.",
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
      "Eveniment de networking business organizat de grupul BNI Prime din Bistrița. 9 iulie 2026.",
    siteName: "BNI Prime",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eveniment de networking business organizat de grupul BNI Prime",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eveniment de Networking Business — BNI Prime",
    description: "Eveniment de networking business organizat de grupul BNI Prime din Bistrița",
    images: ["/og-image.jpg"],
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

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Eveniment de Networking Business — Grupul BNI Prime",
  startDate: "2026-07-09T09:00:00+03:00",
  endDate: "2026-07-09T18:00:00+03:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Hotel Codrișor",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Codrișor, nr. 28",
      addressLocality: "Bistrița",
      addressCountry: "RO",
    },
  },
  image: ["https://bniprime.ro/og-image.jpg"],
  description:
    "Eveniment de networking business organizat de grupul BNI Prime: networking, echipa de conducere a grupului și oportunități pentru antreprenori.",
  offers: [
    {
      "@type": "Offer",
      name: "Standard",
      price: "250",
      priceCurrency: "RON",
      availability: "https://schema.org/InStock",
      url: "https://bniprime.ro#tickets",
    },
    {
      "@type": "Offer",
      name: "Plus",
      price: "400",
      priceCurrency: "RON",
      availability: "https://schema.org/InStock",
      url: "https://bniprime.ro#tickets",
    },
    {
      "@type": "Offer",
      name: "Sponsor",
      price: "2000",
      priceCurrency: "RON",
      availability: "https://schema.org/InStock",
      url: "https://bniprime.ro#tickets",
    },
  ],
  organizer: {
    "@type": "Organization",
    name: "BNI Prime",
    url: "https://bniprime.ro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={inter.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
