"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/motion";

export function CTAFinal() {
  return (
    <section id="cta-final" className="py-12 md:py-24 lg:py-32">
      <Container>
        <motion.div
          {...fadeInUp}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary-dark px-8 py-16 text-center shadow-lg md:px-16 md:py-24"
        >
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            Rezervă-ți locul la eveniment
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Locurile pentru Prime Summer — evenimentul organizat de BNI Prime pe 29 iulie 2026 — sunt limitate.
            Alătură-te comunității de antreprenori și membri BNI care construiesc afaceri prin networking real.
          </p>
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 w-full bg-white text-primary hover:bg-white/90 sm:w-auto"
            >
              <a href="#tickets">
                Înscrie-te acum
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
