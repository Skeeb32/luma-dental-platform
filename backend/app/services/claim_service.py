from datetime import datetime, timezone

from fastapi import HTTPException, status

from app.core.security import CurrentUser
from app.schemas.claims import AIRecommendation, ClaimUpdate, FollowUpCreate, NoteCreate


class ClaimService:
    """Business rules live here so transport handlers stay small and testable."""

    async def update_claim(self, claim_id: str, payload: ClaimUpdate, actor: CurrentUser) -> dict:
        claim = await self._find_for_org(claim_id, actor.organization_id)
        claim.update(payload.model_dump(exclude_none=True))
        claim["updated_at"] = datetime.now(timezone.utc).isoformat()
        return claim

    async def add_note(self, claim_id: str, payload: NoteCreate, actor: CurrentUser) -> dict:
        await self._find_for_org(claim_id, actor.organization_id)
        return {"id": "note_demo", "claim_id": claim_id, "body": payload.body, "author_id": actor.user_id}

    async def schedule_follow_up(self, claim_id: str, payload: FollowUpCreate, actor: CurrentUser) -> dict:
        await self._find_for_org(claim_id, actor.organization_id)
        return {"id": "evt_demo", "claim_id": claim_id, **payload.model_dump(), "created_by": actor.user_id}

    async def recommendation(self, claim_id: str, actor: CurrentUser) -> AIRecommendation:
        await self._find_for_org(claim_id, actor.organization_id)
        return AIRecommendation(
            next_action="Contact the insurance provider and request a status update.",
            reason="The claim is past the practice's 30-day follow-up threshold without a payment or denial.",
            suggested_message="Please confirm the current processing status and whether documentation is still needed.",
            confidence=0.92,
        )

    async def _find_for_org(self, claim_id: str, organization_id: str) -> dict:
        # Repository query must scope every lookup to the authenticated organization.
        if claim_id != "CLM-10482":
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Claim not found")
        return {"id": claim_id, "organization_id": organization_id, "status": "FOLLOW_UP_REQUIRED"}
