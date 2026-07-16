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
      const d = order.data ?? {};
      await logToSheets({
        orderID: order.orderID,
        name: d.name ?? "",
        email: d.email ?? "",
        phone: d.phone ?? "",
        ticket: d.ticket ?? "",
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
