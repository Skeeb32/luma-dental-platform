from enum import StrEnum

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


class Role(StrEnum):
    ADMIN = "ADMIN"
    PRACTICE_MANAGER = "PRACTICE_MANAGER"
    BILLING_SPECIALIST = "BILLING_SPECIALIST"
    STAFF = "STAFF"


class CurrentUser:
    """The production implementation is populated from a verified access token."""

    def __init__(self, user_id: str, organization_id: str, role: Role):
        self.user_id = user_id
        self.organization_id = organization_id
        self.role = role


bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(_: HTTPAuthorizationCredentials | None = Depends(bearer_scheme)) -> CurrentUser:
    # Local demo identity. Replace with JWT verification and a user lookup in deployment.
    return CurrentUser(user_id="usr_elena", organization_id="org_lakeview", role=Role.PRACTICE_MANAGER)


def require_roles(*allowed: Role):
    def authorize(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
        if user.role not in allowed:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return user
    return authorize
