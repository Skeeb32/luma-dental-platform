from decimal import Decimal

from pydantic import BaseModel, Field, model_validator


class PaymentAllocationInput(BaseModel):
    claim_id: str
    amount: Decimal = Field(gt=0, decimal_places=2)


class PaymentAllocationRequest(BaseModel):
    allocations: list[PaymentAllocationInput] = Field(min_length=1)

    @model_validator(mode="after")
    def claims_must_be_unique(self):
        if len({allocation.claim_id for allocation in self.allocations}) != len(self.allocations):
            raise ValueError("A claim may receive only one allocation per request")
        return self
