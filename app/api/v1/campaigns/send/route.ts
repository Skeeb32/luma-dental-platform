import { NextResponse } from "next/server";

import { baseResponse } from "@/lib/mock-api";

export async function POST() {
  return NextResponse.json(
    baseResponse({
      id: "cmp_042",
      status: "scheduled",
      templateId: "tpl_2",
      audienceSize: 48210,
      scheduledFor: "2026-04-08T17:00:00.000Z",
      estimatedCost: 482.1
    }),
    { status: 202 }
  );
}
