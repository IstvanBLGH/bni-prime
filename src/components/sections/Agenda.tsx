"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerItem } from "@/lib/motion";

const AGENDA = [
  {
    time: "09:00",
    title: "Înregistrare & welcome coffee",
    description: "Acces în locație, badge de participant și primele conexiuni informale înainte de start.",
  },
  {
    time: "09:30",
    title: "Deschidere oficială a evenimentului",
    description: "Bun venit din partea organizatorilor și prezentarea agendei complete a evenimentului BNI.",
  },
  {
    time: "10:00",
    title: "Keynote: Puterea networking-ului BNI",
    description: "De ce filozofia „Givers Gain” a făcut din BNI cea mai mare rețea de recomandări din lume.",
  },
  {
    time: "11:00",
    title: "Panel: Cum cresc afacerile membrilor BNI",
    description: "Antreprenori membri BNI discută deschis despre rezultatele concrete obținute prin networking.",
  },
  {
    time: "12:30",
    title: "Pauză de networking & prânz",
    description: "Conversații informale, schimb de contacte și prima rundă de recomandări de business.",
  },
  {
    time: "14:00",
    title: "Workshop: Tehnici de recomandare eficiente",
    description: "Sesiune practică despre cum să transformi o conversație într-o recomandare de calitate.",
  },
  {
    time: "15:30",
    title: "Sesiuni 1:1 de networking structurat",
    description: "Întâlniri scurte, ghidate, între participanți, exact ca în întâlnirile săptămânale BNI.",
  },
  {
    time: "17:00",
    title: "Closing keynote & premii",
    description: "Recapitulare a zilei și recunoașterea celor mai active grupuri și membri BNI prezenți.",
  },
];

export function Agenda() {
  return (
    <section id="agenda" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Agendă"
          title="Programul zilei evenimentului"
          description="O singură zi, structurată pas cu pas, pentru a maximiza fiecare oportunitate de networking business."
        />

        <ol className="mx-auto mt-12 max-w-3xl md:mt-16">
          {AGENDA.map((item, i) => (
            <motion.li
              key={item.time}
              {...staggerItem(i)}
              className="grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-[5rem_auto_1fr]"
            >
              <span className="hidden pt-0.5 text-sm font-semibold text-primary md:block">
                {item.time}
              </span>

              <div className="flex flex-col items-center">
                <span
                  className="h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-background"
                  aria-hidden="true"
                />
                {i < AGENDA.length - 1 && (
                  <span className="my-1 w-px flex-1 bg-border" aria-hidden="true" />
                )}
              </div>

              <div className="pb-8">
                <span className="mb-1 block text-sm font-semibold text-primary md:hidden">
                  {item.time}
                </span>
                <h3 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
