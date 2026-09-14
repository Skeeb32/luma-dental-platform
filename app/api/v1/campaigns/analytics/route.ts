import { NextResponse } from "next/server";

import { baseResponse, mockCampaignAnalytics } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(baseResponse(mockCampaignAnalytics));
}
