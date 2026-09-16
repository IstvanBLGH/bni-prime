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

export default async function Home() {
  let hero: Partial<HeroContent> | undefined;
  let about: Partial<AboutContent> | undefined;
  let members: TeamMember[] | undefined;
  let agendaItems: AgendaItem[] | undefined;
  let tickets: Ticket[] | undefined;
  let location: Partial<LocationContent> | undefined;
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
      if (h.data) hero = h.data as Partial<HeroContent>;
      if (ab.data) about = ab.data as Partial<AboutContent>;
      if (m.data?.length) members = m.data as TeamMember[];
      if (a.data?.length) agendaItems = a.data as AgendaItem[];
      if (t.data?.length) tickets = t.data as Ticket[];
      if (l.data) location = l.data as Partial<LocationContent>;
      if (f.data?.length) faqItems = f.data as FaqItem[];
      if (te.data?.length) testimonials = te.data as Testimonial[];
      if (c.data) contact = c.data as Partial<ContactInfo>;
    } catch {
      // Supabase not configured — components use fallback data
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
