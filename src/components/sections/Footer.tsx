"use client";

import Image from "next/image";
import { Facebook, Mail, Phone } from "lucide-react";
import NTPLogo from "ntp-logo-react";

import { Container } from "@/components/shared/Container";

const NAV_LINKS = [
  { href: "#about", label: "Despre" },
  { href: "#membrii", label: "Membrii" },
  { href: "#agenda", label: "Agendă" },
  { href: "#tickets", label: "Bilete" },
  { href: "#location", label: "Locația" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-16 md:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <a href="#hero">
              <Image src="/HEADER.png" alt="BNI Prime" width={200} height={67} className="h-12 w-auto object-contain" />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              BNI Prime este primul grup de business networking din județul Bistrița-Năsăud.
              Grupul funcționează după filozofia Dăruind vei dobândi și își propune să
              schimbe modul în care oamenii fac afaceri în județul Bistrița-Năsăud.
            </p>
            <a
              href="https://www.facebook.com/people/BNI-Bistri%C8%9Ba-N%C4%83s%C4%83ud/61571400373476/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook BNI Bistrița-Năsăud"
              className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-muted transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigare</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="mailto:bigdesigntm@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-primary"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  bigdesigntm@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+40770987977"
                  className="flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-primary"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  +40 770 987 977
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs font-semibold text-foreground">Operator</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                BIG DESIGN TM S.R.L.<br />
                CUI 39578361<br />
                Str. Grănicerilor, nr. 3, Bistrița
              </p>
            </div>
          </div>
        </div>

        {/* ANPC logos */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
          <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="nofollow noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sal.svg" alt="Soluționarea Alternativă a Litigiilor" width={250} style={{ display: "inline-block" }} />
          </a>
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="nofollow noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sol.svg" alt="Soluționarea Online a Litigiilor" width={250} style={{ display: "inline-block" }} />
          </a>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p>© 2026 BNI Prime. Toate drepturile rezervate.</p>
            <p>
              Site dezvoltat de{" "}
              <a href="https://solergo.ro" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-primary">
                Solergo
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="rounded-lg bg-[#1a2e5a] px-4 py-2">
              <NTPLogo color="#ffffff" version="horizontal" secret="167104" />
            </div>
            <a href="/politica-de-confidentialitate" className="transition-colors duration-300 hover:text-primary">
              Politica de confidențialitate
            </a>
            <a href="/termeni-si-conditii" className="transition-colors duration-300 hover:text-primary">
              Termeni și condiții
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
