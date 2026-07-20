import { NextResponse } from "next/server";

const MAX_PLUS = parseInt(process.env.MAX_PLUS_TICKETS ?? "5");

export async function GET() {
  try {
    const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!url) return NextResponse.json({ plusSold: 0, plusMax: MAX_PLUS });

    const res = await fetch(url, { next: { revalidate: 60 } });
    const data = await res.json();
    return NextResponse.json({ plusSold: Number(data.plusSold) || 0, plusMax: MAX_PLUS });
  } catch {
    return NextResponse.json({ plusSold: 0, plusMax: MAX_PLUS });
  }
}
