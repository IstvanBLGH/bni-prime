import { NextRequest, NextResponse } from "next/server";
import { Netopia } from "netopia-card";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, cui, sursa, browserInfo } = body;

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
      amount: price,
      currency: "RON",
      description: `Bilet Ziua Invitatului BNI Forte — ${new Date().toLocaleDateString("ro-RO")}`,
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
      event: "forte",
    };

    netopia.setProductsData([
      {
        name: "Bilet Standard — Ziua Invitatului BNI Forte",
        code: "forte-standard",
        category: "Eveniment networking",
        price,
        vat: 19,
      },
    ]);

    const response = await netopia.startPayment();
    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
