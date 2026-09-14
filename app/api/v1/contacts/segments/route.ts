import { NextResponse } from "next/server";

import { baseResponse, mockSegments } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(baseResponse(mockSegments));
}
