import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getEventSchedule } from "@/lib/event-schedule";
import { getHiddenSections } from "@/lib/section-settings";
import { sortByTeamOrder } from "@/lib/team-members";
import { formatWhen, resolveSchedule } from "@/lib/event-date";
import { EventJsonLd } from "@/components/shared/EventJsonLd";
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

export async function generateMetadata(): Promise<Metadata> {
  const when = formatWhen(await getEventSchedule("prime"), "long");
  const description = `BNI Prime te invită la Ziua Invitatului — evenimentul de business networking din Bistrița${when ? `, ${when}` : ""}.`;
  return {
    title: "Ziua Invitatului — BNI Prime Bistrița",
    description,
    openGraph: {
      title: "Ziua Invitatului — BNI Prime Bistrița",
      description,
      url: "https://bniprime.ro",
      siteName: "BNI Prime",
      images: [{ url: "/og-image.png", width: 2000, height: 2000, alt: "BNI Prime — Ziua Invitatului" }],
      locale: "ro_RO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Ziua Invitatului — BNI Prime Bistrița",
      description,
      images: ["/og-image.png"],
    },
  };
}

// Shown on Prime page when admin hasn't filled in data yet
const PRIME_HERO: Partial<HeroContent> = {
  badge: "Eveniment de business networking",
  title: "ZIUA INVITATULUI",
  date_text: "",
  event_date: null,
  event_time: null,
  city: "Bistrița",
  description: "BNI Prime te invită la Ziua Invitatului - evenimentul de business networking deschis tuturor antreprenorilor și oamenilor de afaceri din regiune.",
  image_url: "/images/hero.jpg",
};

const PRIME_ABOUT: Partial<AboutContent> = {
  group_title: "BNI PRIME",
  group_body: "BNI Prime este un grup de business networking activ în Bistrița.",
  group_link: "https://bniromania.ro",
  event_title: "ZIUA INVITATULUI",
  event_body: "Ziua Invitatului este evenimentul deschis publicului, organizat de grupul BNI Prime. O oportunitate de a cunoaște profesioniști din diverse domenii și de a construi relații de afaceri.",
  power_team_title: "Ce este un Power Team?",
  power_team_body: "Un Power Team este un grup de profesioniști din domenii complementare care pot genera reciproc recomandări și oportunități de afaceri.",
  pillars: [
    { title: "Networking structurat", desc: "cadru pentru dezvoltarea relațiilor de afaceri" },
    { title: "Construirea relațiilor", desc: "relații care să permită recomandări" },
    { title: "Recomandări", desc: "o ușă deschisă către clientul dorit" },
  ],
};

const PRIME_LOCATION: Partial<LocationContent> = {
  venue_name: "Locația evenimentului",
  address: "Bistrița",
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
      let activeTeamIds: string[] = [];
      try {
        const { data } = await supabase
          .from("power_teams").select("id").eq("event_slug", "prime").eq("is_active", true).order("sort_order");
        activeTeamIds = (data ?? []).map((t) => t.id as string);
      } catch { /* table not yet created */ }

      const [h, ab, m, a, t, l, f, te, c] = await Promise.all([
        supabase.from("hero_content").select("*").eq("event_slug", "prime").single(),
        supabase.from("about_content").select("*").eq("event_slug", "prime").single(),
        activeTeamIds.length > 0
          ? supabase.from("team_members").select("*").in("power_team_id", activeTeamIds).eq("is_active", true).order("sort_order")
          : supabase.from("team_members").select("*").eq("event_slug", "prime").eq("is_active", true).order("sort_order"),
        supabase.from("agenda_items").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("tickets").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("location_content").select("*").eq("event_slug", "prime").single(),
        supabase.from("faq_items").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("testimonials").select("*").eq("event_slug", "prime").order("sort_order"),
        supabase.from("contact_info").select("*").eq("event_slug", "prime").single(),
      ]);
      // Objects: merge DB data over Prime defaults; skip null DB values so defaults remain
      if (h.data) hero = { ...PRIME_HERO, ...h.data, image_url: h.data.image_url ?? PRIME_HERO.image_url };
      if (ab.data) about = { ...PRIME_ABOUT, ...ab.data };
      if (l.data) location = { ...PRIME_LOCATION, ...l.data };
      // Arrays: explicit [] = "Supabase checked, no data" → components hide section
      members = sortByTeamOrder(m.data as TeamMember[] | null, activeTeamIds);
      agendaItems = (a.data as AgendaItem[]) ?? [];
      tickets = (t.data as Ticket[]) ?? [];
      faqItems = (f.data as FaqItem[]) ?? [];
      testimonials = (te.data as Testimonial[]) ?? [];
      if (c.data) contact = c.data as Partial<ContactInfo>;
    } catch {
      // Supabase not reachable — components use Prime defaults/undefined
    }
  }

  const schedule = resolveSchedule("prime", hero);
  const hidden = await getHiddenSections("prime");
  const show = (key: string) => !hidden.includes(key);

  return (
    <>
      <EventJsonLd
        name="Ziua Invitatului — BNI Prime"
        schedule={schedule}
        city={hero.city || "Bistrița"}
        venue={location.venue_name}
        address={location.address}
        url="https://bniprime.ro"
        organizer="BNI Prime"
        price={tickets?.[0]?.price}
      />
      <ForteNavbar hidden={hidden} teamLabel="Membri" logoUrl="/images/Logo website BNIPRIME.png" name="Prime" zoomLogo logoOffset={26} />
      <main>
        {show("hero") && <ForteHero data={hero} hidden={hidden} brand="BNI Prime" organizer="Eveniment organizat de BNI Prime - Bistrița" />}
        {show("about") && <ForteAbout data={about} title="Despre BNI Prime și eveniment" description="Comunitatea de business networking din Bistrița." linkLabel="Vezi site-ul BNI Prime" />}
        {show("team") && <ForteTeam members={members} kicker="Membri" description="Vino să cunoști profesioniști din diverse domenii de activitate." />}
        {show("agenda") && <ForteAgenda items={agendaItems} />}
        {show("tickets") && <ForteTickets tickets={tickets} paymentEndpoint="/api/netopia/start" eventWhen={formatWhen(schedule)} />}
        {show("location") && <ForteLocation data={location} parkingLabel="Parcare gratuită la fața locului" />}
        {show("faq") && <ForteFAQ items={faqItems} />}
        {show("testimonials") && <ForteTestimonials items={testimonials} title="Ce spun membrii BNI Prime" description="Experiențele membrilor comunității BNI Prime." />}
      </main>
      <ForteFooter hidden={hidden} teamLabel="Membri" contact={contact} name="Prime" logoUrl="/images/Logo website BNIPRIME.png" logoOffset={26} privacyPath="/politica-de-confidentialitate" termsPath="/termeni-si-conditii" />
    </>
  );
}
