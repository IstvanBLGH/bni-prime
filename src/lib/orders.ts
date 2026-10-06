import { createClient } from "@supabase/supabase-js";

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

interface NewOrder {
  orderId: string;
  eventSlug: "prime" | "forte";
  name?: string;
  email?: string;
  phone?: string;
  cui?: string;
  sursa?: string;
  quantity: number;
  amount: number;
}

// Recording must never block checkout, so failures are logged and swallowed.
export async function recordOrder(order: NewOrder) {
  const supabase = adminClient();
  if (!supabase) return;
  const { error } = await supabase.from("orders").insert({
    order_id: order.orderId,
    event_slug: order.eventSlug,
    name: order.name ?? "",
    email: order.email ?? "",
    phone: order.phone ?? "",
    cui: order.cui ?? "",
    sursa: order.sursa ?? "",
    quantity: order.quantity,
    amount: order.amount,
    status: "Initiat",
  });
  if (error) console.error("[orders insert]", order.orderId, error.message);
}

export async function markOrderPaid(orderId: string, status: "Autorizat" | "Confirmat", amount?: number) {
  const supabase = adminClient();
  if (!supabase) return;
  const { error } = await supabase
    .from("orders")
    .update({ status, paid_at: new Date().toISOString(), ...(amount ? { amount } : {}) })
    .eq("order_id", orderId);
  if (error) console.error("[orders update]", orderId, error.message);
}
