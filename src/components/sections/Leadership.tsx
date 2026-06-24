"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { staggerItem } from "@/lib/motion";

const LEADERSHIP = [
  {
    name: "Alin Marius Corcode",
    role: "Președinte",
    company: "Alliance Imobil Solution SRL",
    website: "https://allianceimobil.ro",
    description: "Coordonează activitatea grupului și reprezintă echipa de conducere a BNI Prime.",
  },
  {
    name: "Vasile Neagoș",
    role: "Secretar / Trezorier",
    company: "Cabinet de avocat Vasile Neagoș",
    description: "Gestionează administrarea grupului și evidența financiară a întâlnirilor BNI Prime.",
  },
  {
    name: "Marius Lazaroi",
    role: "Coordonator educațional",
    company: "FAST DESIGN 2 PRINT SRL",
    description: "Susține formarea continuă a membrilor în tehnici de networking și recomandare.",
  },
  {
    name: "Alexandru Antal",
    role: "Comitetul de Întâmpinare",
    company: "Panouri Cluj",
    description: "Primește vizitatorii și noii membri la întâlnirile săptămânale ale grupului.",
  },
  {
    name: "Monica Mariana Mutu",
    role: "Comitetul de Întâmpinare",
    company: "PFA Mutu Monica Marians",
    description: "Primește vizitatorii și noii membri la întâlnirile săptămânale ale grupului.",
  },
  {
    name: "Lucica Ana Marta",
    role: "Comitetul de Membri",
    company: "EUROPX BEST SOLUTIONS SRL",
    description: "Sprijină integrarea și dezvoltarea membrilor în cadrul grupului BNI Prime.",
  },
  {
    name: "Mariana-Dacina Silvesan-Gherman",
    role: "Comitetul de Membri",
    company: "SIMAD 2016",
    website: "http://www.izolatiitermice.eu",
    description: "Sprijină integrarea și dezvoltarea membrilor în cadrul grupului BNI Prime.",
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Echipa de conducere"
          title="Cine conduce grupul BNI Prime"
          description="Membrii din echipa de conducere a grupului BNI Prime din Bistrița, cei care organizează evenimentul și întâlnirile săptămânale."
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {LEADERSHIP.map((leader, i) => (
            <motion.div
              key={leader.name}
              {...staggerItem(i)}
              className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <ImagePlaceholder
                width={400}
                height={500}
                aspectRatio="4/5"
                label={`Portret ${leader.name}`}
                className="w-full rounded-none border-x-0 border-t-0"
              />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {leader.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">{leader.role}</p>
                  </div>
                  {leader.website && (
                    <a
                      href={leader.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Website ${leader.company}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-muted transition-colors duration-300 hover:bg-primary hover:text-white"
                    >
                      <Globe className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{leader.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{leader.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
