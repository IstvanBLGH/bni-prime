"use client";

import { ExternalLink, Network, Users, Handshake } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { AboutContent } from "@/types/db";

const FALLBACK: Partial<AboutContent> = {
  group_title: "BNI FORTE",
  group_body:
    "De 10 ani, BNI FORTE aduce împreună antreprenori care cred în puterea colaborării și în relațiile construite pe încredere. Sub filosofia „Dăruind vei dobândi”, am crescut o comunitate în care recomandările deschid oportunități, iar oamenii se sprijină reciproc în dezvoltarea afacerilor. Anul acesta, aniversarea noastră devine un prilej de sărbătoare pentru întreaga comunitate BNI din regiune. Îi aducem alături pe cei care au contribuit la povestea FORTE și pe cei cu care vom scrie următoarele capitole.",
  group_link: "https://bniromania.ro",
  event_title: "CHRISTMAS PARTY",
  event_body:
    "BNI FORTE te invită să încheiem anul împreună, într-o seară dedicată oamenilor și relațiilor care dau valoare comunității noastre. Christmas Party reunește membri BNI din regiune și invitații lor, într-o atmosferă festivă, cu muzică, voie bună, speed-networking și timp pentru conversații. Ne revedem cu partenerii, cunoaștem oameni din alte grupuri și sărbătorim împreună reușitele anului. Iar această întâlnire are o semnificație aparte: aniversăm 10 ani de BNI FORTE, alături de comunitatea din care facem parte.\n\nVino să sărbătorim și să ne cunoaștem mai bine!",
  power_team_title: "Ce este BNI?",
  power_team_body:
    "BNI este o organizație internațională de business networking care îi ajută pe antreprenori și profesioniști să își dezvolte afacerile prin recomandări și relații de încredere. Membrii se întâlnesc regulat, își cunosc activitatea și identifică oportunități de colaborare, devenind o sursă de sprijin și conexiuni pentru ceilalți. La baza BNI stă filosofia „Dăruind vei dobândi”: atunci când îi ajuți pe ceilalți să reușească, construiești relații care contribuie și la propria dezvoltare. Evenimentele regionale aduc această comunitate împreună și deschid oportunitatea de a cunoaște oameni și de a construi parteneriate dincolo de propriul grup.",
  domains: [],
  pillars: [
    { title: "Networking structurat", desc: "cadru pentru dezvoltarea relațiilor de afaceri" },
    { title: "Construirea relațiilor", desc: "relații care să permită recomandări" },
    { title: "Recomandări", desc: "o ușă deschisă către clientul dorit" },
  ],
};

const PILLAR_ICONS = [Network, Users, Handshake];

export function ForteAbout({
  data,
  title = "Despre BNI Forte și eveniment",
  description = "Cea mai veche comunitate de business networking din provincie.",
  linkLabel = "Vezi site-ul BNI Forte",
}: {
  data?: Partial<AboutContent> | null;
  title?: string;
  description?: string;
  linkLabel?: string;
}) {
  const d = { ...FALLBACK, ...data } as typeof FALLBACK;
  const hasPowerTeam = Boolean(d.power_team_title || d.power_team_body || d.domains?.length);

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Despre"
          title={title}
          description={description}
        />

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-16">
          {/* BNI Forte group */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">{d.group_title}</h3>
            <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted">{d.group_body}</p>
            {d.group_link && (
              <a
                href={d.group_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {linkLabel}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Event */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">{d.event_title}</h3>
            <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted">{d.event_body}</p>
          </div>
        </div>

        {/* Power Team: hidden when admin left it empty */}
        {hasPowerTeam && (
          <div className="mt-12 rounded-2xl border border-primary/20 bg-surface p-6 md:mt-16 md:p-10">
            {d.power_team_title && <h3 className="text-lg font-bold tracking-tight text-foreground">{d.power_team_title}</h3>}
            {d.power_team_body && <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted">{d.power_team_body}</p>}

            {d.domains && d.domains.length > 0 && (
              <div className="mt-6">
                <p className="text-lg font-bold tracking-tight text-primary">Domenii vizate</p>
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {d.domains.map((dom, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span className="whitespace-pre-line">{dom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

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
