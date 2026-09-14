# Luma RCM API

FastAPI is the transactional API for the React RCM application. Its route handlers are deliberately thin: authorization is injected at the boundary, validation lives in Pydantic schemas, and claim/payment rules live in services. All database reads and writes must be scoped to the caller's organization.

## Local start

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The included routes show the core contracts for dashboard metrics, claims, follow-ups, AI recommendations, and atomic payment allocation. Configure an async PostgreSQL engine and Alembic migration environment before connecting production data.
