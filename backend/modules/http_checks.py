from datetime import datetime, timezone

import httpx

from models.status import ServiceStatus, Status


async def check_http_service(
    name: str,
    description: str,
    url: str,
) -> ServiceStatus:
    start = datetime.now(timezone.utc)

    try:
        async with httpx.AsyncClient(timeout=5.0, follow_redirects=True) as client:
            response = await client.get(url)

        end = datetime.now(timezone.utc)
        response_time_ms = int((end - start).total_seconds() * 1000)

        if response.status_code < 400:
            status: Status = "healthy"
        elif response.status_code < 500:
            status = "warning"
        else:
            status = "offline"

        return ServiceStatus(
            name=name,
            description=description,
            status=status,
            value=f"{response_time_ms} ms",
            response_time_ms=response_time_ms,
        )

    except Exception:
        return ServiceStatus(
            name=name,
            description=description,
            status="offline",
            value="unreachable",
            response_time_ms=None,
        )
