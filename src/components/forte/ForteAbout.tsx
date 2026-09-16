"use client";

import { ExternalLink, Network, Users, Handshake } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { AboutContent } from "@/types/db";

const FALLBACK: Partial<AboutContent> = {
  group_title: "BNI FORTE",
  group_body:
    "BNI FORTE este cel mai vechi grup BNI de business networking din provincie și va aniversa, în luna decembrie, 10 ani de activitate. BNI FORTE își dorește să contribuie la schimbarea modului în care oamenii fac afaceri în Cluj-Napoca și în județ.",
  group_link: "https://bniromania.ro",
  event_title: "ZIUA INVITATULUI",
  event_body:
    "ZIUA INVITATULUI este un eveniment de business networking organizat de grupul BNI FORTE pentru mediul de afaceri din județul Cluj și din regiune. Evenimentul este o oportunitate de a-ți extinde sfera de contacte, de a interacționa cu profesioniști din diverse domenii de activitate și de a construi relații profesionale care pot contribui la dezvoltarea afacerii tale.",
  power_team_title: "Ce este un Power Team?",
  power_team_body:
    "Un Power Team este un grup de profesioniști din domenii de activitate complementare, care se adresează acelorași tipuri de clienți și își pot genera reciproc recomandări și oportunități de afaceri.",
  domains: ["Domeniu 1", "Domeniu 2", "Domeniu 3"],
  pillars: [
    { title: "Networking structurat", desc: "cadru pentru dezvoltarea relațiilor de afaceri" },
    { title: "Construirea relațiilor", desc: "relații care să permită recomandări" },
    { title: "Recomandări", desc: "o ușă deschisă către clientul dorit" },
  ],
};

const PILLAR_ICONS = [Network, Users, Handshake];

export function ForteAbout({ data }: { data?: Partial<AboutContent> | null }) {
  const d = { ...FALLBACK, ...data } as typeof FALLBACK;

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Despre"
          title="Despre BNI Forte și eveniment"
          description="Cea mai veche comunitate de networking de business din provincie."
        />

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-16">
          {/* BNI Forte group */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">{d.group_title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{d.group_body}</p>
            {d.group_link && (
              <a
                href={d.group_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Vezi site-ul BNI Forte
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Event */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">{d.event_title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{d.event_body}</p>
          </div>
        </div>

        {/* Power Team */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-surface p-6 md:mt-16 md:p-10">
          <h3 className="text-lg font-bold tracking-tight text-foreground">{d.power_team_title}</h3>
          <p className="mt-3 text-base leading-relaxed text-muted">{d.power_team_body}</p>

          {d.domains && d.domains.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Domenii vizate</p>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {d.domains.map((dom, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {dom}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Pillars */}
        {d.pillars && d.pillars.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {d.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
              return (
                <div key={i} className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-foreground">{pillar.title}</h4>
                  <p className="text-sm text-muted">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
