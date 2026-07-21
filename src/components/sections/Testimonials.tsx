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
    name: "Bogdan Szilagyi",
    quote:
      "BNI reprezintă pentru mine un mijloc ușor de folosit, simplu și rapid pentru a dezvolta un business.",
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
  {
    name: "Marcel Arotăriței",
    quote:
      "Să fii antreprenor în domeniul proiectării înseamnă, de multe ori, să fii prins între termene-limită, avize și detalii tehnice. Riscul e să te izolezi în propriul birou. Pentru mine, intrarea în BNI Prime a fost gura de aer proaspăt de care aveam nevoie, atât profesional, cât și personal. ​Nu e vorba doar despre networking-ul clasic, unde schimbi cărți de vizită și speri la o minune. În BNI Prime am găsit o adevărată echipă de suport. Am descoperit oameni profesioniști pe care te poți baza și parteneri care înțeleg exact provocările din business. Recomandările nu vin doar ca niște simple contacte, ci ca oportunități reale, bazate pe încredere reciprocă",
  }
];

const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const SCROLL_SPEED = 0.5;
const MAX_CHARS = 180;

function TestimonialCard({ testimonial, active }: { testimonial: { name: string; quote: string }; active: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const isLong = testimonial.quote.length > MAX_CHARS;
  const displayed =
    expanded || !isLong ? testimonial.quote : testimonial.quote.slice(0, MAX_CHARS).trimEnd() + "…";

  return (
    <div
      className={cn(
        "w-72 shrink-0 rounded-2xl border bg-background p-6 shadow-sm transition-all duration-300",
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
          onMouseDown={(e) => e.stopPropagation()}
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
  const autoRafRef = useRef<number>(0);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0, velX: 0, lastX: 0, lastT: 0 });
  const momentumRafRef = useRef<number>(0);

  // Init: start at middle set
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = track.scrollWidth / 3;
  }, []);

  // Infinite loop on scroll
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = track.scrollWidth / 3;
    if (track.scrollLeft >= setWidth * 2) track.scrollLeft -= setWidth;
    else if (track.scrollLeft < setWidth) track.scrollLeft += setWidth;
    const cardWidth = track.scrollWidth / ITEMS.length;
    const idx = Math.round((track.scrollLeft - setWidth) / cardWidth) % TESTIMONIALS.length;
    setCurrent((idx + TESTIMONIALS.length) % TESTIMONIALS.length);
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

  // Drag
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
      if (!trackRef.current || Math.abs(vel) < 0.5) { setPaused(false); return; }
      trackRef.current.scrollLeft -= vel;
      vel *= 0.93;
      momentumRafRef.current = requestAnimationFrame(momentum);
    };
    momentumRafRef.current = requestAnimationFrame(momentum);
  }, []);

  return (
    <section id="testimonials" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Testimoniale"
          title="Ce spun membrii BNI Prime"
          description="Antreprenorii și profesioniștii din grupul BNI Prime despre experiența lor."
        />

        <div className="relative mt-12 md:mt-16">
          {/* Edge blur */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent md:w-24" />

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-4"
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
            {ITEMS.map((t, i) => (
              <TestimonialCard
                key={`${t.name}-${i}`}
                testimonial={t}
                active={i % TESTIMONIALS.length === current}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Testimonialul ${i + 1}`}
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
