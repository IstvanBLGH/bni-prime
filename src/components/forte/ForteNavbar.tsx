"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#about", label: "Despre" },
  { href: "#team", label: "Echipa" },
  { href: "#agenda", label: "Agendă" },
  { href: "#tickets", label: "Bilete" },
  { href: "#location", label: "Locația" },
  { href: "#faq", label: "FAQ" },
];

export function ForteNavbar({ logoUrl }: { logoUrl?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 md:py-5">
        <a href="#hero" className="flex items-center gap-2">
          {logoUrl ? (
            <Image src={logoUrl} alt="BNI Forte" width={160} height={54} className="h-10 w-auto object-contain" />
          ) : (
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              BNI <span className="text-primary">Forte</span>
            </span>
          )}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button size="sm" asChild>
            <a href="#tickets">Înscrie-te acum</a>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Meniu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background/98 px-4 pb-6 md:hidden">
          <nav className="mt-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-surface"
              >
                {link.label}
              </button>
            ))}
            <Button className="mt-3 w-full" asChild>
              <a href="#tickets" onClick={() => setMobileOpen(false)}>
                Înscrie-te acum
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
