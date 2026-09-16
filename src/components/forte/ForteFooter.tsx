"use client";

import { Facebook, Mail, Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";
import type { ContactInfo } from "@/types/db";

const NAV_LINKS = [
  { href: "#about", label: "Despre" },
  { href: "#team", label: "Echipa" },
  { href: "#agenda", label: "Agendă" },
  { href: "#tickets", label: "Bilete" },
  { href: "#location", label: "Locația" },
  { href: "#faq", label: "FAQ" },
];

const FALLBACK: Partial<ContactInfo> = {
  email: "bigdesigntm@gmail.com",
  phone: "+40 770 987 977",
  facebook_url: "https://www.facebook.com/BNI-Cluj",
  operator_name: "BIG DESIGN TM S.R.L.",
  cui: "39578361",
  address: "Str. Grănicerilor, nr. 3, Bistrița",
};

export function ForteFooter({ contact, logoUrl, name = "Forte", description, privacyPath, termsPath }: {
  contact?: Partial<ContactInfo> | null;
  logoUrl?: string | null;
  name?: string;
  description?: string;
  privacyPath?: string;
  termsPath?: string;
}) {
  const c = { ...FALLBACK, ...contact };
  const defaultDesc = name === "Prime"
    ? "BNI PRIME este un grup de business networking activ în Bistrița. Grupul funcționează după filozofia Dăruind vei dobândi și își propune să schimbe modul în care oamenii fac afaceri în județul Bistrița-Năsăud."
    : "BNI FORTE este cel mai vechi grup de business networking din provincie. Grupul funcționează după filozofia Dăruind vei dobândi și își propune să schimbe modul în care oamenii fac afaceri în județul Cluj.";

  return (
    <footer className="border-t border-border bg-surface py-16 md:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            {logoUrl ? (
              name === "Prime" ? (
                <div className="relative h-[62px] w-[180px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoUrl} alt={`BNI ${name}`} className="absolute inset-0 h-full w-full object-contain scale-[2.2] origin-center" />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={`BNI ${name}`} className="h-[62px] w-auto object-contain" />
              )
            ) : (
              <span className="text-xl font-extrabold tracking-tight text-foreground">
                BNI <span className="text-primary">{name}</span>
              </span>
            )}
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {description ?? defaultDesc}
            </p>
            {c.facebook_url && (
              <a href={c.facebook_url} target="_blank" rel="noopener noreferrer"
                aria-label="Facebook BNI Cluj"
                className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-muted transition-colors duration-300 hover:bg-primary hover:text-white">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigare</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {c.email && (
                <li>
                  <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {c.email}
                  </a>
                </li>
              )}
              {c.phone && (
                <li>
                  <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {c.phone}
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-6">
              <p className="text-xs font-semibold text-foreground">Operator</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {c.operator_name}<br />
                CUI {c.cui}<br />
                {c.address}
              </p>
            </div>
          </div>
        </div>

        {/* ANPC */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
          <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="nofollow noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sal.svg" alt="SAL" width={220} style={{ display: "inline-block" }} />
          </a>
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="nofollow noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sol.svg" alt="SOL" width={220} style={{ display: "inline-block" }} />
          </a>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p>© 2026 BNI {name}. Toate drepturile rezervate.</p>
            <p>
              Site dezvoltat de{" "}
              <a href="https://solergo.ro" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">Solergo</a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href={privacyPath ?? "/forte/politica-de-confidentialitate"} className="transition-colors hover:text-primary">Politica de confidențialitate</a>
            <a href={termsPath ?? "/forte/termeni-si-conditii"} className="transition-colors hover:text-primary">Termeni și condiții</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
