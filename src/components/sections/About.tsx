"use client";

import { motion } from "framer-motion";
import { Users, Handshake, TrendingUp } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { fadeInUp, staggerItem } from "@/lib/motion";

const BNI_RO_STATS = [
  { value: "15+", label: "ani în România" },
  { value: "30", label: "județe + București" },
  { value: "50+", label: "grupuri active" },
  { value: "1.500+", label: "membri" },
  { value: "44 mil. €", label: "cifră de afaceri" },
];

const VALUES = [
  {
    icon: Users,
    title: "Networking structurat",
    description: "Cadru pentru dezvoltarea relațiilor de afaceri în mod organizat și consecvent.",
  },
  {
    icon: Handshake,
    title: "Construirea relațiilor",
    description: "Relații autentice care permit recomandări reale între profesioniști.",
  },
  {
    icon: TrendingUp,
    title: "Recomandări",
    description: "O ușă deschisă către clientul dorit — filozofia centrală a fiecărui grup BNI.",
  },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32">
      <Container>

        {/* BNI România */}
        <motion.div {...fadeInUp} className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wide text-primary">
              BNI România
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              BNI este prezentă în România de peste 15 ani
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Astăzi, există grupuri BNI lansate sau în formare în 30 de județe și în București,
              construind o rețea națională de antreprenori care se susțin reciproc prin recomandări.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
            {BNI_RO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...staggerItem(i)}
                className="rounded-2xl border border-border bg-surface p-4 text-center"
              >
                <p className="text-2xl font-bold tracking-tight text-primary">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BNI Prime */}
        <motion.div
          {...fadeInUp}
          className="mt-16 rounded-3xl border border-border bg-surface p-8 md:mt-20 md:p-12"
        >
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wide text-primary">
            BNI Prime
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Primul grup BNI din județul Bistrița-Năsăud
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            BNI Prime s-a lansat în 24 decembrie 2025 și este primul grup BNI de business networking
            din județul Bistrița-Năsăud. BNI Prime își dorește să schimbe modul în care oamenii fac
            afaceri în Bistrița și în județ și este în căutare de profesioniști ce cred în valori
            profesionale și care își doresc să-și crească afacerile prin construirea relațiilor pe
            termen lung.
          </p>
        </motion.div>

        {/* Prime Summer — Eveniment */}
        <div className="mt-16 md:mt-20">
          <motion.div {...fadeInUp} className="text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wide text-primary">
              Eveniment
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              <span className="text-primary">Prime Summer</span> · 29 iulie 2026
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              Prime Summer este un eveniment de business networking organizat de grupul BNI Prime
              pentru mediul de afaceri din județul Bistrița-Năsăud și din regiune. Evenimentul este
              ocazia perfectă de a-ți crește sfera de contacte, de a interacționa cu profesioniști
              din diverse domenii de activitate și de a pune bazele unor relații care să te ajute
              să-ți crești afacerea.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {VALUES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  {...staggerItem(i)}
                  className="rounded-2xl border border-border bg-background p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
}
