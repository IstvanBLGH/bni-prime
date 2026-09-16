"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { ContentEditor, type Column } from "./ContentEditor";
import { Loader2 } from "lucide-react";

export type { Column };

interface AdminPageShellProps {
  title: string;
  description?: string;
  breadcrumb: string;
  table: string;
  eventSlug: "prime" | "forte";
  orderBy?: string;
  columns: Column[];
  hasPhotoUpload?: boolean;
  photoKey?: string;
  sortable?: boolean;
  extraFilter?: { key: string; value: string };
  extraData?: Record<string, unknown>;
  hasActiveToggle?: boolean;
}

export function AdminPageShell({
  title, description, breadcrumb, table, eventSlug, orderBy = "sort_order",
  columns, hasPhotoUpload, photoKey, sortable, extraFilter, extraData, hasActiveToggle,
}: AdminPageShellProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let q = supabase.from(table).select("*").eq("event_slug", eventSlug);
    if (extraFilter) q = q.eq(extraFilter.key, extraFilter.value) as typeof q;
    const { data } = await q.order(orderBy);
    setItems(data ?? []);
    setLoading(false);
  }, [table, eventSlug, orderBy, extraFilter]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">{breadcrumb}</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <ContentEditor
          title=""
          table={table}
          eventSlug={eventSlug}
          columns={columns}
          items={items}
          onRefresh={load}
          hasPhotoUpload={hasPhotoUpload}
          photoKey={photoKey}
          sortable={sortable}
          extraData={extraData}
          hasActiveToggle={hasActiveToggle}
        />
      )}
    </div>
  );
}
