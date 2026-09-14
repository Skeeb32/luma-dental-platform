import { NextResponse } from "next/server";

import { baseResponse } from "@/lib/mock-api";

export async function POST() {
  return NextResponse.json(
    baseResponse({
      id: "msg_901",
      status: "queued",
      provider: "twilio",
      to: "+15745550101",
      from: "+15745550001",
      body: "Your payment link is ready: https://pulse.link/pay/acme-901",
      media: [],
      queuedAt: "2026-04-08T13:00:00.000Z"
    }),
    { status: 202 }
  );
}
