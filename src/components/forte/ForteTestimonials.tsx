"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { Quote } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/db";

const SCROLL_SPEED = 0.8;
const MAX_CHARS = 180;

function TestimonialCard({ t, active }: { t: Testimonial; active: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const isLong = t.quote.length > MAX_CHARS;
  const displayed = expanded || !isLong ? t.quote : t.quote.slice(0, MAX_CHARS).trimEnd() + "…";

  return (
    <div className={cn(
      "w-72 shrink-0 rounded-2xl border bg-background p-6 shadow-sm transition-all duration-300 sm:w-80 lg:w-96",
      active ? "border-primary ring-2 ring-primary/40" : "border-border"
    )}>
      <Quote className="h-7 w-7 text-primary/30" aria-hidden="true" />
      <p id={id} className="mt-4 text-sm leading-relaxed text-foreground sm:text-base">
        {displayed.split("\n").map((line, j) => <span key={j} className="block">{line}</span>)}
      </p>
      {isLong && (
        <button type="button" aria-expanded={expanded} aria-controls={id}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
          className="mt-2 text-xs font-semibold text-primary hover:underline">
          {expanded ? "Restrânge" : "Citește mai mult"}
        </button>
      )}
      <p className="mt-4 text-sm font-semibold text-primary">{t.name}</p>
    </div>
  );
}

export function ForteTestimonials({ items }: { items?: Testimonial[] }) {
  const safeItems = items && items.length > 0 ? items : [];
  const ITEMS = [...safeItems, ...safeItems, ...safeItems];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRafRef = useRef<number>(0);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0, velX: 0, lastX: 0, lastT: 0 });
  const momentumRafRef = useRef<number>(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (trackRef.current) trackRef.current.scrollLeft = trackRef.current.scrollWidth / 3;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = track.scrollWidth / 3;
    if (track.scrollLeft >= setWidth * 2) track.scrollLeft -= setWidth;
    else if (track.scrollLeft < setWidth) track.scrollLeft += setWidth;
    const cardWidth = track.scrollWidth / ITEMS.length;
    const idx = Math.round((track.scrollLeft - setWidth) / cardWidth) % safeItems.length;
    setCurrent((idx + safeItems.length) % safeItems.length);
  }, [safeItems.length, ITEMS.length]);

  useEffect(() => {
    if (paused) return;
    const tick = () => {
      if (trackRef.current) trackRef.current.scrollLeft += SCROLL_SPEED;
      autoRafRef.current = requestAnimationFrame(tick);
    };
    autoRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoRafRef.current);
  }, [paused]);

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
    track.scrollLeft = dragRef.current.scrollLeft - (e.pageX - track.offsetLeft - dragRef.current.startX);
    const now = Date.now();
    dragRef.current.velX = (e.pageX - dragRef.current.lastX) / Math.max(now - dragRef.current.lastT, 1);
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
      if (!track || Math.abs(vel) < 0.5) { setPaused(false); return; }
      track.scrollLeft -= vel;
      vel *= 0.93;
      momentumRafRef.current = requestAnimationFrame(momentum);
    };
    momentumRafRef.current = requestAnimationFrame(momentum);
  }, []);

  if (safeItems.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading kicker="Testimoniale" title="Ce spun membrii BNI Forte" description="Experiențele membrilor comunității BNI Forte." />
      </Container>

      <div className="relative mt-12 md:mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />

        <div ref={trackRef} className="flex gap-5 overflow-x-auto pb-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab", userSelect: "none" } as React.CSSProperties}
          onScroll={onScroll} onDragStart={(e) => e.preventDefault()}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove}
          onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
          onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}
        >
          {ITEMS.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} active={i % safeItems.length === current} />
          ))}
        </div>
      </div>

      <Container>
        <div className="mt-5 flex items-center justify-center gap-2">
          {safeItems.map((_, i) => (
            <button key={i} type="button" aria-label={`Testimonial ${i + 1}`}
              className={cn("h-2 rounded-full transition-all duration-300", i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40")} />
          ))}
        </div>
      </Container>
    </section>
  );
}
