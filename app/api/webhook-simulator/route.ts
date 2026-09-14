import { NextRequest, NextResponse } from "next/server";

import { baseResponse } from "@/lib/mock-api";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json(
    baseResponse({
      accepted: true,
      receivedEvent: body.event ?? "message.received",
      payload: body.payload ?? {
        messageId: "msg_901",
        conversationId: "cnv_001",
        tenantId: "tenant_acme_001"
      }
    })
  );
}
