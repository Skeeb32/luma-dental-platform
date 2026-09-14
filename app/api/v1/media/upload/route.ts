import { NextResponse } from "next/server";

import { baseResponse } from "@/lib/mock-api";

export async function POST() {
  return NextResponse.json(
    baseResponse({
      uploadUrl: "https://s3.amazonaws.com/pulse-platform/mock-upload",
      mediaId: "media_001",
      expiresInSeconds: 900
    }),
    { status: 201 }
  );
}
