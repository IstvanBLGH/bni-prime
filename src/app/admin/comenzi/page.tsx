"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/db";

const EVENTS = [
  { value: "toate", label: "Toate" },
  { value: "prime", label: "BNI Prime" },
  { value: "forte", label: "BNI Forte" },
] as const;

const STATUSES = [
  { value: "toate", label: "Toate" },
  { value: "platite", label: "Platite" },
  { value: "Initiat", label: "Nefinalizate" },
] as const;

const STATUS_STYLE: Record<string, string> = {
  Confirmat: "bg-green-100 text-green-700",
  Autorizat: "bg-amber-100 text-amber-700",
  Initiat: "bg-surface text-muted",
};

export default function ComenziPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<string>("toate");
  const [status, setStatus] = useState<string>("toate");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    let q = supabase.from("orders").select("*");
    if (event !== "toate") q = q.eq("event_slug", event);
    if (status === "platite") q = q.in("status", ["Confirmat", "Autorizat"]);
    else if (status !== "toate") q = q.eq("status", status);
    const { data, error } = await q.order("created_at", { ascending: false });
    if (error) setError(error.message);
    setOrders((data as Order[]) ?? []);
    setLoading(false);
  }, [event, status]);

  useEffect(() => { load(); }, [load]);

  const paid = orders.filter((o) => o.status !== "Initiat");
  const total = paid.reduce((sum, o) => sum + (o.amount ?? 0), 0);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Administrare</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Comenzi</h1>
          <p className="mt-1 text-sm text-muted">
            Inscrierile la evenimente. Cele ramase pe &bdquo;Nefinalizate&rdquo; au completat
            formularul fara sa duca plata la capat.
          </p>
        </div>
        <button
          onClick={load}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Reincarca
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Eveniment</span>
          <div className="flex gap-1.5">
            {EVENTS.map((e) => (
              <button
                key={e.value}
                onClick={() => setEvent(e.value)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                  event === e.value
                    ? "border-primary bg-primary text-white"
                    : "border-border text-muted hover:text-foreground"
                )}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Status</span>
          <div className="flex gap-1.5">
            {STATUSES.map((s) => (
              <button
                key={s.value}
                onClick={() => setStatus(s.value)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                  status === s.value
                    ? "border-primary bg-primary text-white"
                    : "border-border text-muted hover:text-foreground"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          Nu am putut incarca comenzile: {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-background py-16 text-center text-sm text-muted">
          Nicio comanda care sa corespunda filtrelor.
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-6 text-sm">
            <span className="text-muted">
              Comenzi afisate: <strong className="text-foreground">{orders.length}</strong>
            </span>
            <span className="text-muted">
              Platite: <strong className="text-foreground">{paid.length}</strong>
            </span>
            <span className="text-muted">
              Incasat: <strong className="text-foreground">{total} RON</strong>
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-surface text-left">
                <tr className="text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Eveniment</th>
                  <th className="px-4 py-3">Nume</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">CUI</th>
                  <th className="px-4 py-3">Sursa</th>
                  <th className="px-4 py-3">Suma</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-border align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {new Date(o.created_at).toLocaleString("ro-RO", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-muted">{o.event_slug === "prime" ? "Prime" : "Forte"}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{o.name || "—"}</td>
                    <td className="px-4 py-3">
                      {o.email && (
                        <a href={`mailto:${o.email}`} className="block text-foreground hover:text-primary">{o.email}</a>
                      )}
                      {o.phone && (
                        <a href={`tel:${o.phone}`} className="block text-muted hover:text-primary">{o.phone}</a>
                      )}
                      {!o.email && !o.phone && "—"}
                    </td>
                    <td className="px-4 py-3 text-muted">{o.cui || "—"}</td>
                    <td className="px-4 py-3 text-muted">{o.sursa || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-foreground">{o.amount ? `${o.amount} RON` : "—"}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
                        STATUS_STYLE[o.status] ?? "bg-surface text-muted"
                      )}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
