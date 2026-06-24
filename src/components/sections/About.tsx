"use client";

import { motion } from "framer-motion";
import { Users, Handshake, TrendingUp, Award } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerItem } from "@/lib/motion";

const VALUES = [
  {
    icon: Users,
    title: "Networking BNI structurat",
    description:
      "Nu e un eveniment social oarecare — este networking business cu un format clar, gândit să producă conexiuni reale, nu doar cărți de vizită.",
  },
  {
    icon: Handshake,
    title: "Recomandări care contează",
    description:
      "La evenimentul organizat de BNI Prime întâlnești antreprenori dispuși să recomande activ produse și servicii, exact ca în filozofia care a făcut BNI cea mai mare rețea din lume.",
  },
  {
    icon: TrendingUp,
    title: "Oportunități de creștere",
    description:
      "Sesiuni de business ghidate de echipa de conducere a grupului și studii de caz despre cum membri BNI și-au crescut afacerile prin networking consecvent.",
  },
  {
    icon: Award,
    title: "Comunitate de elită",
    description:
      "Evenimentul organizat de BNI Prime reunește membri BNI și antreprenori independenți care cred în puterea relațiilor pe termen lung.",
  },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Despre eveniment"
          title="Evenimentul organizat de grupul BNI Prime"
          description="BNI Prime este un grup de networking business din Bistrița, parte a organizației internaționale BNI. Acest eveniment, organizat de grup, își deschide ușile către antreprenori, fondatori și profesioniști care vor să-și crească afacerea prin relații reale."
        />

        <motion.p
          {...fadeInUp}
          className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-muted md:text-lg"
        >
          Timp de o zi, evenimentul transformă networking-ul într-un proces structurat: întâlnești
          cei 18 membri activi ai grupului, interacționezi cu echipa de conducere care a
          construit afaceri prin recomandări, și pleci cu cel puțin câteva conexiuni concrete
          pentru afacerea ta.
        </motion.p>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
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
      </Container>
    </section>
  );
}
