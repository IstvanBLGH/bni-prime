"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { staggerItem, fadeInUp } from "@/lib/motion";

type TicketType = "standard" | "plus" | "sponsor";

const TICKETS = [
  {
    id: "standard" as TicketType,
    name: "Standard",
    price: 175,
    priceLabel: "175 RON",
    description: "Acces complet la eveniment.",
    featured: false,
    availability: null,
    features: [
      "Acces la eveniment",
      "Catering inclus",
    ],
  },
  {
    id: "plus" as TicketType,
    name: "Plus",
    price: 500,
    priceLabel: "500 RON",
    description: "Acces la eveniment și stand de prezentare.",
    featured: true,
    availability: "5 pachete disponibile",
    features: [
      "Acces la eveniment",
      "Catering inclus",
      "Stand pentru prezentarea serviciilor / produselor",
    ],
  },
  {
    id: "sponsor" as TicketType,
    name: "Sponsor",
    price: null,
    priceLabel: "La cerere",
    description: "Vizibilitate maximă pentru brandul tău.",
    featured: false,
    availability: "1 pachet disponibil",
    features: [
      "Acces la eveniment",
      "Catering inclus",
      "Stand pentru prezentarea serviciilor / produselor",
      "Mențiune specială în deschiderea oficială",
      "Logo vizibil pe toate materialele evenimentului",
    ],
  },
];

const CUM_AI_AFLAT_OPTIONS = [
  "Facebook",
  "Instagram",
  "Recomandare",
  "Email",
  "Altă sursă",
];

const NR_BILETE_OPTIONS = ["1 bilet", "2 bilete", "3 bilete", "4 bilete", "5+ bilete"];

export function Tickets() {
  const [selected, setSelected] = useState<TicketType>("standard");

  const selectedTicket = TICKETS.find((t) => t.id === selected)!;

  return (
    <section id="tickets" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Bilete"
          title="Alege biletul potrivit pentru tine și afacerea ta"
          description="Ai la dispoziție 3 variante de a participa la eveniment, în funcție de cât de implicat vrei să fii."
        />

        {/* Ticket cards */}
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {TICKETS.map((ticket, i) => (
            <motion.button
              key={ticket.id}
              type="button"
              onClick={() => setSelected(ticket.id)}
              {...staggerItem(i)}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-background p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                selected === ticket.id
                  ? "border-primary ring-2 ring-primary"
                  : "border-border"
              )}
            >
              {ticket.availability && (
                <Badge
                  variant={ticket.featured ? "default" : "secondary"}
                  className="absolute -top-3 left-6"
                >
                  {ticket.availability}
                </Badge>
              )}

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {ticket.name}
                </h3>
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    selected === ticket.id
                      ? "border-primary bg-primary"
                      : "border-border bg-background"
                  )}
                  aria-hidden="true"
                >
                  {selected === ticket.id && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">{ticket.description}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-foreground">
                  {ticket.priceLabel}
                </span>
                {ticket.price && (
                  <span className="text-sm text-muted">/ persoană</span>
                )}
              </div>

              <ul className="mt-5 flex flex-col gap-2.5">
                {ticket.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.button>
          ))}
        </div>

        {/* Registration form */}
        <motion.div
          {...fadeInUp}
          className="mx-auto mt-10 max-w-xl rounded-3xl border border-border bg-background p-8 shadow-sm md:mt-12"
        >
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            Rezervă-ți locul la Prime Summer
          </h3>
          <p className="mt-1 text-sm text-muted">
            Completează formularul și plătești securizat cu cardul. Locurile sunt rezervate în
            urma confirmării plății.
          </p>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Plata cu cardul prin Netopia Payments va fi activată în curând. Te vom notifica!");
            }}
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Nume complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ion Popescu"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="ion.popescu@email.com"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Număr de telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+40 7XX XXX XXX"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="cui" className="text-xs font-semibold uppercase tracking-wide text-foreground">
                CUI / CNP <span className="font-normal normal-case text-muted">(pentru factură)</span>
              </label>
              <input
                id="cui"
                name="cui"
                type="text"
                placeholder="RO12345678 sau CNP"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bilete" className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Număr bilete
                </label>
                <select
                  id="bilete"
                  name="bilete"
                  defaultValue="1 bilet"
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {NR_BILETE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="sursa" className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Cum ai aflat?
                </label>
                <select
                  id="sursa"
                  name="sursa"
                  defaultValue=""
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="" disabled>Alege o opțiune...</option>
                  {CUM_AI_AFLAT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected ticket summary */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Pachet selectat
              </p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">
                  {selectedTicket.name}
                </p>
                <p className="text-lg font-bold text-foreground">
                  {selectedTicket.priceLabel}
                  {selectedTicket.price && (
                    <span className="ml-1 text-sm font-normal text-muted">/ persoană</span>
                  )}
                </p>
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-2 h-12 w-full text-base">
              {selectedTicket.price
                ? `Plătește ${selectedTicket.price} lei →`
                : "Contactează-ne pentru pachetul Sponsor →"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Plăți securizate prin Netopia Payments. Acceptăm Visa, Mastercard, Maestro.
            </div>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
