"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types/db";

const FALLBACK: FaqItem[] = [
  { id: "1", event_slug: "forte", question: "Trebuie să fiu membru BNI ca să particip?", answer: "Nu. Evenimentul este deschis tuturor celor interesați de networking dedicat afacerilor, fie că sunt deja membri BNI, fie că vor să descopere pentru prima dată cum funcționează networking-ul de business structurat.", sort_order: 1 },
  { id: "2", event_slug: "forte", question: "Pot transfera biletul către altă persoană?", answer: "Da. Trimite-ne un email la bigdesigntm@gmail.com cu datele persoanei ce va participa în locul tău și actualizăm biletul fără costuri suplimentare.", sort_order: 2 },
  { id: "3", event_slug: "forte", question: "Există loc de parcare la locația evenimentului?", answer: "Da, The Office din Cluj-Napoca oferă parcare privată pentru toți participanții, contra-cost.", sort_order: 3 },
  { id: "4", event_slug: "forte", question: "Voi primi materiale după eveniment?", answer: "Toți participanții vor primi un email cu principalele concluzii ale evenimentului și contactele echipei de conducere a grupului.", sort_order: 4 },
  { id: "5", event_slug: "forte", question: "Cum mă pregătesc pentru eveniment?", answer: "Recomandăm să vii cu cărți de vizită, un mesaj clar despre ce oferi și ce cauți și deschidere către conversații autentice, exact spiritul pe care îl promovează fiecare membru BNI.", sort_order: 5 },
];

export function ForteFAQ({ items }: { items?: FaqItem[] }) {
  const faq = items && items.length > 0 ? items : FALLBACK;

  return (
    <section id="faq" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="FAQ"
          title="Tot ce trebuie să știi despre eveniment"
          description="Răspunsuri la cele mai frecvente întrebări."
        />

        <div className="mx-auto mt-12 max-w-3xl md:mt-16">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faq.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="rounded-2xl border border-border bg-background px-6 shadow-sm data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline [&>svg]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
