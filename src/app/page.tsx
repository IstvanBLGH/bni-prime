import { createClient } from "@/lib/supabase/server";
import type {
  HeroContent, AboutContent, TeamMember, AgendaItem,
  Ticket, LocationContent, FaqItem, Testimonial, ContactInfo,
} from "@/types/db";

import { ForteNavbar } from "@/components/forte/ForteNavbar";
import { ForteHero } from "@/components/forte/ForteHero";
import { ForteAbout } from "@/components/forte/ForteAbout";
import { ForteTeam } from "@/components/forte/ForteTeam";
import { ForteAgenda } from "@/components/forte/ForteAgenda";
import { ForteTickets } from "@/components/forte/ForteTickets";
import { ForteLocation } from "@/components/forte/ForteLocation";
import { ForteFAQ } from "@/components/forte/ForteFAQ";
import { ForteTestimonials } from "@/components/forte/ForteTestimonials";
import { ForteFooter } from "@/components/forte/ForteFooter";

export const revalidate = 60;

// Shown on Prime page when admin hasn't filled in data yet
const PRIME_HERO: Partial<HeroContent> = {
  badge: "Eveniment de business networking",
  title: "ZIUA INVITATULUI",
  date_text: "",
  city: "Bistrita",
  description: "BNI Prime te invita la Ziua Invitatului - evenimentul de business networking deschis tuturor antreprenorilor si oamenilor de afaceri din regiune.",
  image_url: null,
};

const PRIME_ABOUT: Partial<AboutContent> = {
  group_title: "BNI PRIME",
  group_body: "BNI Prime este un grup de business networking activ in Bistrita.",
  group_link: "https://bniromania.ro",
  event_title: "ZIUA INVITATULUI",
  event_body: "Ziua Invitatului este evenimentul deschis publicului, organizat de grupul BNI Prime. O oportunitate de a cunoaste profesionisti din diverse domenii si de a construi relatii de afaceri.",
  power_team_title: "Ce este un Power Team?",
  power_team_body: "Un Power Team este un grup de profesionisti din domenii complementare care pot genera reciproc recomandari si oportunitati de afaceri.",
  pillars: [
    { title: "Networking structurat", desc: "cadru pentru dezvoltarea relatiilor de afaceri" },
    { title: "Construirea relatiilor", desc: "relatii care sa permita recomandari" },
    { title: "Recomandari", desc: "o usa deschisa catre clientul dorit" },
  ],
};

const PRIME_LOCATION: Partial<LocationContent> = {
  venue_name: "Locatia evenimentului",
  address: "Bistrita",
  description: "Evenimentul organizat de grupul BNI Prime.",
  has_parking: true,
  maps_link: "",
};

export default async function Home() {
  let hero: Partial<HeroContent> = PRIME_HERO;
  let about: Partial<AboutContent> = PRIME_ABOUT;
  let location: Partial<LocationContent> = PRIME_LOCATION;
  let members: TeamMember[] | undefined;
  let agendaItems: AgendaItem[] | undefined;
  let tickets: Ticket[] | undefined;
  let faqItems: FaqItem[] | undefined;
  let testimonials: Testimonial[] | undefined;
  let contact: Partial<ContactInfo> | undefined;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient();
      const [h, ab, m, a, t, l, f, te, c] = await Promise.all([
        supabase.from("hero_content").select("*").eq("event_slug", "prime").single(),
        supabase.from("about_content").select("*").eq("event_slug", "prime").single(),
        supabase.from("team_members").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("agenda_items").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("tickets").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("location_content").select("*").eq("event_slug", "prime").single(),
        supabase.from("faq_items").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("testimonials").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("contact_info").select("*").eq("event_slug", "prime").single(),
      ]);
      // Objects: merge DB data over Prime defaults
      if (h.data) hero = { ...PRIME_HERO, ...h.data };
      if (ab.data) about = { ...PRIME_ABOUT, ...ab.data };
      if (l.data) location = { ...PRIME_LOCATION, ...l.data };
      // Arrays: explicit [] = "Supabase checked, no data" → components hide section
      members = (m.data as TeamMember[]) ?? [];
      agendaItems = (a.data as AgendaItem[]) ?? [];
      tickets = (t.data as Ticket[]) ?? [];
      faqItems = (f.data as FaqItem[]) ?? [];
      testimonials = (te.data as Testimonial[]) ?? [];
      if (c.data) contact = c.data as Partial<ContactInfo>;
    } catch {
      // Supabase not reachable — components use Prime defaults/undefined
    }
  }

  return (
    <>
      <ForteNavbar />
      <main>
        <ForteHero data={hero} />
        <ForteAbout data={about} />
        <ForteTeam members={members} />
        <ForteAgenda items={agendaItems} />
        <ForteTickets tickets={tickets} paymentEndpoint="/api/netopia/start" />
        <ForteLocation data={location} />
        <ForteFAQ items={faqItems} />
        <ForteTestimonials items={testimonials} />
      </main>
      <ForteFooter contact={contact} />
    </>
  );
}
