"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { fadeInUp } from "@/lib/motion";

const FAQS = [
  {
    question: "Trebuie să fiu membru BNI ca să particip la evenimentul organizat de BNI Prime?",
    answer:
      "Nu. Evenimentul este deschis tuturor celor interesați de networking dedicat afacerilor, fie că sunt deja membri BNI, fie că vor să descopere pentru prima dată cum funcționează networking-ul de business structurat.",
  },
  {
    question: "Ce diferență este între pachetele Standard, Plus și Sponsor?",
    answer:
      "Biletul Standard oferă acces complet la eveniment și catering. Biletul Plus adaugă stand pentru prezentarea serviciilor și produselor tale. Biletul Sponsor include, pe lângă cele de mai sus, mențiune specială în deschiderea oficială a evenimentului și logo vizibil pe toate materialele evenimentului.",
  },
  {
    question: "Pot transfera biletul către altă persoană?",
    answer:
      "Da. Trimite-ne un email la bigdesigntm@gmail.com cu datele persoanei ce va participa în locul tău și actualizăm biletul fără costuri suplimentare.",
  },
  {
    question: "Există loc de parcare la locația evenimentului?",
    answer:
      "Da, Hotel Codrișor din Bistrița, locul de desfășurare al evenimentului organizat de BNI Prime, oferă parcare privată pentru toți participanții.",
  },
  {
    question: "Voi primi materiale după eveniment?",
    answer:
      "Toți participanții vor primi un email cu principalele concluzii ale evenimentului și contactele echipei de conducere a grupului.",
  },
  {
    question: "Cum mă pregătesc pentru eveniment?",
    answer:
      "Recomandăm să vii cu cărți de vizită, un mesaj clar despre ce oferi și ce cauți și deschidere către conversații autentice — exact spiritul pe care îl promovează fiecare membru BNI.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Întrebări frecvente"
          title="Tot ce trebuie să știi despre eveniment"
          description="Nu ai găsit răspunsul aici? Scrie-ne la bigdesigntm@gmail.com și revenim cu detalii."
        />

        <motion.div {...fadeInUp} className="mx-auto mt-12 max-w-3xl md:mt-16">
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-background px-6 shadow-sm md:px-8">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-base md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </section>
  );
}
