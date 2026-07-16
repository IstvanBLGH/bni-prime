"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerItem } from "@/lib/motion";

const AGENDA = [
  {
    time: "17:00 - 17:45",
    title: "Primirea participanților",
    description: "Acces în locație, primirea ecusonului de participant și primele conexiuni informale",
  },
  {
    time: "17:45 - 17:50",
    title: "Deschiderea oficială a evenimentului",
    description: "Bun venit din partea organizatorilor și prezentarea agendei complete a evenimentului",
  },
  {
    time: "17:50 - 17:55",
    title: "Scop și privire de ansamblu BNI",
    description: "Ce este networking-ul? Ce este BNI?",
  },
  {
    time: "17:55 - 18:00",
    title: "Prezentarea valorilor BNI",
    description: "Dăruind vei dobândi!",
  },
  {
    time: "18:00 - 18:15",
    title: "Speaker",
    description: "Subiect: importanța comunităților de afaceri",
  },
  {
    time: "18:15 - 18:25",
    title: "Prezentarea membrilor BNI PRIME (4 membri)",
    description: "",
  },
  {
    time: "18:25 - 18:35",
    title: "Sesiune de speed networking (1)",
    description: "",
  },
  {
    time: "18:35 - 18:50",
    title: "Moment artistic",
    description: "Ansamblul…",
  },
  {
    time: "18:50 - 19:00",
    title: "Prezentarea membrilor BNI PRIME (3 membri)",
    description: "",
  },
  {
    time: "19:00 - 19:10",
    title: "Sesiune de speed networking (2)",
    description: "",
  },
  {
    time: "19:10 - 19:25",
    title: "Speaker",
    description: "Subiect",
  },
  {
    time: "19:25 - 19:35",
    title: "Prezentarea membrilor BNI PRIME (3 membri)",
    description: "",
  },
  {
    time: "19:35 - 19:45",
    title: "Sesiune de speed networking (3)",
    description: "",
  },
  {
    time: "19:45 - 20:00",
    title: "Orientarea invitaților",
    description: "Cum devin membru BNI?",
  },
  {
    time: "20:00 - 21:00",
    title: "Networking deschis",
    description: "",
  },
];

export function Agenda() {
  return (
    <section id="agenda" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Agendă"
          title="Programul evenimentului"
          description="O după-masă, câteva ore, multe oportunități."
        />

        <ol className="mx-auto mt-12 max-w-3xl md:mt-16">
          {AGENDA.map((item, i) => (
            <motion.li
              key={item.time}
              {...staggerItem(i)}
              className="grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-[9rem_auto_1fr]"
            >
              <span className="hidden pt-0.5 text-sm font-semibold tabular-nums text-primary md:block">
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
                {item.description && (
                  <p className="mt-1 text-sm leading-relaxed text-muted md:text-base">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
