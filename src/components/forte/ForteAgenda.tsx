"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerItem } from "@/lib/motion";
import type { AgendaItem } from "@/types/db";

const FALLBACK: AgendaItem[] = [
  { id: "1", event_slug: "forte", time_range: "17:00 - 17:45", title: "Primirea participanților", description: "Acces în locație, primirea ecusonului de participant și primele conexiuni informale", sort_order: 1 },
  { id: "2", event_slug: "forte", time_range: "17:45 - 17:50", title: "Deschiderea oficială a evenimentului", description: "Bun venit din partea organizatorilor și prezentarea agendei complete", sort_order: 2 },
  { id: "3", event_slug: "forte", time_range: "17:50 - 17:55", title: "Scop și privire de ansamblu BNI", description: "Ce este networking-ul? Ce este BNI?", sort_order: 3 },
  { id: "4", event_slug: "forte", time_range: "17:55 - 18:00", title: "Prezentarea valorilor BNI", description: "Dăruind vei dobândi!", sort_order: 4 },
  { id: "5", event_slug: "forte", time_range: "18:00 - 18:10", title: "Prezentarea membrilor power-team-ului (3-4 membri)", description: "", sort_order: 5 },
  { id: "6", event_slug: "forte", time_range: "18:10 - 18:20", title: "Sesiune de speed networking (1)", description: "", sort_order: 6 },
  { id: "7", event_slug: "forte", time_range: "18:20 - 18:35", title: "Speaker", description: "Subiect: TBD", sort_order: 7 },
  { id: "8", event_slug: "forte", time_range: "18:35 - 18:45", title: "Prezentarea membrilor power-team-ului (3-4 membri)", description: "", sort_order: 8 },
  { id: "9", event_slug: "forte", time_range: "18:45 - 18:55", title: "Sesiune de speed networking (2)", description: "", sort_order: 9 },
  { id: "10", event_slug: "forte", time_range: "18:55 - 19:00", title: "Închiderea evenimentului", description: "", sort_order: 10 },
  { id: "11", event_slug: "forte", time_range: "19:00 - 19:20", title: "Orientarea invitaților", description: "Cum devin membru BNI?", sort_order: 11 },
  { id: "12", event_slug: "forte", time_range: "19:20 - 20:00", title: "Networking deschis", description: "", sort_order: 12 },
];

export function ForteAgenda({ items }: { items?: AgendaItem[] }) {
  if (items !== undefined && items.length === 0) return null;
  const agenda = items && items.length > 0 ? items : FALLBACK;

  return (
    <section id="agenda" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Agendă"
          title="Programul evenimentului"
          description="o după-masă, câteva ore, multe oportunități"
        />

        <ol className="mx-auto mt-12 max-w-3xl md:mt-16">
          {agenda.map((item, i) => (
            <motion.li
              key={item.id}
              {...staggerItem(i)}
              className="grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-[9rem_auto_1fr]"
            >
              <span className="hidden pt-0.5 text-sm font-semibold tabular-nums text-primary md:block">
                {item.time_range}
              </span>

              <div className="flex flex-col items-center">
                <span className="h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-background" aria-hidden="true" />
                {i < agenda.length - 1 && (
                  <span className="my-1 w-px flex-1 bg-border" aria-hidden="true" />
                )}
              </div>

              <div className="pb-8">
                <span className="mb-1 block text-sm font-semibold text-primary md:hidden">
                  {item.time_range}
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
