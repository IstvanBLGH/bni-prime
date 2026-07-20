"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Car, TrainFront, Clock } from "lucide-react";

import { Container } from "@/components/shared/Container";
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
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${VENUE_NAME}, ${VENUE_ADDRESS}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl shadow-lg"
            >
              <Image
                src="/Hotel Codrisor.png"
                alt="Hotel Codrișor, Bistrița — locația evenimentului BNI Prime Summer"
                width={800}
                height={600}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <span className="flex items-center gap-2 rounded-full border border-white/70 bg-white/20 px-6 py-3 text-sm font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Vezi pe Google Maps
                </span>
              </div>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
