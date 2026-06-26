from fastapi import APIRouter

from modules.docker import get_docker_status

router = APIRouter(prefix="/api/v1/docker", tags=["docker"])


@router.get("")
async def docker_status():
    return get_docker_status()
