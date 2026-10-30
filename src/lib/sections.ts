// Page sections that can be switched off from admin (/admin/sectiuni).
// Keys match the section ids, so "#tickets" links can be filtered too.
export const SECTIONS = [
  { key: "hero", label: "Hero (prima secțiune)" },
  { key: "about", label: "Despre eveniment" },
  { key: "team", label: "Echipa / Power Team" },
  { key: "agenda", label: "Agenda" },
  { key: "tickets", label: "Bilete" },
  { key: "location", label: "Locația" },
  { key: "faq", label: "Întrebări frecvente (FAQ)" },
  { key: "testimonials", label: "Testimoniale" },
] as const;

export type SectionKey = (typeof SECTIONS)[number]["key"];

/** Drops in-page links ("#agenda") that point to a hidden section. */
export function visibleLinks<T extends { href: string }>(links: T[], hidden: string[] = []) {
  return links.filter((l) => !(l.href.startsWith("#") && hidden.includes(l.href.slice(1))));
}
