"use client";

import { MapPin, Car, ExternalLink } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { LocationContent } from "@/types/db";

const FALLBACK: Partial<LocationContent> = {
  venue_name: "The Office",
  address: "B-dul 21 Decembrie 1989, nr. 77, mun. Cluj-Napoca",
  description:
    "Evenimentul organizat de grupul BNI Forte are loc la The Office din Cluj-Napoca, locația unde se desfășoară și întâlnirile săptămânale ale grupului.",
  has_parking: true,
  maps_link:
    "https://maps.google.com/?q=The+Office+Cluj-Napoca+Bulevardul+21+Decembrie+1989+77",
};

export function ForteLocation({ data }: { data?: Partial<LocationContent> | null }) {
  const d = { ...FALLBACK, ...data };

  return (
    <section id="location" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Locația"
          title={d.venue_name ?? "Locația evenimentului"}
          description={d.address ?? ""}
        />

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:items-start">
          <div className="flex flex-col gap-5">
            {d.description && (
              <p className="text-base leading-relaxed text-muted">{d.description}</p>
            )}

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-foreground">{d.venue_name}</p>
                  <p className="text-sm text-muted">{d.address}</p>
                </div>
              </div>

              {d.has_parking && (
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-sm text-foreground">Parcare la fața locului (contra-cost)</p>
                </div>
              )}
            </div>

            {d.maps_link && (
              <a
                href={d.maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Deschide în Google Maps
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Map embed or placeholder */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            {d.maps_embed_url ? (
              <iframe
                src={d.maps_embed_url}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Harta locației"
                className="block"
              />
            ) : (
              <a
                href={d.maps_link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-72 flex-col items-center justify-center gap-4 text-muted transition-colors hover:text-primary"
              >
                <MapPin className="h-12 w-12" aria-hidden="true" />
                <div className="text-center">
                  <p className="font-semibold text-foreground">{d.venue_name}</p>
                  <p className="mt-1 text-sm">{d.address}</p>
                  <p className="mt-3 text-sm font-medium text-primary">
                    Deschide harta →
                  </p>
                </div>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
