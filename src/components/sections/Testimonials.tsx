"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { Quote } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Alexandru Antal",
    quote:
      "Pentru mine, BNI înseamnă învățare continuă și un loc în care te poți dezvolta într-un mediu de afaceri alături de oameni minunați.",
  },
  {
    name: "Alin Corcode",
    quote:
      "Vizibilitatea nu este un detaliu opțional — este diferența dintre a fi remarcat și a fi uitat. În dezvoltarea personală și în business, oamenii recomandă ceea ce cunosc, înțeleg și în care au încredere. Dacă nu știu cine ești și ce faci, șansele să te recomande scad aproape de zero.\nÎn BNI am văzut clar că rezultatele apar atunci când ești prezent constant, implicat și activ în întâlnirile de networking. Nu doar vizibilitatea contează, ci și participarea reală la evenimentele organizate, pentru că acolo se construiesc relațiile care duc la încredere, colaborări și recomandări valoroase.",
  },
  {
    name: "Dacina Silveșan",
    quote:
      "Pentru mine BNI reprezintă apartenența la un mediu de afaceri prin care să construiesc relații și să promovez produsele din portofoliu, spre a extinde comunitatea de oameni sănătoși în case sănătoase.",
  },
  {
    name: "Lucica Marta",
    quote:
      "BNI reprezintă un mediu în care recomandările de calitate se transformă în oportunități reale de afaceri. Pentru mine, BNI PRIME înseamnă parteneriate de încredere, dezvoltare continuă și o comunitate care contribuie activ la succesul fiecărui membru.",
  },
  {
    name: "Salim Mroue",
    quote:
      "În BNI am descoperit că cele mai valoroase recomandări se construiesc prin încredere, implicare și consecvență. Atunci când ești prezent, contribui și susții comunitatea, oamenii ajung să te cunoască, să aibă încredere în tine și să te recomande cu convingere. Pentru mine, BNI înseamnă relații autentice, colaborări de calitate și oportunități reale de creștere în business.",
  },
  {
    name: "Vasile Neagoș",
    quote:
      "Pentru mine, BNI Prime înseamnă mai mult decât networking. Este locul în care relațiile se transformă în recomandări, iar recomandările în oportunități reale. Ca avocat stagiar, am înțeles aici că cea mai bună reclamă nu este cea plătită, ci aceea pe care o primești de la colegii cu care te întâlnești săptămânal și care au încredere în tine. În fond, recomandarea e cea mai valoroasă carte de vizită pe care o poate primi un avocat.",
  },
];

const AUTOSCROLL_DELAY = 4500;
const MAX_CHARS = 180;

function TestimonialCard({
  testimonial,
  active,
  onClick,
}: {
  testimonial: { name: string; quote: string };
  active: boolean;
  onClick: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const isLong = testimonial.quote.length > MAX_CHARS;
  const displayed = expanded || !isLong
    ? testimonial.quote
    : testimonial.quote.slice(0, MAX_CHARS).trimEnd() + "…";

  return (
    <div
      onClick={onClick}
      className={cn(
        "w-72 shrink-0 cursor-pointer rounded-2xl border bg-background p-6 shadow-sm transition-all duration-500",
        "hover:-translate-y-1 hover:shadow-xl",
        "sm:w-80 lg:w-96",
        active ? "border-primary ring-2 ring-primary/40" : "border-border"
      )}
    >
      <Quote className="h-7 w-7 text-primary/30" aria-hidden="true" />
      <p id={id} className="mt-4 text-sm leading-relaxed text-foreground sm:text-base">
        {displayed.split("\n").map((line, j) => (
          <span key={j} className="block">{line}</span>
        ))}
      </p>
      {isLong && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
          className="mt-2 text-xs font-semibold text-primary hover:underline"
        >
          {expanded ? "Restrânge" : "Citește mai mult"}
        </button>
      )}
      <p className="mt-4 text-sm font-semibold text-primary">{testimonial.name}</p>
    </div>
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const card = cards[index];
    if (!card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset =
      track.scrollLeft +
      cardRect.left -
      trackRect.left -
      (trackRect.width - cardRect.width) / 2;
    track.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % TESTIMONIALS.length);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOSCROLL_DELAY);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section id="testimonials" className="bg-surface py-12 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Testimoniale"
          title="Ce spun membrii BNI Prime"
          description="Antreprenorii și profesioniștii din grupul BNI Prime despre experiența lor."
        />

        <div
          ref={trackRef}
          className="mt-12 flex gap-5 overflow-x-auto pb-4 md:mt-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={t.name}
              testimonial={t}
              active={i === current}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Mergi la testimonialul ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
