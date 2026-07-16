"use client";

import { motion } from "framer-motion";
import { MapPin, Car, TrainFront, Clock } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/motion";

const VENUE_NAME = "Hotel Codrișor";
const VENUE_ADDRESS = "Str. Codrișor, nr. 28, Bistrița";

const INFO = [
  {
    icon: Car,
    title: "Parcare la fața locului",
    description: "Parcare privată disponibilă pentru toți participanții la evenimentul organizat de BNI Prime.",
  },
  {
    icon: TrainFront,
    title: "Acces transport public",
    description: "Stație de transport în comun la 5 minute de mers pe jos de la locație.",
  },
  {
    icon: Clock,
    title: "Întâlniri săptămânale, joia",
    description: "Grupul BNI Prime se reunește în fiecare joi, de la ora 17:00, la aceeași locație.",
  },
];

export function Location() {
  return (
    <section id="location" className="py-16 md:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <motion.div {...fadeInUp}>
            <span className="mb-3 inline-block text-3xl font-semibold uppercase tracking-tight text-primary md:text-4xl lg:text-5xl">
              Locație
            </span>
            <p className="mt-4 flex items-center gap-2 text-base font-medium text-foreground md:text-lg">
              <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              {VENUE_NAME}, {VENUE_ADDRESS}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Evenimentul organizat de grupul BNI Prime are loc la {VENUE_NAME} din Bistrița,
              locația unde se reunește săptămânal și grupul BNI Prime, ușor accesibilă atât cu
              maşina personală, cât și cu transportul public.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button asChild size="lg" variant="outline" className="mt-8">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${VENUE_NAME}, ${VENUE_ADDRESS}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Vezi traseul pe Google Maps
              </a>
            </Button>
          </motion.div>

          <motion.div {...fadeInUp}>
            <ImagePlaceholder
              width={800}
              height={600}
              label="Hartă Google Maps — locația BNI Prime"
              className="w-full shadow-lg"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
