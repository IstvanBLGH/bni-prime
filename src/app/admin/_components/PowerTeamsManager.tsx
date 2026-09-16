"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Users, Check, Loader2, X } from "lucide-react";

interface PowerTeam {
  id: string;
  event_slug: string;
  name: string;
  date_text: string;
  is_active: boolean;
  sort_order: number;
}

export function PowerTeamsManager({ eventSlug, label }: { eventSlug: "prime" | "forte"; label: string }) {
  const [teams, setTeams] = useState<PowerTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("power_teams")
      .select("*")
      .eq("event_slug", eventSlug)
      .order("sort_order");
    setTeams((data as PowerTeam[]) ?? []);
    setLoading(false);
  }, [eventSlug]);

  useEffect(() => { load(); }, [load]);

  async function handleAdd() {
    if (!newName.trim()) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from("power_teams").insert({
      event_slug: eventSlug,
      name: newName.trim(),
      date_text: newDate.trim(),
      is_active: teams.length === 0,
      sort_order: teams.length,
    });
    setNewName("");
    setNewDate("");
    setAdding(false);
    setSaving(false);
    load();
  }

  async function handleActivate(id: string) {
    setActivatingId(id);
    const supabase = createClient();
    await supabase.from("power_teams").update({ is_active: false }).eq("event_slug", eventSlug);
    await supabase.from("power_teams").update({ is_active: true }).eq("id", id);
    setActivatingId(null);
    load();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("power_teams").delete().eq("id", id);
    setDeletingId(null);
    load();
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Power Teams</h1>
          <p className="mt-1 text-sm text-muted">
            Gestioneaza grupurile de membri. Seteaza care apare activ pe pagina, apoi editeaza membrii fiecaruia.
          </p>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Power Team nou
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">Power Team nou</p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-foreground">Nume power team</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="ex: Power Team Octombrie 2026"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-foreground">Data (optional)</label>
              <input
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="ex: 15.10.2026"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={saving || !newName.trim()}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Salveaza
              </button>
              <button
                onClick={() => { setAdding(false); setNewName(""); setNewDate(""); }}
                className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-surface"
              >
                <X className="h-4 w-4" />
                Anuleaza
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {teams.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-background py-12 text-center text-sm text-muted">
            Niciun Power Team. Apasa &ldquo;Power Team nou&rdquo; pentru a crea primul.
          </div>
        )}
        {teams.map((team) => (
          <div
            key={team.id}
            className={`flex items-center gap-4 rounded-2xl border bg-background px-5 py-4 ${team.is_active ? "border-primary ring-2 ring-primary/20" : "border-border"}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {team.is_active && (
                  <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white">
                    ACTIV
                  </span>
                )}
                <p className="truncate text-sm font-semibold text-foreground">{team.name}</p>
              </div>
              {team.date_text && (
                <p className="mt-0.5 text-xs text-muted">{team.date_text}</p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {!team.is_active && (
                <button
                  onClick={() => handleActivate(team.id)}
                  disabled={activatingId === team.id}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted hover:border-primary hover:text-primary disabled:opacity-50"
                >
                  {activatingId === team.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                  Activeaza
                </button>
              )}
              <a
                href={`/admin/${eventSlug}/team/${team.id}`}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted hover:border-primary hover:text-primary"
              >
                <Users className="h-3.5 w-3.5" />
                Membri
              </a>
              <button
                onClick={() => handleDelete(team.id)}
                disabled={deletingId === team.id}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:border-red-300 hover:text-red-500 disabled:opacity-50"
              >
                {deletingId === team.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
