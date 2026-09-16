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

export const metadata = {
  title: "Ziua Invitatului — BNI Forte Cluj-Napoca",
  description:
    "BNI FORTE te invită la evenimentul de business networking ZIUA INVITATULUI, 29 septembrie 2026, Cluj-Napoca.",
};

async function getForteData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { data: activeTeam } = await supabase
      .from("power_teams").select("id").eq("event_slug", "forte").eq("is_active", true).single();

    const [
      { data: hero },
      { data: about },
      { data: team },
      { data: agenda },
      { data: tickets },
      { data: location },
      { data: faq },
      { data: testimonials },
      { data: contact },
    ] = await Promise.all([
      supabase.from("hero_content").select("*").eq("event_slug", "forte").single(),
      supabase.from("about_content").select("*").eq("event_slug", "forte").single(),
      activeTeam
        ? supabase.from("team_members").select("*").eq("power_team_id", activeTeam.id).order("sort_order")
        : supabase.from("team_members").select("*").eq("event_slug", "forte").order("sort_order"),
      supabase.from("agenda_items").select("*").eq("event_slug", "forte").order("sort_order"),
      supabase.from("tickets").select("*").eq("event_slug", "forte").eq("is_available", true).order("sort_order"),
      supabase.from("location_content").select("*").eq("event_slug", "forte").single(),
      supabase.from("faq_items").select("*").eq("event_slug", "forte").order("sort_order"),
      supabase.from("testimonials").select("*").eq("event_slug", "forte").order("sort_order"),
      supabase.from("contact_info").select("*").eq("event_slug", "forte").single(),
    ]);

    return { hero, about, team, agenda, tickets, location, faq, testimonials, contact };
  } catch {
    return null;
  }
}

export default async function FortePage() {
  const data = await getForteData();

  return (
    <>
      <ForteNavbar />
      <main>
        <ForteHero data={data?.hero} />
        <ForteAbout data={data?.about} />
        <ForteTeam members={data?.team ?? []} />
        <ForteAgenda items={data?.agenda ?? []} />
        <ForteTickets tickets={data?.tickets ?? []} />
        <ForteLocation data={data?.location} />
        <ForteFAQ items={data?.faq ?? []} />
        <ForteTestimonials items={data?.testimonials ?? []} />
      </main>
      <ForteFooter contact={data?.contact} />
    </>
  );
}
