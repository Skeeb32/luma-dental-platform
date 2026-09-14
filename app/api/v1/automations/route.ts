import { NextResponse } from "next/server";

import { baseResponse } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(
    baseResponse([
      {
        id: "aut_001",
        name: "Missed call instant reply",
        trigger: "call.missed",
        status: "active"
      },
      {
        id: "aut_002",
        name: "Review request after payment",
        trigger: "payment.paid",
        status: "active"
      },
      {
        id: "aut_003",
        name: "Non-responder follow-up",
        trigger: "campaign.no-reply.48h",
        status: "draft"
      }
    ])
  );
}
