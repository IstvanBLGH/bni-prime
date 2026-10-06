import { NextRequest, NextResponse } from "next/server";
import { Netopia } from "netopia-card";
import { recordOrder } from "@/lib/orders";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, cui, sursa, browserInfo } = body;

    // Quantity is client-supplied: clamp it so the charge can't be steered.
    const quantity = Math.min(Math.max(Math.trunc(Number(body.quantity) || 1), 1), 10);

    // Fetch ticket price from Supabase if configured, otherwise use default
    let amount = 150;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        const { data } = await supabase
          .from("tickets")
          .select("price")
          .eq("event_slug", "prime")
          .eq("is_available", true)
          .order("sort_order")
          .limit(1)
          .single();
        if (data?.price) amount = data.price;
      } catch { /* use default */ }
    }

    const orderID = `PRIME-${Date.now()}`;
    const total = amount * quantity;
    await recordOrder({ orderId: orderID, eventSlug: "prime", name, email, phone, cui, sursa, quantity, amount: total });
    const nameParts = String(name ?? "").trim().split(" ");
    const firstName = nameParts[0] || "Client";
    const lastName = nameParts.slice(1).join(" ") || firstName;

    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";

    const netopia = new Netopia({
      apiKey: process.env.NETOPIA_API_KEY!,
      posSignature: process.env.NETOPIA_SIGNATURE!,
      notifyUrl: `${base}/api/netopia/notify`,
      redirectUrl: `${base}/`,
      sandbox: process.env.NETOPIA_SANDBOX === "true",
    });

    if (browserInfo) {
      const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "";
      netopia.setBrowserData(browserInfo, ip);
    }

    netopia.setOrderData({
      orderID,
      amount: total,
      currency: "RON",
      description: `${quantity} x Bilet BNI Prime — Ziua Invitatului`,
      dateTime: new Date().toISOString(),
      billing: {
        email,
        phone,
        firstName,
        lastName,
        city: "Bistrita",
        country: 642,
        countryName: "Romania",
        state: "BN",
        postalCode: "420000",
        details: cui ?? "",
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (netopia as any).order.data = {
      name,
      email,
      phone,
      cui: cui ?? "",
      sursa: sursa ?? "",
      quantity,
    };

    // ProductData carries no quantity field, so each ticket is its own line;
    // that way the lines sum to the charged amount in the Netopia dashboard.
    netopia.setProductsData(
      Array.from({ length: quantity }, () => ({
        name: "Bilet BNI Prime — Ziua Invitatului",
        code: "prime-standard",
        category: "Eveniment networking",
        price: amount,
        vat: 19,
      }))
    );

    const response = await netopia.startPayment();
    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Eroare necunoscuta";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
