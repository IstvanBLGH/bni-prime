import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const STATUSES = ["Initiat", "Autorizat", "Confirmat"];

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase nu este configurat pe server." }, { status: 500 });
  }

  const body = await req.json();
  const { event_slug, name, email, phone, cui, sursa, amount, status, created_at, order_id } = body;

  if (event_slug !== "prime" && event_slug !== "forte") {
    return NextResponse.json({ error: "Eveniment invalid." }, { status: 400 });
  }
  if (!name?.trim()) {
    return NextResponse.json({ error: "Numele este obligatoriu." }, { status: 400 });
  }
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ error: "Status invalid." }, { status: 400 });
  }
  const parsedAmount = Number(amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
    return NextResponse.json({ error: "Suma trebuie sa fie un numar pozitiv." }, { status: 400 });
  }

  const date = created_at ? new Date(created_at) : new Date();
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Data este invalida." }, { status: 400 });
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("orders").insert({
    order_id: order_id?.trim() || `MANUAL-${Date.now()}`,
    event_slug,
    name: name.trim(),
    email: email?.trim() ?? "",
    phone: phone?.trim() ?? "",
    cui: cui?.trim() ?? "",
    sursa: sursa?.trim() ?? "",
    amount: parsedAmount,
    status,
    created_at: date.toISOString(),
    paid_at: status === "Initiat" ? null : date.toISOString(),
  });

  if (error) {
    const message = error.code === "23505"
      ? "Exista deja o comanda cu acest ID."
      : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
