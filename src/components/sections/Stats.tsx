"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { staggerItem } from "@/lib/motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
  decimals?: number;
}

const STATS: Stat[] = [
  {
    value: 41,
    suffix: "+",
    label: "Ani de la fondarea BNI (1985)",
    description: "BNI a fost fondat de Dr. Ivan Misner și este cea mai mare organizație de networking business din lume.",
  },
  {
    value: 355,
    suffix: "K+",
    label: "Membri BNI la nivel global",
    description: "Cifră publicată oficial de BNI Global — organizația internațională din care face parte și grupul BNI Prime.",
  },
  {
    value: 11600,
    suffix: "+",
    label: "Grupuri BNI în lume",
    description: "Grupuri locale de networking business, active pe toate continentele — printre care și grupul BNI Prime din Bistrița.",
  },
  {
    value: 26.9,
    decimals: 1,
    suffix: " Mld $",
    label: "Afaceri generate de membrii BNI",
    description: "Valoarea afacerilor generate prin recomandări între membrii BNI, raportată oficial de organizație.",
  },
];

export function Stats() {
  return (
    <section id="stats" className="border-y border-border bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="BNI la nivel global"
          title="BNI Prime face parte dintr-o rețea globală"
          description="BNI Prime este grupul local din Bistrița al organizației internaționale BNI. La nivel global, rețeaua BNI înregistrează:"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...staggerItem(i)}
              className="rounded-2xl border border-border bg-background p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:text-left"
            >
              <div className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <h3 className="mt-3 text-base font-semibold text-foreground">
                {stat.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
