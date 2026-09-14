# Luma Dental Platform Architecture

## Product thesis

Luma is a multi-tenant dental operations platform. It separates two products that have different delivery and rendering needs:

- A modern RCM workspace for teams managing insurance claims and remittances.
- A mature, server-rendered supply marketplace that can evolve independently.
- Tenant-safe access controls, auditable posting workflows, and explainable AI recommendations.

## Recommended stack

- RCM frontend: React, TypeScript, TanStack Router/Query, React Hook Form, Zod, Vite
- RCM backend: FastAPI, Pydantic, SQLAlchemy, Alembic, PostgreSQL
- Marketplace: Django templates plus narrowly scoped bundled JavaScript
- Async work: Celery/RQ worker with PostgreSQL outbox records for payer imports, EOB processing, and notifications
- Identity: JWT/OIDC with organization claims and server-enforced RBAC

## Domain modules

1. Identity and tenancy — organization/practice scoping, roles, audit ledger, SSO.
2. Claims — submission state, status history, documents, notes, payer follow-up, assignment.
3. Payments — EOB ingestion, allocations, balancing, reconciliation, exception handling.
4. Revenue intelligence — A/R aging snapshots, collection metrics, responsible queues, AI recommendations.
5. Supply marketplace — catalog, contract pricing, orders, shipment status, reordering.

## Scalability notes

- Queue payer portal imports, ERA/EOB parsing, task escalations, and analytics aggregation through a durable worker.
- Use an outbox record and idempotency key around every payment allocation.
- Keep claim list queries backed by compound organization/status/submission indexes.
- Materialize aging and collection metrics so a reporting query never blocks a payment-posting transaction.

## Security model

- Signed JWT/OIDC sessions include organization and role claims.
- FastAPI dependencies authorize every endpoint independent of hidden frontend controls.
- Payment allocation uses a database transaction with row-level claim locks and an audit event.
- AI recommendations are advisory, store their prompt/output provenance, and require a human review before outreach.

## AWS deployment shape

- ALB -> Next.js web tier and NestJS API tier
- ECS or EKS for horizontally scaled services
- RDS PostgreSQL with read replica for analytics-heavy reads
- ElastiCache Redis for caching, presence, and job state
- MSK or Amazon MQ depending on Kafka vs RabbitMQ choice
- S3 for MMS media, exports, and report snapshots
- CloudWatch + OpenTelemetry for logs, traces, and alerts
