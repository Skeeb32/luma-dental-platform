import { NextResponse } from "next/server";

import { getApiIndex } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(getApiIndex());
}
