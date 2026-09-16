"use client";

import { useState } from "react";
import { Check, ShieldCheck, Loader2 } from "lucide-react";
import { collectBrowserInfo } from "netopia-card";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Ticket } from "@/types/db";

const FALLBACK_TICKET: Ticket = {
  id: "forte-standard",
  event_slug: "forte",
  name: "Standard",
  label: "1 bilet",
  price: 175,
  description: "Acces la evenimentul de networking BNI FORTE Ziua Invitatului.",
  features: [
    "Acces la eveniment",
    "Ecusonul de participant",
    "Sesiuni de speed networking",
    "Orientare BNI pentru invitați",
    "Networking deschis",
    "Email cu concluzii post-eveniment",
  ],
  is_available: true,
  max_quantity: null,
  sort_order: 1,
};

const CUM_AI_AFLAT = ["Facebook", "Instagram", "Recomandare", "Email", "Altă sursă"];

function RegistrationModal({ open, onOpenChange, ticket, paymentEndpoint }: { open: boolean; onOpenChange: (v: boolean) => void; ticket: Ticket; paymentEndpoint: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const browserInfo = collectBrowserInfo(navigator, window);
      const res = await fetch(paymentEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          cui: data.get("cui"),
          sursa: data.get("sursa") || "",
          browserInfo,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Eroare la inițierea plății.");
      if (json.payment?.paymentURL) {
        window.location.href = json.payment.paymentURL;
      } else {
        throw new Error("URL de plată lipsă în răspuns.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută.");
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-7 py-8 sm:px-10">
        <DialogHeader>
          <DialogTitle>Rezervă-ți locul la Ziua Invitatului</DialogTitle>
          <DialogDescription>
            Completează formularul și plătești securizat cu cardul. Locul este rezervat după confirmarea plății.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Bilet {ticket.name} — {ticket.price} RON / persoană</p>
        </div>

        <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          {[
            { id: "name", label: "Nume complet", type: "text", placeholder: "Ion Popescu", required: true },
            { id: "email", label: "Email", type: "email", placeholder: "ion.popescu@email.com", required: true },
            { id: "phone", label: "Număr de telefon", type: "tel", placeholder: "+40 7XX XXX XXX", required: true },
          ].map((f) => (
            <div key={f.id} className="flex flex-col gap-1.5">
              <label htmlFor={`forte-${f.id}`} className="text-xs font-semibold uppercase tracking-wide text-foreground">{f.label}</label>
              <input id={`forte-${f.id}`} name={f.id} type={f.type} required={f.required} placeholder={f.placeholder}
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="forte-cui" className="text-xs font-semibold uppercase tracking-wide text-foreground">
              CUI / CNP <span className="font-normal normal-case text-muted">(pentru factură)</span>
            </label>
            <input id="forte-cui" name="cui" type="text" placeholder="RO12345678 sau CNP"
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="forte-sursa" className="text-xs font-semibold uppercase tracking-wide text-foreground">Cum ai aflat?</label>
            <select id="forte-sursa" name="sursa" defaultValue=""
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="" disabled>Alege...</option>
              {CUM_AI_AFLAT.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          <Button type="submit" size="lg" className="mt-2 h-12 w-full text-base" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Se procesează...</span>
            ) : (
              `Plătește ${ticket.price} lei →`
            )}
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

export function ForteTickets({ tickets, paymentEndpoint = "/api/forte/netopia/start" }: { tickets?: Ticket[]; paymentEndpoint?: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const ticket = tickets && tickets.length > 0 ? tickets[0] : FALLBACK_TICKET;

  if (!ticket.is_available) return null;

  return (
    <section id="tickets" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Bilete"
          title="Participă la Ziua Invitatului"
          description="1 singur tip de bilet — acces complet la evenimentul de networking."
        />

        <div className="mx-auto mt-12 max-w-sm md:mt-16">
          <div className="relative flex flex-col rounded-2xl border border-primary bg-background p-7 shadow-sm ring-2 ring-primary">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">{ticket.name}</h3>
            <p className="mt-2 text-sm text-muted">{ticket.description}</p>

            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight text-foreground">{ticket.price} RON</span>
              <span className="text-sm text-muted">/ persoană</span>
            </div>

            <ul className="mt-6 flex flex-col gap-2.5">
              {ticket.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <Button className="w-full" onClick={() => setModalOpen(true)}>
                Rezervă-ți locul
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <RegistrationModal open={modalOpen} onOpenChange={setModalOpen} ticket={ticket} paymentEndpoint={paymentEndpoint} />
    </section>
  );
}
