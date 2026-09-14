from fastapi import APIRouter, Depends

from app.core.security import CurrentUser, get_current_user

router = APIRouter()


@router.get("/metrics")
async def metrics(range: str = "last_30_days", user: CurrentUser = Depends(get_current_user)) -> dict:
    return {"range": range, "organization_id": user.organization_id, "outstanding_claims": 48430, "follow_up_required": 14, "payments_received": 31280, "unreconciled_payments": 5740, "days_in_ar": 26, "collection_rate": 94.2}
