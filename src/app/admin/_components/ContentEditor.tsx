"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Loader2, Upload, GripVertical } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface Column {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "tel" | "email" | "checkbox";
  placeholder?: string;
  required?: boolean;
  span?: "full";
}

interface ContentEditorProps {
  title: string;
  description?: string;
  table: string;
  eventSlug: string;
  columns: Column[];
  items: Record<string, unknown>[];
  onRefresh: () => void;
  hasPhotoUpload?: boolean;
  photoKey?: string;
  sortable?: boolean;
  extraData?: Record<string, unknown>;
}

function PhotoUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const json = await res.json();

    if (json.url) onChange(json.url);
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-foreground">Fotografie</label>
      <div className="flex items-center gap-3">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="h-16 w-16 rounded-lg object-cover border border-border" />
        )}
        <label className={`flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border px-4 py-2.5 text-sm text-muted transition-colors hover:border-primary hover:text-primary ${uploading ? "pointer-events-none opacity-50" : ""}`}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Se încarcă..." : "Alege fotografie"}
          <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
        </label>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-xs text-muted hover:text-red-500">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function ItemForm({ columns, initial, onSave, onCancel, hasPhotoUpload, photoKey }: {
  columns: Column[];
  initial: Record<string, unknown>;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
  hasPhotoUpload?: boolean;
  photoKey?: string;
}) {
  const [values, setValues] = useState<Record<string, unknown>>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: string, value: unknown) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await onSave(values);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Eroare la salvare.");
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {columns.map((col) => {
          const val = (values[col.key] ?? "") as string;
          const colClass = col.span === "full" ? "sm:col-span-2" : "";
          return (
            <div key={col.key} className={`flex flex-col gap-1.5 ${colClass}`}>
              <label className="text-xs font-semibold uppercase tracking-wide text-foreground">{col.label}</label>
              {col.type === "textarea" ? (
                <textarea
                  value={val}
                  onChange={(e) => set(col.key, e.target.value)}
                  placeholder={col.placeholder}
                  rows={3}
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              ) : col.type === "checkbox" ? (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!values[col.key]} onChange={(e) => set(col.key, e.target.checked)} className="h-4 w-4 accent-primary" />
                  <span className="text-sm text-foreground">{col.placeholder ?? "Da"}</span>
                </label>
              ) : (
                <input
                  type={col.type ?? "text"}
                  value={val}
                  onChange={(e) => set(col.key, col.type === "number" ? Number(e.target.value) : e.target.value)}
                  placeholder={col.placeholder}
                  required={col.required}
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              )}
            </div>
          );
        })}
      </div>

      {hasPhotoUpload && photoKey && (
        <PhotoUploader
          value={(values[photoKey] ?? "") as string}
          onChange={(url) => set(photoKey, url)}
        />
      )}

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Salvează
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-surface">
          <X className="h-4 w-4" />
          Anulează
        </button>
      </div>
    </div>
  );
}

export function ContentEditor({
  title, description, table, eventSlug, columns, items, onRefresh, hasPhotoUpload, photoKey, sortable, extraData,
}: ContentEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const supabase = createClient();

  function emptyItem(): Record<string, unknown> {
    const obj: Record<string, unknown> = { event_slug: eventSlug, ...(extraData ?? {}) };
    columns.forEach((col) => {
      obj[col.key] = col.type === "number" ? 0 : col.type === "checkbox" ? false : "";
    });
    if (sortable) obj.sort_order = items.length;
    return obj;
  }

  async function handleCreate(data: Record<string, unknown>) {
    const { error } = await supabase.from(table).insert({ ...data, event_slug: eventSlug, ...(extraData ?? {}) });
    if (error) throw new Error(error.message);
    setAdding(false);
    onRefresh();
  }

  async function handleUpdate(id: string, data: Record<string, unknown>) {
    const { id: _id, event_slug: _slug, created_at: _ca, updated_at: _ua, ...rest } = data as Record<string, unknown>;
    void _id; void _slug; void _ca; void _ua;
    const { error } = await supabase.from(table).update(rest).eq("id", id);
    if (error) throw new Error(error.message);
    setEditingId(null);
    onRefresh();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    await supabase.from(table).delete().eq("id", id);
    setDeletingId(null);
    onRefresh();
  }

  function getDisplayValue(item: Record<string, unknown>): string {
    const first = columns[0];
    return String(item[first.key] ?? "—");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Adaugă
          </button>
        )}
      </div>

      {adding && (
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">Intrare nouă</p>
          <ItemForm
            columns={columns}
            initial={emptyItem()}
            onSave={handleCreate}
            onCancel={() => setAdding(false)}
            hasPhotoUpload={hasPhotoUpload}
            photoKey={photoKey}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-background py-12 text-center text-sm text-muted">
            Niciun element. Apasă &ldquo;Adaugă&rdquo; pentru a crea primul.
          </div>
        )}
        {items.map((item) => {
          const id = item.id as string;
          const isEditing = editingId === id;
          const isDeleting = deletingId === id;

          return (
            <div key={id} className="rounded-2xl border border-border bg-background">
              {isEditing ? (
                <div className="p-5">
                  <ItemForm
                    columns={columns}
                    initial={{ ...item }}
                    onSave={(data) => handleUpdate(id, { ...item, ...data })}
                    onCancel={() => setEditingId(null)}
                    hasPhotoUpload={hasPhotoUpload}
                    photoKey={photoKey}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 px-5 py-4">
                  {sortable && <GripVertical className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />}
                  {hasPhotoUpload && photoKey && (item[photoKey] as string) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item[photoKey] as string} alt="" className="h-10 w-10 rounded-lg object-cover border border-border shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{getDisplayValue(item)}</p>
                    {columns[1] && (
                      <p className="truncate text-xs text-muted">{String(item[columns[1].key] ?? "")}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button onClick={() => setEditingId(id)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:border-primary hover:text-primary">
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <button onClick={() => handleDelete(id)} disabled={isDeleting}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:border-red-300 hover:text-red-500 disabled:opacity-50">
                      {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
