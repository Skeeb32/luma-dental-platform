import { NextResponse } from "next/server";

import { baseResponse } from "@/lib/mock-api";

export function GET() {
  return NextResponse.json(
    baseResponse([
      {
        id: "pay_001",
        contactId: "ct_001",
        amountCents: 129900,
        status: "paid",
        link: "https://pulse.link/pay/acme-901"
      },
      {
        id: "pay_002",
        contactId: "ct_002",
        amountCents: 24900,
        status: "pending",
        link: "https://pulse.link/pay/acme-902"
      }
    ])
  );
}
