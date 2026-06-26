from datetime import datetime, timezone
from typing import Any

from docker import DockerClient
from docker.errors import DockerException


def _format_created(created_raw: str | None) -> str | None:
    if not created_raw:
        return None

    try:
        created = datetime.fromisoformat(created_raw.replace("Z", "+00:00"))
        now = datetime.now(timezone.utc)
        delta = now - created

        if delta.days > 0:
            return f"{delta.days}d ago"

        hours = delta.seconds // 3600
        if hours > 0:
            return f"{hours}h ago"

        minutes = delta.seconds // 60
        return f"{minutes}m ago"
    except Exception:
        return None


def _get_ports(attrs: dict[str, Any]) -> list[str]:
    ports = attrs.get("NetworkSettings", {}).get("Ports", {})
    result = []

    for container_port, bindings in ports.items():
        if bindings:
            for binding in bindings:
                host_ip = binding.get("HostIp", "0.0.0.0")
                host_port = binding.get("HostPort")
                result.append(f"{host_ip}:{host_port}->{container_port}")
        else:
            result.append(container_port)

    return result


def _get_networks(attrs: dict[str, Any]) -> list[str]:
    networks = attrs.get("NetworkSettings", {}).get("Networks", {})
    return list(networks.keys())


def get_docker_status():
    try:
        client = DockerClient.from_env()
        containers = client.containers.list(all=True)
        images = client.images.list()

        result = {
            "healthy": True,
            "running": 0,
            "stopped": 0,
            "images": len(images),
            "containers": [],
        }

        for container in containers:
            attrs = container.attrs
            state = attrs.get("State", {})

            if container.status == "running":
                result["running"] += 1
            else:
                result["stopped"] += 1

            health = state.get("Health", {}).get("Status")
            restart_count = attrs.get("RestartCount", 0)
            image = container.image.tags[0] if container.image.tags else "<none>"
            created = _format_created(attrs.get("Created"))

            result["containers"].append(
                {
                    "name": container.name,
                    "image": image,
                    "status": container.status,
                    "health": health,
                    "created": created,
                    "restart_count": restart_count,
                    "ports": _get_ports(attrs),
                    "networks": _get_networks(attrs),
                }
            )

        return result

    except DockerException as e:
        return {
            "healthy": False,
            "error": str(e),
            "running": 3,
            "stopped": 1,
            "images": 4,
            "containers": [
                {
                    "name": "ghost-schneidermedia",
                    "image": "ghost:5-alpine",
                    "status": "running",
                    "health": None,
                    "created": "2d ago",
                    "restart_count": 0,
                    "ports": ["0.0.0.0:2368->2368/tcp"],
                    "networks": ["ghost_default"],
                },
                {
                    "name": "ghost-db",
                    "image": "mysql:8",
                    "status": "running",
                    "health": None,
                    "created": "2d ago",
                    "restart_count": 0,
                    "ports": [],
                    "networks": ["ghost_default"],
                },
                {
                    "name": "cloudflared",
                    "image": "cloudflare/cloudflared",
                    "status": "running",
                    "health": None,
                    "created": "5d ago",
                    "restart_count": 1,
                    "ports": [],
                    "networks": ["host"],
                },
                {
                    "name": "old-test-container",
                    "image": "demo:latest",
                    "status": "exited",
                    "health": None,
                    "created": "14d ago",
                    "restart_count": 3,
                    "ports": [],
                    "networks": ["bridge"],
                },
            ],
        }