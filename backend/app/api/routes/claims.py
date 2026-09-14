from fastapi import APIRouter, Depends, status

from app.core.security import CurrentUser, Role, require_roles
from app.schemas.claims import AIRecommendation, ClaimUpdate, FollowUpCreate, NoteCreate
from app.services.claim_service import ClaimService

router = APIRouter()
service = ClaimService()
billing_user = require_roles(Role.ADMIN, Role.PRACTICE_MANAGER, Role.BILLING_SPECIALIST)


@router.get("")
async def list_claims(page: int = 1, page_size: int = 25, status_filter: str | None = None, user: CurrentUser = Depends(billing_user)) -> dict:
    return {"data": [], "meta": {"page": page, "page_size": page_size, "status": status_filter, "organization_id": user.organization_id}}


@router.patch("/{claim_id}")
async def update_claim(claim_id: str, payload: ClaimUpdate, user: CurrentUser = Depends(billing_user)) -> dict:
    return await service.update_claim(claim_id, payload, user)


@router.post("/{claim_id}/notes", status_code=status.HTTP_201_CREATED)
async def add_note(claim_id: str, payload: NoteCreate, user: CurrentUser = Depends(billing_user)) -> dict:
    return await service.add_note(claim_id, payload, user)


@router.post("/{claim_id}/follow-up", status_code=status.HTTP_201_CREATED)
async def follow_up(claim_id: str, payload: FollowUpCreate, user: CurrentUser = Depends(billing_user)) -> dict:
    return await service.schedule_follow_up(claim_id, payload, user)


@router.get("/{claim_id}/ai-recommendation", response_model=AIRecommendation)
async def ai_recommendation(claim_id: str, user: CurrentUser = Depends(billing_user)) -> AIRecommendation:
    return await service.recommendation(claim_id, user)
