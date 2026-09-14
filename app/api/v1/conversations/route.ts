import { NextResponse } from "next/server";

import { baseResponse, mockConversations } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(baseResponse(mockConversations));
}
