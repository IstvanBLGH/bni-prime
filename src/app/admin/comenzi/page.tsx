"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, RefreshCw, FileSpreadsheet, Printer, Plus, X, Check } from "lucide-react";
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

const COLUMNS = ["Data", "Eveniment", "Nume", "Email", "Telefon", "CUI", "Sursa", "Suma", "Status", "ID comanda"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ro-RO", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function toRow(o: Order): string[] {
  return [
    formatDate(o.created_at),
    o.event_slug === "prime" ? "BNI Prime" : "BNI Forte",
    o.name, o.email, o.phone, o.cui, o.sursa,
    o.amount ? String(o.amount) : "",
    o.status,
    o.order_id,
  ];
}

// Order fields come from a public form, so never interpolate them raw.
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

function csvCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function downloadFile(content: string, filename: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

const EMPTY_FORM = {
  event_slug: "forte",
  name: "",
  email: "",
  phone: "",
  cui: "",
  sursa: "",
  amount: "",
  status: "Confirmat",
  created_at: "",
  order_id: "",
};

function AddOrderForm({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const [values, setValues] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error ?? "Nu am putut salva comanda.");
      setSaving(false);
      return;
    }
    onDone();
  }

  const field = "rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
  const label = "text-xs font-semibold uppercase tracking-wide text-foreground";

  return (
    <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
      <p className="mb-4 text-sm font-semibold text-foreground">Comanda noua</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="o-event">Eveniment</label>
          <select id="o-event" className={field} value={values.event_slug} onChange={(e) => set("event_slug", e.target.value)}>
            <option value="forte">BNI Forte</option>
            <option value="prime">BNI Prime</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="o-name">Nume complet *</label>
          <input id="o-name" className={field} value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Ion Popescu" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="o-email">E-mail</label>
          <input id="o-email" type="email" className={field} value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="ion@exemplu.ro" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="o-phone">Telefon</label>
          <input id="o-phone" type="tel" className={field} value={values.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+40 7XX XXX XXX" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="o-cui">CUI</label>
          <input id="o-cui" className={field} value={values.cui} onChange={(e) => set("cui", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="o-sursa">Sursa</label>
          <input id="o-sursa" className={field} value={values.sursa} onChange={(e) => set("sursa", e.target.value)} placeholder="Facebook, Recomandare..." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="o-amount">Suma (RON) *</label>
          <input id="o-amount" type="number" min="0" className={field} value={values.amount} onChange={(e) => set("amount", e.target.value)} placeholder="100" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="o-status">Status</label>
          <select id="o-status" className={field} value={values.status} onChange={(e) => set("status", e.target.value)}>
            <option value="Confirmat">Confirmat</option>
            <option value="Autorizat">Autorizat</option>
            <option value="Initiat">Initiat (neplatit)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="o-date">Data comenzii</label>
          <input id="o-date" type="datetime-local" className={field} value={values.created_at} onChange={(e) => set("created_at", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-3">
          <label className={label} htmlFor="o-id">ID comanda</label>
          <input id="o-id" className={field} value={values.order_id} onChange={(e) => set("order_id", e.target.value)} placeholder="Copiaza-l din Netopia, ex. FORTE-1759... Lasa gol si se genereaza automat." />
        </div>
      </div>

      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="mt-5 flex gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Salveaza
        </button>
        <button onClick={onCancel} className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-surface">
          <X className="h-4 w-4" />
          Anuleaza
        </button>
      </div>
    </div>
  );
}

export default function ComenziPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<string>("toate");
  const [status, setStatus] = useState<string>("toate");
  const [adding, setAdding] = useState(false);

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

  const fileLabel = `comenzi-${event}-${status}-${new Date().toISOString().slice(0, 10)}`;

  function exportExcel() {
    // "sep=" tells Excel the delimiter, so columns split correctly in any
    // locale; the BOM keeps diacritics intact.
    const lines = [COLUMNS, ...orders.map(toRow)].map((row) => row.map(csvCell).join(","));
    downloadFile(`﻿sep=,\r\n${lines.join("\r\n")}`, `${fileLabel}.csv`, "text/csv;charset=utf-8;");
  }

  function exportPdf() {
    const head = COLUMNS.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
    const body = orders
      .map((o) => `<tr>${toRow(o).map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
      .join("");
    const win = window.open("", "_blank");
    if (!win) {
      alert("Permite ferestrele pop-up pentru a genera PDF-ul.");
      return;
    }
    win.document.write(`<!doctype html><html lang="ro"><head><meta charset="utf-8">
      <title>${escapeHtml(fileLabel)}</title>
      <style>
        body { font-family: system-ui, sans-serif; margin: 24px; color: #111; }
        h1 { font-size: 18px; margin: 0 0 4px; }
        p { font-size: 12px; color: #666; margin: 0 0 16px; }
        table { width: 100%; border-collapse: collapse; font-size: 11px; }
        th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
        th { background: #f5f5f5; }
        @page { size: A4 landscape; margin: 12mm; }
      </style></head><body>
      <h1>Comenzi BNI</h1>
      <p>${orders.length} comenzi · ${paid.length} platite · ${total} RON incasat · generat ${escapeHtml(formatDate(new Date().toISOString()))}</p>
      <table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
      </body></html>`);
    win.document.close();
    win.focus();
    win.print();
  }

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
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Adauga
            </button>
          )}
          <button
            onClick={exportExcel}
            disabled={orders.length === 0}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface disabled:opacity-50"
          >
            <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
            Excel
          </button>
          <button
            onClick={exportPdf}
            disabled={orders.length === 0}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface disabled:opacity-50"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            PDF
          </button>
          <button
            onClick={load}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Reincarca
          </button>
        </div>
      </div>

      {adding && (
        <AddOrderForm
          onDone={() => { setAdding(false); load(); }}
          onCancel={() => setAdding(false)}
        />
      )}

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
                    <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(o.created_at)}</td>
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
