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
    default: "Prime Summer — Eveniment de Business Networking | BNI Prime Bistrița | 29 Iulie 2026",
    template: "%s | BNI Prime",
  },
  description:
    "Prime Summer este evenimentul de business networking organizat de grupul BNI Prime din Bistrița. Networking structurat, membri BNI și oportunități de business pentru antreprenori din județul Bistrița-Năsăud. 29 iulie 2026. Înscrie-te acum.",
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
      "Eveniment de networking business organizat de grupul BNI Prime din Bistrița. 29 iulie 2026.",
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

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Prime Summer — Eveniment de Business Networking | BNI Prime",
  startDate: "2026-07-29T17:00:00+03:00",
  endDate: "2026-07-29T21:00:00+03:00",
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
    "Prime Summer este un eveniment de business networking organizat de grupul BNI Prime pentru mediul de afaceri din județul Bistrița-Năsăud și din regiune. 29 iulie 2026, Hotel Codrișor, Bistrița.",
  offers: [
    {
      "@type": "Offer",
      name: "Standard",
      price: "175",
      priceCurrency: "RON",
      availability: "https://schema.org/InStock",
      url: "https://bniprime.ro#tickets",
    },
    {
      "@type": "Offer",
      name: "Plus",
      price: "500",
      priceCurrency: "RON",
      availability: "https://schema.org/LimitedAvailability",
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
    <html lang="ro" className={openSans.variable}>
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
