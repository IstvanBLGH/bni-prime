import { NextRequest, NextResponse } from "next/server";
import { Netopia } from "netopia-card";

const PRICES: Record<string, number> = {
  standard: 175,
  plus: 500,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, cui, ticket, bilete, browserInfo } = body;

    const amount = PRICES[ticket] ?? 175;
    const qty = parseInt(bilete) || 1;
    const totalAmount = amount * qty;
    const orderID = `PRIME-${Date.now()}`;

    const nameParts = (name as string).trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || nameParts[0];

    const netopia = new Netopia({
      apiKey: process.env.NETOPIA_API_KEY!,
      posSignature: process.env.NETOPIA_SIGNATURE!,
      notifyUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/netopia/notify`,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      sandbox: process.env.NETOPIA_SANDBOX === "true",
    });

    if (browserInfo) {
      const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "";
      netopia.setBrowserData(browserInfo, ip);
    }

    netopia.setOrderData({
      orderID,
      amount: totalAmount,
      currency: "RON",
      description: `Bilet ${ticket} (x${qty}) — Prime Summer 29 iulie 2026`,
      dateTime: new Date().toISOString(),
      billing: {
        email,
        phone,
        firstName,
        lastName,
        city: "Bistrița",
        country: 642,
        countryName: "Romania",
        state: "BN",
        postalCode: "420000",
        details: cui ?? "",
      },
      data: { name, email, phone, ticket, qty: String(qty) },
    });

    netopia.setProductsData([
      {
        name: `Bilet ${ticket} — Prime Summer`,
        code: ticket,
        category: "Eveniment networking",
        price: amount,
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
