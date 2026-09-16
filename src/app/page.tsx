import { createClient } from "@/lib/supabase/server";
import type { TeamMember, AgendaItem, FaqItem, Testimonial as DBTestimonial, LocationContent } from "@/types/db";

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Leadership } from "@/components/sections/Leadership";
import { Agenda } from "@/components/sections/Agenda";
import { Tickets } from "@/components/sections/Tickets";
import { Location } from "@/components/sections/Location";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export const revalidate = 60;

export default async function Home() {
  let members: TeamMember[] | undefined;
  let agendaItems: AgendaItem[] | undefined;
  let faqItems: FaqItem[] | undefined;
  let testimonials: DBTestimonial[] | undefined;
  let location: Partial<LocationContent> | undefined;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient();
      const [m, a, f, te, l] = await Promise.all([
        supabase.from("team_members").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("agenda_items").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("faq_items").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("testimonials").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("location_content").select("*").eq("event_slug", "prime").single(),
      ]);
      if (m.data?.length) members = m.data as TeamMember[];
      if (a.data?.length) agendaItems = a.data as AgendaItem[];
      if (f.data?.length) faqItems = f.data as FaqItem[];
      if (te.data?.length) testimonials = te.data as DBTestimonial[];
      if (l.data) location = l.data as Partial<LocationContent>;
    } catch {
      // Supabase not configured — components fall back to hardcoded data
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Leadership members={members} />
        <Agenda items={agendaItems} />
        <Tickets />
        <Location data={location} />
        <FAQ items={faqItems} />
        <Testimonials items={testimonials} />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
