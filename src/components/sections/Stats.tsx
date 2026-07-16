"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/shared/Container";
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
    value: 76,
    suffix: "",
    label: "Țări în care activează BNI",
    description: "BNI este prezentă pe toate continentele, cu grupuri active în 76 de țări.",
  },
  {
    value: 11500,
    suffix: "+",
    label: "Grupuri BNI în lume",
    description: "Grupuri locale de networking business activ, printre care și grupul BNI Prime din Bistrița.",
  },
  {
    value: 350000,
    suffix: "+",
    label: "Membri BNI la nivel global",
    description: "Antreprenori și profesioniști care construiesc afaceri prin recomandări în rețeaua BNI.",
  },
  {
    value: 30,
    suffix: " mld $",
    label: "Cifră de afaceri generată",
    description: "Valoarea afacerilor generate prin recomandări între membrii BNI, raportată de organizație.",
  },
];

export function Stats() {
  return (
    <section id="stats" className="border-y border-border bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <motion.div {...staggerItem(0)} className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
            BNI la nivel global
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            BNI (Business Network International) este cea mai mare rețea de business networking
            la nivel global, fondată în anul 1985. BNI Prime este grupul local din Bistrița
            al acestei organizații.
          </p>
        </motion.div>

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
