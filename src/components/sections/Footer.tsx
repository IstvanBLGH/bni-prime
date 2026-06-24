import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

import { Container } from "@/components/shared/Container";

const NAV_LINKS = [
  { href: "#about", label: "Despre BNI Prime" },
  { href: "#leadership", label: "Echipa de conducere" },
  { href: "#agenda", label: "Agendă" },
  { href: "#tickets", label: "Bilete" },
  { href: "#location", label: "Locație" },
  { href: "#faq", label: "Întrebări frecvente" },
];

const SOCIAL_LINKS = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook BNI Prime" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram BNI Prime" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn BNI Prime" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-16 md:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <a href="#hero" className="text-lg font-bold tracking-tight text-foreground">
              BNI <span className="text-primary">Prime</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              BNI Prime este un grup de networking business din Bistrița, parte a
              organizației BNI, care organizează acest eveniment — networking BNI
              structurat, echipa de conducere a grupului și oportunități reale pentru
              antreprenori.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-muted transition-colors duration-300 hover:bg-primary hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
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
                  href="mailto:inscrieri@bniprime.ro"
                  className="flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-primary"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  inscrieri@bniprime.ro
                </a>
              </li>
              <li>
                <a
                  href="tel:+40700000000"
                  className="flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-primary"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  +40 700 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 BNI Prime. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors duration-300 hover:text-primary">
              Politica de confidențialitate
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-primary">
              Termeni și condiții
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
