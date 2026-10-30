import { cache } from "react";
import type { EventSlug } from "@/types/db";

// Server-only: sections switched off in admin for an event. Empty = everything visible.
export const getHiddenSections = cache(async (slug: EventSlug): Promise<string[]> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data } = await supabase.from("section_settings").select("hidden_sections").eq("event_slug", slug).single();
    return Array.isArray(data?.hidden_sections) ? data.hidden_sections : [];
  } catch {
    // Table not created yet: show everything.
    return [];
  }
});
