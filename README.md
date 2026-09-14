# Luma RCM + Lakeview Dental Supply

A dental-practice operating platform with two intentionally distinct products:

- **Luma RCM** — an interactive React revenue-cycle workspace for claims, payment posting, tasks, and explainable AI-assisted follow-up.
- **Lakeview Dental Supply** — a separate marketplace experience designed to represent a mature Django server-rendered application.

The current Next.js workspace provides a polished, data-rich product demo. The included `backend/` and `marketplace_django/` directories establish the production service boundaries, validation, role model, data model, and Django storefront ownership.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Demo routes

- `/overview` — collections dashboard with date range control, A/R aging, and priority work.
- `/claims` — search, status filtering, sorting, bulk selection, and paginated-table UX.
- `/claims/CLM-10482` — timeline, internal notes, schedule-ready follow-up, and editable AI recommendation.
- `/payments` — real-time reconciliation that prevents incomplete or over-balance allocations.
- `/tasks` — role-oriented action queue.
- `/marketplace` — a visually and structurally separate supply purchasing and shipment flow.

## Backend boundaries

- [`backend/`](./backend) holds FastAPI routes, Pydantic contracts, service-layer business rules, organization-scoped authorization, and SQLAlchemy model definitions for the RCM domain.
- [`marketplace_django/`](./marketplace_django) holds the independently deployable Django marketplace shell.

Run `npm run typecheck` to validate the frontend.
