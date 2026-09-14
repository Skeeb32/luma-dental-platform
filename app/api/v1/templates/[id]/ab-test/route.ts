import { NextRequest, NextResponse } from "next/server";

import { baseResponse } from "@/lib/mock-api";

export async function POST(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  return NextResponse.json(
    baseResponse({
      templateId: id,
      experimentId: "ab_014",
      variants: [
        { id: "a", label: "Urgency-led copy", split: 50 },
        { id: "b", label: "Benefit-led copy", split: 50 }
      ],
      status: "running"
    }),
    { status: 202 }
  );
}
