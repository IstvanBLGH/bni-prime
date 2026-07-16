import { NextRequest, NextResponse } from "next/server";

async function logToSheets(data: Record<string, unknown>) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch((err) => console.error("[Sheets log error]", err));
}

export async function POST(req: NextRequest) {
  try {
    const text = await req.text();
    const { order, payment } = JSON.parse(text);

    if (!order || !payment) throw new Error("Payload invalid");

    console.log("[Netopia IPN]", {
      orderID: order.orderID,
      status: payment.status,
      amount: payment.amount,
    });

    // status 3 = autorizat, 5 = confirmat
    if (payment.status === 3 || payment.status === 5) {
      // descrierea conține: "Nume | email | telefon | Bilet X xN — Prime Summer 2026"
      const parts = (order.description ?? "").split("|").map((s: string) => s.trim());
      await logToSheets({
        orderID: order.orderID,
        name: parts[0] ?? "",
        email: parts[1] ?? "",
        phone: parts[2] ?? "",
        ticket: parts[3] ?? "",
        amount: payment.amount,
        status: payment.status === 5 ? "Confirmat" : "Autorizat",
      });
    }

    return NextResponse.json({ errorCode: 0 });
  } catch (error) {
    console.error("[Netopia IPN error]", error);
    return NextResponse.json({ errorCode: 1 }, { status: 400 });
  }
}
