from typing import Literal
from pydantic import BaseModel

Status = Literal["healthy", "warning", "offline"]


class ServiceStatus(BaseModel):
    name: str
    description: str
    status: Status
    value: str
    response_time_ms: int | None = None


class StatusResponse(BaseModel):
    updated_at: str
    overall_status: Status
    services: list[ServiceStatus]
