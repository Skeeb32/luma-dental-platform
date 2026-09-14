import { NextResponse } from "next/server";

import { getTemplates } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(getTemplates());
}

export async function POST() {
  return NextResponse.json(
    getTemplates(),
    { status: 201 }
  );
}
