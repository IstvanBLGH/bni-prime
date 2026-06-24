"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { staggerItem } from "@/lib/motion";

const TESTIMONIALS = [
  {
    quote:
      "Am venit la prima mea întâlnire BNI Prime fără mari expectații și am plecat cu trei colaborări concrete. Networking-ul BNI funcționează diferit de orice altă conferință la care am fost.",
    name: "Vlad Constantin",
    role: "Fondator, agenție de construcții",
  },
  {
    quote:
      "Ce m-a convins a fost structura. Nu e doar „du-te și vorbește cu oameni” — la BNI Prime ești ghidat exact spre conversațiile care contează pentru afacerea ta.",
    name: "Larisa Pop",
    role: "Membră BNI, consultanță financiară",
  },
  {
    quote:
      "Ca sponsor la evenimentul organizat de BNI Prime am avut vizibilitate reală în fața unei săli pline de antreprenori. Investiția s-a întors de câteva ori prin clienți noi.",
    name: "Tudor Anghel",
    role: "CEO, companie de software",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Testimoniale"
          title="Ce spun participanții despre eveniment"
          description="Antreprenori și membri BNI care au participat la întâlnirile organizate de grupul BNI Prime."
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              {...staggerItem(i)}
              className="flex flex-col rounded-2xl border border-border bg-background p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <Quote className="h-8 w-8 text-primary/30" aria-hidden="true" />
              <p className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-4">
                <ImagePlaceholder
                  width={80}
                  height={80}
                  aspectRatio="1/1"
                  label={`Avatar ${t.name}`}
                  compact
                  className="h-16 w-16 shrink-0 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
