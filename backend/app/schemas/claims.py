from datetime import date, datetime
from decimal import Decimal
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field


class ClaimStatus(StrEnum):
    SUBMITTED = "SUBMITTED"
    IN_REVIEW = "IN_REVIEW"
    PENDING = "PENDING"
    DENIED = "DENIED"
    PAID = "PAID"
    FOLLOW_UP_REQUIRED = "FOLLOW_UP_REQUIRED"
    CLOSED = "CLOSED"


class ClaimListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    patient_name: str
    insurance_provider: str
    date_of_service: date
    amount_billed: Decimal
    amount_paid: Decimal
    outstanding_amount: Decimal
    status: ClaimStatus
    submitted_at: datetime
    assigned_user_name: str | None


class ClaimUpdate(BaseModel):
    status: ClaimStatus | None = None
    assigned_user_id: str | None = None


class NoteCreate(BaseModel):
    body: str = Field(min_length=1, max_length=2000)


class FollowUpCreate(BaseModel):
    scheduled_for: datetime
    channel: str = Field(pattern="^(phone|portal|fax)$")
    message: str = Field(min_length=1, max_length=2000)


class AIRecommendation(BaseModel):
    next_action: str
    reason: str
    suggested_message: str
    confidence: float = Field(ge=0, le=1)
