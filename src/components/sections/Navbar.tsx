"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "#stats", label: "Despre", shortLabel: "Despre" },
  { href: "#membrii", label: "Membrii", shortLabel: "Membrii" },
  { href: "#agenda", label: "Agendă", shortLabel: "Agendă" },
  { href: "#tickets", label: "Bilete", shortLabel: "Bilete" },
  { href: "#location", label: "Locația", shortLabel: "Locația" },
  { href: "#faq", label: "FAQ", shortLabel: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500 ease-out",
        scrolled
          ? "border-b border-border bg-white/80 py-1.5 backdrop-blur-xl md:py-3"
          : "border-b border-transparent bg-transparent py-2 md:py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        <a href="#hero" aria-label="BNI Prime — pagina principală">
          <Image
            src="/HEADER.png"
            alt="BNI Prime"
            width={300}
            height={100}
            className="h-10 w-auto object-contain md:h-16"
            priority
          />
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Navigare principală">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-primary"
            >
              {link.shortLabel}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <a href="#tickets">Înscrie-te acum</a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Deschide meniul de navigare"
              className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface md:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <Image
                  src="/HEADER.png"
                  alt="BNI Prime"
                  width={200}
                  height={80}
                  className="h-10 w-auto object-contain"
                />
              </SheetTitle>
            </SheetHeader>
            <nav
              className="flex flex-col gap-2 px-6"
              aria-label="Navigare mobilă"
            >
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface hover:text-primary"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto px-6 pb-8">
              <SheetClose asChild>
                <Button asChild className="h-12 w-full text-base">
                  <a href="#tickets">Înscrie-te acum</a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
