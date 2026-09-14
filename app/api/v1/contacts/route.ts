import { NextResponse } from "next/server";

import { baseResponse, mockContacts } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(baseResponse(mockContacts));
}

export async function POST() {
  return NextResponse.json(
    baseResponse({
      ...mockContacts[0],
      id: "ct_099",
      source: "api"
    }),
    { status: 201 }
  );
}
