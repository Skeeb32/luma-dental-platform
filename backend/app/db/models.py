"""Core SQLAlchemy data model. Alembic migrations own schema changes in production."""

from datetime import datetime
from decimal import Decimal
from uuid import uuid4

from sqlalchemy import DateTime, ForeignKey, Index, Numeric, String, Text, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


def uuid() -> str:
    return str(uuid4())


class Organization(Base):
    __tablename__ = "organizations"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    name: Mapped[str] = mapped_column(String(120))


class User(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    role: Mapped[str] = mapped_column(String(32), index=True)


class Practice(Base):
    __tablename__ = "practices"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True)
    name: Mapped[str] = mapped_column(String(150))


class Patient(Base):
    __tablename__ = "patients"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True)
    practice_id: Mapped[str] = mapped_column(ForeignKey("practices.id"), index=True)
    display_name: Mapped[str] = mapped_column(String(150), index=True)


class InsuranceProvider(Base):
    __tablename__ = "insurance_providers"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    name: Mapped[str] = mapped_column(String(150), unique=True)
    payer_id: Mapped[str] = mapped_column(String(40), unique=True)


class Claim(Base):
    __tablename__ = "claims"
    __table_args__ = (
        Index("ix_claim_org_status", "organization_id", "status"),
        Index("ix_claim_org_submitted", "organization_id", "submitted_at"),
        Index("ix_claim_payer", "insurance_provider_id"),
        Index("ix_claim_patient", "patient_id"),
    )
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"))
    patient_id: Mapped[str] = mapped_column(ForeignKey("patients.id"))
    insurance_provider_id: Mapped[str] = mapped_column(ForeignKey("insurance_providers.id"))
    assigned_user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"))
    status: Mapped[str] = mapped_column(String(32), index=True)
    amount_billed: Mapped[Decimal] = mapped_column(Numeric(12, 2))
    amount_paid: Mapped[Decimal] = mapped_column(Numeric(12, 2), default=0)
    outstanding_amount: Mapped[Decimal] = mapped_column(Numeric(12, 2))
    submitted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class ClaimNote(Base):
    __tablename__ = "claim_notes"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    claim_id: Mapped[str] = mapped_column(ForeignKey("claims.id"), index=True)
    author_id: Mapped[str] = mapped_column(ForeignKey("users.id"))
    body: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class ClaimEvent(Base):
    __tablename__ = "claim_events"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    claim_id: Mapped[str] = mapped_column(ForeignKey("claims.id"), index=True)
    event_type: Mapped[str] = mapped_column(String(60))
    payload: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Payment(Base):
    __tablename__ = "payments"
    __table_args__ = (Index("ix_payment_org_status", "organization_id", "status"),)
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"))
    insurance_provider_id: Mapped[str] = mapped_column(ForeignKey("insurance_providers.id"))
    status: Mapped[str] = mapped_column(String(32), index=True)
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2))


class PaymentAllocation(Base):
    __tablename__ = "payment_allocations"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    payment_id: Mapped[str] = mapped_column(ForeignKey("payments.id"), index=True)
    claim_id: Mapped[str] = mapped_column(ForeignKey("claims.id"), index=True)
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2))


class Task(Base):
    __tablename__ = "tasks"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True)
    claim_id: Mapped[str | None] = mapped_column(ForeignKey("claims.id"), index=True)
    owner_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"))
    title: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(32), index=True)


class Product(Base):
    __tablename__ = "products"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    sku: Mapped[str] = mapped_column(String(64), unique=True)
    name: Mapped[str] = mapped_column(String(255), index=True)
    unit_price: Mapped[Decimal] = mapped_column(Numeric(12, 2))


class Order(Base):
    __tablename__ = "orders"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True)
    status: Mapped[str] = mapped_column(String(32), index=True)
    placed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class OrderItem(Base):
    __tablename__ = "order_items"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid)
    order_id: Mapped[str] = mapped_column(ForeignKey("orders.id"), index=True)
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"))
    quantity: Mapped[int] = mapped_column()
    unit_price: Mapped[Decimal] = mapped_column(Numeric(12, 2))
