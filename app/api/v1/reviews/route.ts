import { NextResponse } from "next/server";

import { baseResponse } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(
    baseResponse([
      {
        id: "rev_001",
        contactId: "ct_001",
        channel: "google",
        status: "submitted",
        sentiment: "promoter"
      },
      {
        id: "rev_002",
        contactId: "ct_002",
        channel: "private-recovery",
        status: "open",
        sentiment: "detractor"
      }
    ])
  );
}
