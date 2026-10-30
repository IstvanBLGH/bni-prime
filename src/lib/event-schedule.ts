import { cache } from "react";
import type { EventSlug } from "@/types/db";
import { resolveSchedule, FALLBACK_SCHEDULE, type EventSchedule } from "@/lib/event-date";

// Server-only: reads the event date/time set in admin (hero_content).
// Uses a cookie-less client so it also works in route handlers and metadata.
export const getEventSchedule = cache(async (slug: EventSlug): Promise<EventSchedule> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return FALLBACK_SCHEDULE[slug];

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    // select("*") keeps working before the event_date/event_time migration has run.
    const { data } = await supabase.from("hero_content").select("*").eq("event_slug", slug).single();
    return resolveSchedule(slug, data);
  } catch {
    return FALLBACK_SCHEDULE[slug];
  }
});
