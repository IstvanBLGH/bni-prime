"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Check } from "lucide-react";
import { SECTIONS } from "@/lib/sections";
import type { EventSlug } from "@/types/db";

const EVENTS: { slug: EventSlug; name: string; url: string }[] = [
  { slug: "prime", name: "BNI Prime", url: "/" },
  { slug: "forte", name: "BNI Forte", url: "/forte" },
];

function EventSections({ slug, name, url }: { slug: EventSlug; name: string; url: string }) {
  const [hidden, setHidden] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("section_settings").select("hidden_sections").eq("event_slug", slug).maybeSingle()
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else if (Array.isArray(data?.hidden_sections)) setHidden(data.hidden_sections);
        setLoading(false);
      });
  }, [slug]);

  function toggle(key: string, visible: boolean) {
    setHidden((h) => (visible ? h.filter((k) => k !== key) : [...h, key]));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase
      .from("section_settings")
      .upsert({ event_slug: slug, hidden_sections: hidden, updated_at: new Date().toISOString() }, { onConflict: "event_slug" });
    if (err) { setError(err.message); } else { setSaved(true); setTimeout(() => setSaved(false), 2000); }
    setSaving(false);
  }

  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-foreground">{name}</h2>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">
          Vezi site-ul
        </a>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
      ) : (
        <>
          <ul className="mt-5 flex flex-col gap-1">
            {SECTIONS.map((s) => {
              const visible = !hidden.includes(s.key);
              return (
                <li key={s.key}>
                  <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-surface">
                    <span className={visible ? "text-sm font-medium text-foreground" : "text-sm font-medium text-muted line-through"}>
                      {s.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={visible}
                      onChange={(e) => toggle(s.key, e.target.checked)}
                      className="h-4 w-4 accent-primary"
                    />
                  </label>
                </li>
              );
            })}
          </ul>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          <button onClick={handleSave} disabled={saving}
            className="mt-5 flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : null}
            {saved ? "Salvat!" : "Salvează"}
          </button>
        </>
      )}
    </div>
  );
}

export default function SectiuniPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Secțiuni site</h1>
        <p className="mt-1 text-sm text-muted">
          Bifat = secțiunea apare pe site. Debifează ca s-o ascunzi, împreună cu linkurile din meniu. Schimbările apar pe site în cel mult un minut.
        </p>
      </div>

      <div className="grid max-w-4xl gap-6 md:grid-cols-2">
        {EVENTS.map((ev) => <EventSections key={ev.slug} {...ev} />)}
      </div>
    </div>
  );
}
