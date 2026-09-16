"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Check } from "lucide-react";

export default function ForteLocationPage() {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("location_content").select("*").eq("event_slug", "forte").single()
      .then(({ data: d }) => { if (d) setData(d); setLoading(false); });
  }, []);

  function set(key: string, value: unknown) {
    setData((v) => ({ ...v, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { id, event_slug, created_at, updated_at, ...rest } = data as Record<string, unknown>;
    void id; void event_slug; void created_at; void updated_at;

    const { error: err } = await supabase.from("location_content").upsert({ ...rest, event_slug: "forte" }, { onConflict: "event_slug" });
    if (err) { setError(err.message); } else { setSaved(true); setTimeout(() => setSaved(false), 2000); }
    setSaving(false);
  }

  if (loading) return <div className="flex items-center justify-center p-20"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  const fields = [
    { key: "venue_name", label: "Nume locație", placeholder: "The Office" },
    { key: "address", label: "Adresă", placeholder: "B-dul 21 Decembrie 1989, nr. 77, Cluj-Napoca" },
    { key: "description", label: "Descriere", type: "textarea", placeholder: "Evenimentul are loc la..." },
    { key: "maps_link", label: "Link Google Maps", placeholder: "https://maps.google.com/..." },
    { key: "maps_embed_url", label: "URL embed hartă (iframe)", placeholder: "https://www.google.com/maps/embed?..." },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">BNI Forte</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">Locație</h1>
        <p className="mt-1 text-sm text-muted">Editează detaliile locației evenimentului.</p>
      </div>

      <div className="max-w-xl rounded-2xl border border-border bg-background p-6 flex flex-col gap-5">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-foreground">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea value={(data[f.key] ?? "") as string} onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder} rows={3}
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            ) : (
              <input type="text" value={(data[f.key] ?? "") as string} onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-foreground">Parcare disponibilă</label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={!!data.has_parking} onChange={(e) => set("has_parking", e.target.checked)} className="h-4 w-4 accent-primary" />
            <span className="text-sm text-foreground">Da, există parcare</span>
          </label>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 self-start rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : null}
          {saved ? "Salvat!" : "Salvează"}
        </button>
      </div>
    </div>
  );
}
