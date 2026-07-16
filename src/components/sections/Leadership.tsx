"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Globe, Phone } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const MEMBERS = [
  {
    name: "Alin Marius Corcode",
    role: "Președinte",
    company: "Alliance Imobil Solution SRL",
    website: "https://allianceimobil.ro",
    phone: "",
    photo: "/images/leadership/Alin Corcode.png",
  },
  {
    name: "Vasile Neagoș",
    role: "Secretar / Trezorier",
    company: "Cabinet de avocat Vasile Neagoș",
    website: "",
    phone: "",
    photo: "/images/leadership/Vasile Neagoș.png",
  },
  {
    name: "Marius Lazaroi",
    role: "Coordonator educațional",
    company: "FAST DESIGN 2 PRINT SRL",
    website: "",
    phone: "",
    photo: "",
  },
  {
    name: "Alexandru Antal",
    role: "Comitetul de Întâmpinare",
    company: "Panouri Cluj",
    website: "",
    phone: "",
    photo: "/images/leadership/Alexandru Antal.png",
  },
  {
    name: "Monica Mariana Mutu",
    role: "Comitetul de Întâmpinare",
    company: "PFA Mutu Monica Mariana",
    website: "",
    phone: "",
    photo: "",
  },
  {
    name: "Lucica Ana Marta",
    role: "Comitetul de Membri",
    company: "EUROPX BEST SOLUTIONS SRL",
    website: "",
    phone: "",
    photo: "/images/leadership/Lucica Marta.png",
  },
  {
    name: "Mariana-Dacina Silvesan-Gherman",
    role: "Comitetul de Membri",
    company: "SIMAD 2016",
    website: "http://www.izolatiitermice.eu",
    phone: "",
    photo: "",
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
              {member.photo ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={`Portret ${member.name}`}
                    fill
                    sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/5] w-full bg-surface flex items-center justify-center">
                  <svg className="h-16 w-16 text-border" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
              )}
              <div className="flex flex-col gap-1.5 p-4">
                <h3 className="text-sm font-bold leading-tight text-foreground sm:text-base">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-primary sm:text-sm">
                  {member.role}
                </p>
                <p className="text-xs text-muted">{member.company}</p>
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-primary"
                  >
                    <Globe className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span className="truncate">{member.website.replace(/^https?:\/\//, "")}</span>
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-primary"
                  >
                    <Phone className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {member.phone}
                  </a>
                )}
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
