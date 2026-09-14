from fastapi import FastAPI

from app.api.routes import claims, dashboard, payments

app = FastAPI(title="Luma RCM API", version="1.0.0")
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(claims.router, prefix="/api/claims", tags=["claims"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])


@app.get("/health")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
