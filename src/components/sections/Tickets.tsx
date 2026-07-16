"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/motion";

type TicketType = "standard" | "plus";

const TICKETS = [
  {
    id: "standard" as TicketType,
    name: "Standard",
    price: 175,
    priceLabel: "175 RON",
    description: "Acces complet la eveniment.",
    featured: false,
    availability: null,
    inheritsFrom: null,
    baseFeatures: [],
    extraFeatures: ["Acces la eveniment", "Catering inclus"],
  },
  {
    id: "plus" as TicketType,
    name: "Plus",
    price: 500,
    priceLabel: "500 RON",
    description: "Acces la eveniment și stand de prezentare.",
    featured: true,
    availability: "5 pachete disponibile",
    inheritsFrom: "Standard",
    baseFeatures: ["Acces la eveniment", "Catering inclus"],
    extraFeatures: ["Stand pentru prezentarea serviciilor / produselor"],
  },
];

const NR_BILETE_OPTIONS = ["1 bilet", "2 bilete", "3 bilete", "4 bilete", "5+ bilete"];
const CUM_AI_AFLAT_OPTIONS = ["Facebook", "Instagram", "Recomandare", "Email", "Altă sursă"];

function RegistrationModal({
  open,
  onOpenChange,
  defaultTicket,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTicket: TicketType;
}) {
  const [selected, setSelected] = useState<TicketType>(defaultTicket);
  const ticket = TICKETS.find((t) => t.id === selected)!;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-7 py-8 sm:px-10">
        <DialogHeader>
          <DialogTitle>Rezervă-ți locul la Prime Summer</DialogTitle>
          <DialogDescription>
            Completează formularul și plătești securizat cu cardul. Locul este rezervat după
            confirmarea plății.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {TICKETS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelected(t.id)}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-center text-xs font-semibold transition-all duration-200",
                selected === t.id
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-foreground hover:border-primary/50"
              )}
            >
              <span className="block">{t.name}</span>
              <span
                className={cn(
                  "mt-0.5 block text-[11px] font-normal",
                  selected === t.id ? "text-white/80" : "text-muted"
                )}
              >
                {t.priceLabel}
              </span>
            </button>
          ))}
        </div>

        <form
          className="mt-5 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: POST /api/netopia/start → redirect to Netopia payment URL
            alert("Plata cu cardul prin Netopia Payments va fi configurată în curând.");
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="modal-name"
              className="text-xs font-semibold uppercase tracking-wide text-foreground"
            >
              Nume complet
            </label>
            <input
              id="modal-name"
              name="name"
              type="text"
              required
              placeholder="Ion Popescu"
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="modal-email"
              className="text-xs font-semibold uppercase tracking-wide text-foreground"
            >
              Email
            </label>
            <input
              id="modal-email"
              name="email"
              type="email"
              required
              placeholder="ion.popescu@email.com"
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="modal-phone"
              className="text-xs font-semibold uppercase tracking-wide text-foreground"
            >
              Număr de telefon
            </label>
            <input
              id="modal-phone"
              name="phone"
              type="tel"
              required
              placeholder="+40 7XX XXX XXX"
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="modal-cui"
              className="text-xs font-semibold uppercase tracking-wide text-foreground"
            >
              CUI / CNP{" "}
              <span className="font-normal normal-case text-muted">(pentru factură)</span>
            </label>
            <input
              id="modal-cui"
              name="cui"
              type="text"
              placeholder="RO12345678 sau CNP"
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="modal-bilete"
                className="text-xs font-semibold uppercase tracking-wide text-foreground"
              >
                Nr. bilete
              </label>
              <select
                id="modal-bilete"
                name="bilete"
                defaultValue="1 bilet"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {NR_BILETE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="modal-sursa"
                className="text-xs font-semibold uppercase tracking-wide text-foreground"
              >
                Cum ai aflat?
              </label>
              <select
                id="modal-sursa"
                name="sursa"
                defaultValue=""
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="" disabled>
                  Alege...
                </option>
                {CUM_AI_AFLAT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-2 h-12 w-full text-base">
            {ticket.price
              ? `Plătește ${ticket.price} lei →`
              : "Contactează-ne pentru pachetul Sponsor →"}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Plăți securizate prin Netopia Payments. Acceptăm Visa, Mastercard, Maestro.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Tickets() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketType>("standard");

  const openModal = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  return (
    <section id="tickets" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Bilete"
          title="Alege biletul potrivit pentru tine și afacerea ta"
          description="Ai la dispoziție 3 variante de a participa la eveniment, în funcție de cât de implicat vrei să fii."
        />

        <div className="mt-12 grid gap-5 md:mt-16 md:mx-auto md:max-w-2xl md:grid-cols-2">
          {TICKETS.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              {...staggerItem(i)}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-background p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl",
                ticket.featured
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

              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {ticket.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{ticket.description}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-foreground">
                  {ticket.priceLabel}
                </span>
                {ticket.price && <span className="text-sm text-muted">/ persoană</span>}
              </div>

              {/* Feature list */}
              <ul className="mt-6 flex flex-col gap-2.5">
                {/* Inherited features — shown muted to signal they're included */}
                {ticket.inheritsFrom && ticket.baseFeatures.length > 0 && (
                  <>
                    <li className="flex items-center gap-2 text-xs text-muted">
                      <span className="h-px flex-1 bg-border" aria-hidden="true" />
                      Tot ce include {ticket.inheritsFrom}
                      <span className="h-px flex-1 bg-border" aria-hidden="true" />
                    </li>
                    {ticket.baseFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-muted/50"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2 text-xs font-semibold text-primary">
                      <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
                      plus
                      <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
                    </li>
                  </>
                )}

                {/* This tier's own features — highlighted */}
                {ticket.extraFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm font-medium text-foreground"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button in its own div so mt-auto applies to spacing, not inside button */}
              <div className="mt-auto pt-6">
                <Button
                  variant={ticket.featured ? "default" : "outline"}
                  className="w-full"
                  onClick={() => openModal(ticket.id)}
                >
                  {`Rezervă pachetul ${ticket.name}`}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <RegistrationModal
        key={selectedTicket}
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultTicket={selectedTicket}
      />
    </section>
  );
}
