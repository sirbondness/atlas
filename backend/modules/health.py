from models.status import ServiceStatus, Status


def calculate_overall_status(services: list[ServiceStatus]) -> Status:
    if any(service.status == "offline" for service in services):
        return "offline"

    if any(service.status == "warning" for service in services):
        return "warning"

    return "healthy"

