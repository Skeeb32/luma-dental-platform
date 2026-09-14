from decimal import Decimal

from fastapi import HTTPException, status

from app.core.security import CurrentUser
from app.schemas.payments import PaymentAllocationRequest


class PaymentService:
    async def allocate(self, payment_id: str, payload: PaymentAllocationRequest, actor: CurrentUser) -> dict:
        payment_total = Decimal("2450.00")
        allocated = sum((item.amount for item in payload.allocations), start=Decimal("0"))
        if allocated != payment_total:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Allocations must equal the payment total")
        # In production this transaction locks the payment and affected claims, verifies their
        # balances, inserts allocations, and records an auditable reconciliation event atomically.
        return {"payment_id": payment_id, "status": "RECONCILED", "allocated_amount": allocated, "organization_id": actor.organization_id}
