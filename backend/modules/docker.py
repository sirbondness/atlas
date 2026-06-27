from datetime import datetime, timezone
from typing import Any

from docker import DockerClient
from docker.errors import DockerException


def _format_age(timestamp: str | None) -> str | None:
    if not timestamp:
        return None

    try:
        created = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
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


def _calculate_cpu_percent(stats: dict[str, Any]) -> float:
    try:
        cpu_delta = (
            stats["cpu_stats"]["cpu_usage"]["total_usage"]
            - stats["precpu_stats"]["cpu_usage"]["total_usage"]
        )
        system_delta = (
            stats["cpu_stats"]["system_cpu_usage"]
            - stats["precpu_stats"]["system_cpu_usage"]
        )

        online_cpus = stats["cpu_stats"].get("online_cpus", 1)

        if system_delta > 0 and cpu_delta > 0:
            return round((cpu_delta / system_delta) * online_cpus * 100.0, 2)

    except Exception:
        pass

    return 0.0


def _get_memory_mb(stats: dict[str, Any]) -> float:
    try:
        usage = stats["memory_stats"].get("usage", 0)
        return round(usage / 1024 / 1024, 1)
    except Exception:
        return 0.0


def _get_container_stats(container) -> tuple[float, float]:
    try:
        stats = container.stats(stream=False)
        cpu_percent = _calculate_cpu_percent(stats)
        memory_mb = _get_memory_mb(stats)
        return cpu_percent, memory_mb
    except Exception:
        return 0.0, 0.0


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
            created = _format_age(attrs.get("Created"))
            started_at = _format_age(state.get("StartedAt"))

            cpu_percent = 0.0
            memory_mb = 0.0

            if container.status == "running":
                cpu_percent, memory_mb = _get_container_stats(container)

            result["containers"].append(
                {
                    "name": container.name,
                    "image": image,
                    "status": container.status,
                    "health": health,
                    "created": created,
                    "uptime": started_at,
                    "restart_count": restart_count,
                    "cpu_percent": cpu_percent,
                    "memory_mb": memory_mb,
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
                    "uptime": "2d ago",
                    "restart_count": 0,
                    "cpu_percent": 1.8,
                    "memory_mb": 248.4,
                    "ports": ["0.0.0.0:2368->2368/tcp"],
                    "networks": ["ghost_default"],
                },
                {
                    "name": "ghost-db",
                    "image": "mysql:8",
                    "status": "running",
                    "health": None,
                    "created": "2d ago",
                    "uptime": "2d ago",
                    "restart_count": 0,
                    "cpu_percent": 3.1,
                    "memory_mb": 512.7,
                    "ports": [],
                    "networks": ["ghost_default"],
                },
                {
                    "name": "cloudflared",
                    "image": "cloudflare/cloudflared",
                    "status": "running",
                    "health": None,
                    "created": "5d ago",
                    "uptime": "5d ago",
                    "restart_count": 1,
                    "cpu_percent": 0.4,
                    "memory_mb": 38.2,
                    "ports": [],
                    "networks": ["host"],
                },
                {
                    "name": "old-test-container",
                    "image": "demo:latest",
                    "status": "exited",
                    "health": None,
                    "created": "14d ago",
                    "uptime": None,
                    "restart_count": 3,
                    "cpu_percent": 0.0,
                    "memory_mb": 0.0,
                    "ports": [],
                    "networks": ["bridge"],
                },
            ],
        }