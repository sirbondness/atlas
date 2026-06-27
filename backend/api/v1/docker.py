from fastapi import APIRouter
from docker.errors import DockerException

from services.docker_inventory import get_inventory
from services.docker_metrics import get_metrics

router = APIRouter(prefix="/api/v1/docker", tags=["docker"])


@router.get("")
async def docker_inventory():
    try:
        return get_inventory()
    except DockerException as e:
        return {
            "healthy": False,
            "error": str(e),
            "running": 0,
            "stopped": 0,
            "images": 0,
            "containers": [],
        }


@router.get("/metrics")
async def docker_metrics():
    try:
        return get_metrics()
    except DockerException as e:
        return {
            "healthy": False,
            "error": str(e),
            "metrics": {},
        }