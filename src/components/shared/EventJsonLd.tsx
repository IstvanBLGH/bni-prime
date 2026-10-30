import { toIsoDateTime, type EventSchedule } from "@/lib/event-date";

// schema.org Event markup, built from the date/time set in admin.
export function EventJsonLd({
  name,
  description,
  schedule,
  city,
  venue,
  address,
  url,
  organizer,
  price,
}: {
  name: string;
  description?: string;
  schedule: EventSchedule;
  city: string;
  venue?: string | null;
  address?: string | null;
  url: string;
  organizer: string;
  price?: number;
}) {
  const startDate = toIsoDateTime(schedule);
  if (!startDate) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: venue || city,
      address: {
        "@type": "PostalAddress",
        streetAddress: address || undefined,
        addressLocality: city,
        addressCountry: "RO",
      },
    },
    ...(price
      ? { offers: { "@type": "Offer", price: String(price), priceCurrency: "RON", availability: "https://schema.org/InStock", url: `${url}#tickets` } }
      : {}),
    organizer: { "@type": "Organization", name: organizer, url },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
