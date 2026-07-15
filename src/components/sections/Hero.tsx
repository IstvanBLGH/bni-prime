"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/Container";

const HEADLINE = "Evenimentul de business networking al verii din Bistrița.";

const easeApple = [0.21, 0.47, 0.32, 0.98] as const;

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const headlineWord = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeApple },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeApple }}
        >
          <Badge variant="secondary" className="mb-6 gap-1.5 px-4 py-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            29 Iulie 2026 · Bistrița
          </Badge>
        </motion.div>

        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          {HEADLINE.split(" ").map((w, i) => (
            <motion.span key={i} variants={headlineWord} className="inline-block">
              {w}&nbsp;
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: easeApple }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          BNI Prime te invită la evenimentul de business networking al verii — un eveniment
          ce aduce la aceeași masă membri BNI și oameni de afaceri din regiune, la care
          participanții pot identifica oportunități concrete pentru afacerile lor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: easeApple }}
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Button size="lg" asChild className="w-full sm:w-auto">
            <a href="#tickets">
              Înscrie-te acum
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <a href="#agenda">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Agenda evenimentului
            </a>
          </Button>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: easeApple }}
        className="mt-10 lg:mt-20"
      >
        <Container>
          <div className="relative">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2, ease: easeApple }}
              className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-lg lg:hidden"
            >
              Locuri limitate
            </motion.span>

            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl ring-2 ring-primary/40 lg:aspect-video lg:rounded-2xl lg:shadow-lg lg:ring-0">
              <Image
                src="/images/hero.jpg"
                alt="Membri și vizitatori BNI Prime în timpul unei întâlniri de networking business la Bistrița"
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-10">
                <div className="relative inline-flex flex-col items-start gap-2 lg:gap-3">
                  <span
                    className="absolute -inset-4 -z-10 hidden rounded-2xl bg-muted/40 blur-2xl lg:block lg:motion-safe:animate-pulse"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-1 lg:motion-safe:animate-soft-pulse">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/70 lg:text-sm">
                      Organizat de grupul BNI Prime · Bistrița
                    </span>
                    <p className="text-lg font-bold tracking-tight text-white sm:text-xl lg:text-3xl">
                      Prime Summer · 29 Iulie 2026
                    </p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="mt-1 h-10 px-5 text-sm lg:h-12 lg:px-8 lg:text-base"
                  >
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
