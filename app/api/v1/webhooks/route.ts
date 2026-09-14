import { NextResponse } from "next/server";

import { baseResponse, getWebhooks } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(getWebhooks());
}

export async function POST() {
  return NextResponse.json(
    baseResponse({
      id: "wh_001",
      url: "https://example.com/pulse/webhooks",
      secretPreview: "whsec_...9fd1",
      status: "active"
    }),
    { status: 201 }
  );
}
