export type EventSlug = "prime" | "forte";

export interface HeroContent {
  id: string;
  event_slug: EventSlug;
  badge: string;
  title: string;
  date_text: string;
  city: string;
  description: string;
  image_url: string | null;
}

export interface AboutContent {
  id: string;
  event_slug: EventSlug;
  group_title: string;
  group_body: string;
  group_link: string;
  event_title: string;
  event_body: string;
  power_team_title: string;
  power_team_body: string;
  domains: string[];
  pillars: { title: string; desc: string }[];
}

export interface TeamMember {
  id: string;
  event_slug: EventSlug;
  name: string;
  role: string;
  company: string;
  website: string;
  phone: string;
  photo_url: string;
  sort_order: number;
}

export interface AgendaItem {
  id: string;
  event_slug: EventSlug;
  time_range: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface Ticket {
  id: string;
  event_slug: EventSlug;
  name: string;
  label: string;
  price: number;
  description: string;
  features: string[];
  is_available: boolean;
  max_quantity: number | null;
  sort_order: number;
}

export interface LocationContent {
  id: string;
  event_slug: EventSlug;
  venue_name: string;
  address: string;
  description: string;
  has_parking: boolean;
  maps_embed_url: string;
  maps_link: string;
}

export interface FaqItem {
  id: string;
  event_slug: EventSlug;
  question: string;
  answer: string;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  event_slug: EventSlug;
  name: string;
  quote: string;
  sort_order: number;
}

export interface ContactInfo {
  id: string;
  event_slug: EventSlug;
  email: string;
  phone: string;
  facebook_url: string;
  operator_name: string;
  cui: string;
  address: string;
}
