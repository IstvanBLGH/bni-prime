"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/Container";
import type { HeroContent } from "@/types/db";

const easeApple = [0.21, 0.47, 0.32, 0.98] as const;

const FALLBACK: Partial<HeroContent> = {
  badge: "Eveniment de business networking",
  title: "ZIUA INVITATULUI",
  date_text: "29.09.2026",
  city: "Cluj-Napoca",
  description:
    "BNI FORTE te invită la evenimentul de business networking ZIUA INVITATULUI, un eveniment ce aduce la aceeași masă membri BNI și oameni de afaceri din regiune.",
  image_url: null,
};

export function ForteHero({ data }: { data?: Partial<HeroContent> | null }) {
  const d = { ...FALLBACK, ...data };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20 pb-10 md:pt-32 md:pb-16"
    >
      <Container className="flex flex-col items-center gap-0 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeApple }}
        >
          <Badge variant="secondary" className="gap-1.5 px-4 py-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {d.date_text} · {d.city}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeApple }}
          className="my-6 text-[13vw] font-extrabold leading-none tracking-tight text-primary sm:text-[10vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw]"
          style={{ fontStyle: "italic" }}
        >
          {d.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeApple }}
          className="max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {d.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: easeApple }}
          className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <a href="#agenda">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Agenda evenimentului
            </a>
          </Button>
          <Button size="lg" asChild className="w-full sm:w-auto">
            <a href="#tickets">
              Înscrie-te acum
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </Container>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: easeApple }}
        className="mt-10 lg:mt-16"
      >
        <Container>
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl ring-2 ring-primary/40 lg:aspect-video lg:rounded-2xl">
              {d.image_url ? (
                <Image
                  src={d.image_url}
                  alt={`BNI Forte — ${d.title}`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-surface to-primary/5">
                  <span className="text-6xl font-black italic text-primary/20 md:text-9xl">FORTE</span>
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-10">
                <div className="inline-flex flex-col items-start gap-2">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/70 lg:text-sm">
                    Organizat de grupul BNI Forte · {d.city}
                  </span>
                  <p className="text-lg font-bold tracking-tight text-white sm:text-xl lg:text-3xl">
                    {d.title} · {d.date_text}
                  </p>
                  <Button asChild size="lg" className="mt-1 h-10 px-5 text-sm lg:h-12 lg:px-8 lg:text-base">
                    <a href="#tickets">
                      Rezervă-ți locul
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
