from fastapi import APIRouter, Depends

from app.core.security import CurrentUser, Role, require_roles
from app.schemas.payments import PaymentAllocationRequest
from app.services.payment_service import PaymentService

router = APIRouter()
service = PaymentService()
billing_user = require_roles(Role.ADMIN, Role.PRACTICE_MANAGER, Role.BILLING_SPECIALIST)


@router.post("/{payment_id}/allocate")
async def allocate_payment(payment_id: str, payload: PaymentAllocationRequest, user: CurrentUser = Depends(billing_user)) -> dict:
    return await service.allocate(payment_id, payload, user)
