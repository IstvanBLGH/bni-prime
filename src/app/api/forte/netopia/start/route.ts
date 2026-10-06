import { NextRequest, NextResponse } from "next/server";
import { Netopia } from "netopia-card";
import { recordOrder } from "@/lib/orders";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, cui, sursa, browserInfo } = body;

    // Quantity is client-supplied: clamp it so the charge can't be steered.
    const quantity = Math.min(Math.max(Math.trunc(Number(body.quantity) || 1), 1), 10);

    let price = 100;
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
          .eq("event_slug", "forte")
          .eq("is_available", true)
          .order("sort_order")
          .limit(1)
          .single();
        if (data?.price) price = data.price;
      } catch { /* use default */ }
    }

    const orderID = `FORTE-${Date.now()}`;
    const total = price * quantity;
    await recordOrder({ orderId: orderID, eventSlug: "forte", name, email, phone, cui, sursa, quantity, amount: total });

    const nameParts = (name as string).trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || nameParts[0];

    const forteBase = process.env.FORTE_BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;
    const netopia = new Netopia({
      apiKey: process.env.NETOPIA_API_KEY!,
      posSignature: process.env.NETOPIA_SIGNATURE!,
      notifyUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/forte/netopia/notify`,
      redirectUrl: `${forteBase}/`,
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
      description: `${quantity} x Bilet Ziua Invitatului BNI Forte — ${new Date().toLocaleDateString("ro-RO")}`,
      dateTime: new Date().toISOString(),
      billing: {
        email,
        phone,
        firstName,
        lastName,
        city: "Cluj-Napoca",
        country: 642,
        countryName: "Romania",
        state: "CJ",
        postalCode: "400000",
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
      event: "forte",
    };

    // ProductData carries no quantity field, so each ticket is its own line;
    // that way the lines sum to the charged amount in the Netopia dashboard.
    netopia.setProductsData(
      Array.from({ length: quantity }, () => ({
        name: "Bilet Standard — Ziua Invitatului BNI Forte",
        code: "forte-standard",
        category: "Eveniment networking",
        price,
        vat: 19,
      }))
    );

    const response = await netopia.startPayment();
    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
