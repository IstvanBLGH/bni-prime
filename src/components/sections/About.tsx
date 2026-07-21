"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Handshake, TrendingUp } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { fadeInUp, staggerItem } from "@/lib/motion";

const LENS_SIZE = 320;
const ZOOM = 5;

function MapZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setLens({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const bgX = lens ? (lens.x / (containerRef.current?.offsetWidth ?? 1)) * 100 : 50;
  const bgY = lens ? (lens.y / (containerRef.current?.offsetHeight ?? 1)) * 100 : 50;

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-crosshair select-none"
      onMouseMove={onMouseMove}
      onMouseLeave={() => setLens(null)}
    >
      <Image
        src="/Harta romania.png"
        alt="Harta României cu prezența BNI în 30 de județe"
        width={800}
        height={700}
        className="h-auto w-full object-contain drop-shadow-sm"
        draggable={false}
      />
      {lens && (
        <div
          className="pointer-events-none absolute rounded-full border-2 border-white/60 shadow-2xl ring-1 ring-black/10"
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            left: lens.x - LENS_SIZE / 2,
            top: lens.y - LENS_SIZE / 2,
            backgroundImage: "url('/Harta romania.png')",
            backgroundSize: `${ZOOM * 100}%`,
            backgroundPosition: `${bgX}% ${bgY}%`,
            backgroundRepeat: "no-repeat",
            backdropFilter: "brightness(1.05)",
          }}
        />
      )}
    </div>
  );
}

const BNI_RO_STATS = [
  { value: "30", label: "județe + București" },
  { value: "50+", label: "grupuri active" },
  { value: "1.500+", label: "membri" },
  { value: "44 mil. €", label: "cifră de afaceri" },
];

const VALUES = [
  {
    icon: Users,
    title: "Networking structurat",
    description: "Cadru pentru dezvoltarea relațiilor de afaceri în mod organizat și consecvent.",
  },
  {
    icon: Handshake,
    title: "Construirea relațiilor",
    description: "Relații autentice care permit recomandări reale între profesioniști.",
  },
  {
    icon: TrendingUp,
    title: "Recomandări",
    description: "O ușă deschisă către clientul dorit, filozofia centrală a fiecărui grup BNI.",
  },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32">
      <Container>

        {/* BNI România */}
        <motion.div {...fadeInUp} className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          {/* Stânga: text + cifre */}
          <div>
            <span className="mb-3 inline-block text-xl font-bold uppercase tracking-wide text-primary">
              BNI România
            </span>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Astăzi, există grupuri BNI lansate sau în formare în 30 de județe și în București,
              construind o rețea națională de antreprenori care se susțin reciproc prin recomandări.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
              {BNI_RO_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  {...staggerItem(i)}
                  className="rounded-2xl border border-border bg-surface p-5 text-center"
                >
                  <p className="text-3xl font-bold tracking-tight text-primary">{stat.value}</p>
                  <p className="mt-2 text-xs font-medium text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dreapta: harta României */}
          <motion.div {...staggerItem(1)} className="flex items-center justify-center">
            <div className="w-full max-w-sm md:max-w-2xl lg:max-w-3xl">
              <MapZoom />
            </div>
          </motion.div>
        </motion.div>

        {/* BNI Prime */}
        <motion.div
          {...fadeInUp}
          className="mt-16 rounded-3xl border border-border bg-surface p-12 text-center md:mt-20 md:p-16"
        >
          <span className="mb-3 inline-block text-xl font-bold uppercase tracking-wide text-primary">
            BNI Prime
          </span>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg lg:text-xl">
            BNI Prime s-a lansat în 24 decembrie 2025 și este primul grup BNI de business networking
            din județul Bistrița-Năsăud. BNI Prime își dorește să schimbe modul în care oamenii fac
            afaceri în Bistrița și în județ și este în căutare de profesioniști ce cred în valori
            profesionale și care își doresc să-și crească afacerile prin construirea relațiilor pe
            termen lung.
          </p>
        </motion.div>

        {/* Prime Summer — Eveniment */}
        <div className="mt-16 md:mt-20">
          <motion.div {...fadeInUp} className="text-center">
            <Image
              src="/First section thumbnail (1).png"
              alt="Prime Summer"
              width={600}
              height={214}
              className="mx-auto w-full max-w-xs md:max-w-sm"
            />
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              Prime Summer este un eveniment de business networking organizat de grupul BNI Prime
              pentru mediul de afaceri din județul Bistrița-Năsăud și din regiune. Evenimentul este
              ocazia perfectă de a-ți crește sfera de contacte, de a interacționa cu profesioniști
              din diverse domenii de activitate și de a pune bazele unor relații care să te ajute
              să-ți crești afacerea.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {VALUES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-background p-6 md:hover:-translate-y-1 md:hover:shadow-xl md:transition-all md:duration-500"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
}
