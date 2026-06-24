"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/motion";

const TICKETS = [
  {
    name: "Standard",
    price: "250",
    description: "Pentru cei care vin la prima lor experiență de networking BNI.",
    featured: false,
    features: [
      "Acces complet la eveniment",
      "Welcome coffee & prânz incluse",
      "Acces la toate sesiunile și panelurile",
      "Material informativ BNI Prime",
    ],
  },
  {
    name: "Plus",
    price: "400",
    description: "Experiența completă de networking business, cu acces prioritar.",
    featured: true,
    features: [
      "Tot ce include pachetul Standard",
      "Loc preferențial în primele rânduri",
      "Acces la sesiunile 1:1 de networking structurat",
      "Recap foto & video personalizat",
      "Coffee break premium",
    ],
  },
  {
    name: "Sponsor",
    price: "2.000",
    description: "Vizibilitate maximă pentru brandul tău în fața comunității BNI Prime.",
    featured: false,
    features: [
      "Tot ce include pachetul Plus",
      "Logo vizibil pe toate materialele evenimentului",
      "Stand dedicat în zona de networking",
      "Mențiune specială în deschiderea oficială",
      "5 invitații suplimentare pentru echipa ta",
    ],
  },
];

export function Tickets() {
  return (
    <section id="tickets" className="bg-surface py-16 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          kicker="Bilete"
          title="Alege pachetul tău pentru eveniment"
          description="Trei moduri de a participa la evenimentul organizat de BNI Prime, în funcție de cât de implicat vrei să fii."
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {TICKETS.map((ticket, i) => (
            <motion.div
              key={ticket.name}
              {...staggerItem(i)}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-background p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl",
                ticket.featured
                  ? "border-primary ring-2 ring-primary md:scale-[1.03]"
                  : "border-border"
              )}
            >
              {ticket.featured && (
                <Badge className="absolute -top-3 left-8">Recomandat</Badge>
              )}

              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {ticket.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {ticket.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {ticket.price}
                </span>
                <span className="text-base font-medium text-muted">RON</span>
              </div>

              <ul className="mt-8 flex flex-col gap-3">
                {ticket.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={ticket.featured ? "default" : "outline"}
                className="mt-8 h-12 w-full text-base"
              >
                <a
                  href={`mailto:inscrieri@bniprime.ro?subject=${encodeURIComponent(
                    `Înscriere BNI Prime — pachet ${ticket.name}`
                  )}`}
                >
                  Alege pachetul {ticket.name}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
