"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Globe } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";

const MEMBERS = [
  {
    name: "Alin Marius Corcode",
    role: "Președinte",
    company: "Alliance Imobil Solution SRL",
    website: "https://allianceimobil.ro",
  },
  {
    name: "Vasile Neagoș",
    role: "Secretar / Trezorier",
    company: "Cabinet de avocat Vasile Neagoș",
  },
  {
    name: "Marius Lazaroi",
    role: "Coordonator educațional",
    company: "FAST DESIGN 2 PRINT SRL",
  },
  {
    name: "Alexandru Antal",
    role: "Comitetul de Întâmpinare",
    company: "Panouri Cluj",
  },
  {
    name: "Monica Mariana Mutu",
    role: "Comitetul de Întâmpinare",
    company: "PFA Mutu Monica Mariana",
  },
  {
    name: "Lucica Ana Marta",
    role: "Comitetul de Membri",
    company: "EUROPX BEST SOLUTIONS SRL",
  },
  {
    name: "Mariana-Dacina Silvesan-Gherman",
    role: "Comitetul de Membri",
    company: "SIMAD 2016",
    website: "http://www.izolatiitermice.eu",
  },
];

const AUTOSCROLL_DELAY = 3500;

export function Leadership() {
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
    goTo((current + 1) % MEMBERS.length);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOSCROLL_DELAY);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section id="membrii" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Membrii"
          title="Membrii grupului BNI Prime"
          description="Antreprenorii și profesioniștii din Bistrița care alcătuiesc grupul BNI Prime și organizează evenimentul Prime Summer."
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
          {MEMBERS.map((member, i) => (
            <div
              key={member.name}
              onClick={() => goTo(i)}
              className={cn(
                "w-56 shrink-0 cursor-pointer overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-500",
                "hover:-translate-y-1 hover:shadow-xl",
                "sm:w-64 lg:w-72",
                i === current
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-border"
              )}
            >
              <ImagePlaceholder
                width={288}
                height={360}
                aspectRatio="4/5"
                label={`Portret ${member.name}`}
                className="w-full rounded-none border-x-0 border-t-0"
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-tight text-foreground sm:text-base">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-primary sm:text-sm">
                      {member.role}
                    </p>
                  </div>
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Website ${member.company}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-muted transition-colors duration-300 hover:bg-primary hover:text-white"
                    >
                      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted">{member.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {MEMBERS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Mergi la membrul ${i + 1}`}
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
