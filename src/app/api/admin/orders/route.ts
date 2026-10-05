import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const STATUSES = ["Initiat", "Autorizat", "Confirmat"];

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key) : null;
}

type Body = Record<string, string | undefined>;

interface OrderFields {
  event_slug: string;
  name: string;
  email: string;
  phone: string;
  cui: string;
  sursa: string;
  amount: number;
  status: string;
  created_at: string;
  paid_at: string | null;
}

function validate(body: Body): { error: string; fields?: never } | { error?: never; fields: OrderFields } {
  const { event_slug, name, status, amount, created_at } = body;

  if (event_slug !== "prime" && event_slug !== "forte") return { error: "Eveniment invalid." };
  if (!name?.trim()) return { error: "Numele este obligatoriu." };
  if (!status || !STATUSES.includes(status)) return { error: "Status invalid." };

  const parsedAmount = Number(amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
    return { error: "Suma trebuie sa fie un numar pozitiv." };
  }

  const date = created_at ? new Date(created_at) : new Date();
  if (Number.isNaN(date.getTime())) return { error: "Data este invalida." };

  return {
    fields: {
      event_slug,
      name: name.trim(),
      email: body.email?.trim() ?? "",
      phone: body.phone?.trim() ?? "",
      cui: body.cui?.trim() ?? "",
      sursa: body.sursa?.trim() ?? "",
      amount: parsedAmount,
      status,
      created_at: date.toISOString(),
      paid_at: status === "Initiat" ? null : date.toISOString(),
    },
  };
}

function failure(error: { code?: string; message: string }) {
  const message = error.code === "23505" ? "Exista deja o comanda cu acest ID." : error.message;
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const supabase = adminClient();
  if (!supabase) return NextResponse.json({ error: "Supabase nu este configurat pe server." }, { status: 500 });

  const body = (await req.json()) as Body;
  const { fields, error: invalid } = validate(body);
  if (invalid || !fields) return NextResponse.json({ error: invalid }, { status: 400 });

  const { error } = await supabase.from("orders").insert({
    ...fields,
    order_id: body.order_id?.trim() || `MANUAL-${Date.now()}`,
  });
  if (error) return failure(error);

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const supabase = adminClient();
  if (!supabase) return NextResponse.json({ error: "Supabase nu este configurat pe server." }, { status: 500 });

  const body = (await req.json()) as Body;
  if (!body.id) return NextResponse.json({ error: "Lipseste comanda de modificat." }, { status: 400 });

  const { fields, error: invalid } = validate(body);
  if (invalid || !fields) return NextResponse.json({ error: invalid }, { status: 400 });

  // order_id ties the row to the Netopia transaction, so it stays editable
  // but never blank.
  const orderId = body.order_id?.trim();
  const payload = orderId ? { ...fields, order_id: orderId } : fields;

  const { error } = await supabase.from("orders").update(payload).eq("id", body.id);
  if (error) return failure(error);

  return NextResponse.json({ ok: true });
}
