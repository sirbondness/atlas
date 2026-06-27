from datetime import datetime, timezone
from typing import Any

from docker import DockerClient


def _format_age(timestamp: str | None) -> str | None:
    if not timestamp:
        return None

    try:
        created = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
        delta = datetime.now(timezone.utc) - created

        if delta.days > 0:
            return f"{delta.days}d ago"

        hours = delta.seconds // 3600
        if hours > 0:
            return f"{hours}h ago"

        return f"{delta.seconds // 60}m ago"

    except Exception:
        return None


def _get_ports(attrs: dict[str, Any]) -> list[str]:
    ports = attrs.get("NetworkSettings", {}).get("Ports", {})
    result = []

    for container_port, bindings in ports.items():
        if bindings:
            for binding in bindings:
                result.append(
                    f"{binding['HostIp']}:{binding['HostPort']}->{container_port}"
                )
        else:
            result.append(container_port)

    return result


def _get_networks(attrs: dict[str, Any]) -> list[str]:
    return list(
        attrs.get("NetworkSettings", {})
        .get("Networks", {})
        .keys()
    )


def get_inventory():
    client = DockerClient.from_env()

    images = client.images.list()
    containers = client.containers.list(all=True)

    result = {
        "healthy": True,
        "running": 0,
        "stopped": 0,
        "images": len(images),
        "containers": [],
    }

    for container in containers:

        attrs = container.attrs
        state = attrs["State"]

        if container.status == "running":
            result["running"] += 1
        else:
            result["stopped"] += 1

        result["containers"].append(
            {
                "id": container.short_id,
                "name": container.name,
                "image": container.image.tags[0]
                if container.image.tags
                else "<none>",
                "status": container.status,
                "health": state.get("Health", {}).get("Status"),
                "created": _format_age(attrs.get("Created")),
                "uptime": _format_age(state.get("StartedAt")),
                "restart_count": attrs.get("RestartCount", 0),
                "ports": _get_ports(attrs),
                "networks": _get_networks(attrs),
            }
        )

    return result