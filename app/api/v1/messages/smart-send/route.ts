import { NextResponse } from "next/server";

import { baseResponse } from "@/lib/mock-api";

export async function POST() {
  return NextResponse.json(
    baseResponse({
      recommendationId: "smart_201",
      sendWindow: "2026-04-08T16:45:00.000Z",
      confidence: 0.92,
      suggestedCopy: "Hi Avery, your estimate is ready. Want me to text the payment link too?",
      intentScore: 84
    })
  );
}
