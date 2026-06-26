from datetime import datetime, timezone

from fastapi import APIRouter

from models.status import StatusResponse
from modules.health import calculate_overall_status
from modules.http_checks import check_http_service

router = APIRouter(prefix="/api", tags=["status"])


@router.get("/status", response_model=StatusResponse)
async def get_status():
    services = [
        await check_http_service(
            "Ghost CMS",
            "Personal website",
            "https://schneidermedia.org",
        ),
        await check_http_service(
            "Nextcloud",
            "Private cloud",
            "https://alexschneider.xyz",
        ),
    ]

    return StatusResponse(
        updated_at=datetime.now(timezone.utc).isoformat(),
        overall_status=calculate_overall_status(services),
        services=services,
    )
