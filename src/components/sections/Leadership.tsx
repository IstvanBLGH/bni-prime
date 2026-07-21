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
    photo: "/images/leadership/Monica Mutu.png",
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
    photo: "/images/leadership/Dacina Silveșan.png",
  },
  {
    name: "Bogdan Szilagyi",
    role: "",
    company: "",
    website: "",
    phone: "",
    photo: "/images/leadership/Bogdan Szilagyi.png",
  },
  {
    name: "Horia Ștefănescu",
    role: "",
    company: "",
    website: "",
    phone: "",
    photo: "/images/leadership/Horia Ștefănescu.png",
  },
];

const ITEMS = [...MEMBERS, ...MEMBERS, ...MEMBERS];
const SCROLL_SPEED = 0.6;

export function Leadership() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRafRef = useRef<number>(0);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0, velX: 0, lastX: 0, lastT: 0 });
  const momentumRafRef = useRef<number>(0);

  // Init: start at middle set
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = track.scrollWidth / 3;
    track.scrollLeft = setWidth;
  }, []);

  // Infinite loop detection on scroll
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = track.scrollWidth / 3;
    if (track.scrollLeft >= setWidth * 2) {
      track.scrollLeft -= setWidth;
    } else if (track.scrollLeft < setWidth) {
      track.scrollLeft += setWidth;
    }
    // Update dot indicator
    const cardWidth = (track.scrollWidth / ITEMS.length);
    const idx = Math.round((track.scrollLeft - setWidth) / cardWidth) % MEMBERS.length;
    setCurrent((idx + MEMBERS.length) % MEMBERS.length);
  }, []);

  // Auto-scroll via RAF
  useEffect(() => {
    if (paused) return;
    const tick = () => {
      const track = trackRef.current;
      if (track) track.scrollLeft += SCROLL_SPEED;
      autoRafRef.current = requestAnimationFrame(tick);
    };
    autoRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoRafRef.current);
  }, [paused]);

  // Drag handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    cancelAnimationFrame(momentumRafRef.current);
    dragRef.current = { isDragging: true, startX: e.pageX - track.offsetLeft, scrollLeft: track.scrollLeft, velX: 0, lastX: e.pageX, lastT: Date.now() };
    setPaused(true);
    track.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current.isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = dragRef.current.scrollLeft - (x - dragRef.current.startX);
    const now = Date.now();
    const dt = Math.max(now - dragRef.current.lastT, 1);
    dragRef.current.velX = (e.pageX - dragRef.current.lastX) / dt;
    dragRef.current.lastX = e.pageX;
    dragRef.current.lastT = now;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    const track = trackRef.current;
    if (track) track.style.cursor = "grab";
    let vel = dragRef.current.velX * 18;
    const momentum = () => {
      if (!track || Math.abs(vel) < 0.3) { setPaused(false); return; }
      track.scrollLeft -= vel;
      vel *= 0.93;
      momentumRafRef.current = requestAnimationFrame(momentum);
    };
    momentumRafRef.current = requestAnimationFrame(momentum);
  }, []);

  return (
    <section id="membrii" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Membrii"
          title="Membrii grupului BNI Prime"
          description="Antreprenorii și profesioniștii din Bistrița care alcătuiesc grupul BNI Prime și organizează evenimentul Prime Summer."
        />

        <div className="relative mt-8 md:mt-16">
          {/* Fade stânga */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent md:w-24" />
          {/* Fade dreapta */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent md:w-24" />

        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto pb-4 md:gap-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab", userSelect: "none" } as React.CSSProperties}
          onScroll={onScroll}
          onDragStart={(e) => e.preventDefault()}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => { onMouseUp(); }}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {ITEMS.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              className={cn(
                "w-40 shrink-0 overflow-hidden rounded-2xl border bg-background shadow-sm transition-colors duration-300",
                "sm:w-56 lg:w-72",
                i % MEMBERS.length === current
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
                    draggable={false}
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/5] w-full bg-surface flex items-center justify-center">
                  <svg className="h-16 w-16 text-border" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
              )}
              <div className="flex flex-col gap-1 p-3 sm:gap-1.5 sm:p-4">
                <h3 className="text-xs font-bold leading-tight text-foreground sm:text-sm">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-primary">
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
        </div>{/* end relative wrapper */}

        {/* Dot indicators */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {MEMBERS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Membrul ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current ? "w-6 bg-primary" : "w-2 bg-border"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
