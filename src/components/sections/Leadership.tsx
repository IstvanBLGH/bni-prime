"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { staggerItem } from "@/lib/motion";

const MEMBERS = [
  {
    name: "Alin Marius Corcode",
    role: "Președinte",
    company: "Alliance Imobil Solution SRL",
    website: "https://allianceimobil.ro",
  },
  {
    name: "Vasile Neagoș",
    role: "Secretar / Trezorier",
    company: "Cabinet de avocat Vasile Neagoș",
  },
  {
    name: "Marius Lazaroi",
    role: "Coordonator educațional",
    company: "FAST DESIGN 2 PRINT SRL",
  },
  {
    name: "Alexandru Antal",
    role: "Comitetul de Întâmpinare",
    company: "Panouri Cluj",
  },
  {
    name: "Monica Mariana Mutu",
    role: "Comitetul de Întâmpinare",
    company: "PFA Mutu Monica Mariana",
  },
  {
    name: "Lucica Ana Marta",
    role: "Comitetul de Membri",
    company: "EUROPX BEST SOLUTIONS SRL",
  },
  {
    name: "Mariana-Dacina Silvesan-Gherman",
    role: "Comitetul de Membri",
    company: "SIMAD 2016",
    website: "http://www.izolatiitermice.eu",
  },
];

export function Leadership() {
  return (
    <section id="membrii" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Membrii"
          title="Membrii grupului BNI Prime"
          description="Antreprenorii și profesioniștii din Bistrița care alcătuiesc grupul BNI Prime și organizează evenimentul Prime Summer."
        />

        <div className="mt-12 md:mt-16">
          {/* mobile: horizontal scroll */}
          <div className="flex gap-5 overflow-x-auto pb-4 md:hidden" style={{ scrollSnapType: "x mandatory" }}>
            {MEMBERS.map((member, i) => (
              <motion.div
                key={member.name}
                {...staggerItem(i)}
                className="w-56 shrink-0 overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
                style={{ scrollSnapAlign: "start" }}
              >
                <ImagePlaceholder
                  width={224}
                  height={280}
                  aspectRatio="4/5"
                  label={`Portret ${member.name}`}
                  className="w-full rounded-none border-x-0 border-t-0"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-foreground">{member.name}</h3>
                      <p className="mt-0.5 text-xs font-medium text-primary">{member.role}</p>
                    </div>
                    {member.website && (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Website ${member.company}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-muted transition-colors duration-300 hover:bg-primary hover:text-white"
                      >
                        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted">{member.company}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {MEMBERS.map((member, i) => (
              <motion.div
                key={member.name}
                {...staggerItem(i)}
                className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <ImagePlaceholder
                  width={400}
                  height={500}
                  aspectRatio="4/5"
                  label={`Portret ${member.name}`}
                  className="w-full rounded-none border-x-0 border-t-0"
                />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                    </div>
                    {member.website && (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Website ${member.company}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-muted transition-colors duration-300 hover:bg-primary hover:text-white"
                      >
                        <Globe className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{member.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
