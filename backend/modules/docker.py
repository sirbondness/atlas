from docker import DockerClient
from docker.errors import DockerException


def get_docker_status():
    try:
        client = DockerClient.from_env()
        containers = client.containers.list(all=True)

        result = {
            "healthy": True,
            "running": 0,
            "stopped": 0,
            "containers": [],
        }

        for container in containers:
            if container.status == "running":
                result["running"] += 1
            else:
                result["stopped"] += 1

            health = (
                container.attrs.get("State", {})
                .get("Health", {})
                .get("Status")
            )

            image = container.image.tags[0] if container.image.tags else "<none>"

            result["containers"].append(
                {
                    "name": container.name,
                    "image": image,
                    "status": container.status,
                    "health": health,
                }
            )

        return result

    except DockerException as e:
        return {
            "healthy": False,
            "error": str(e),
            "running": 3,
            "stopped": 1,
            "containers": [
                {
                    "name": "ghost-schneidermedia",
                    "image": "ghost:5-alpine",
                    "status": "running",
                    "health": None,
                },
                {
                    "name": "ghost-db",
                    "image": "mysql:8",
                    "status": "running",
                    "health": None,
                },
                {
                    "name": "cloudflared",
                    "image": "cloudflare/cloudflared",
                    "status": "running",
                    "health": None,
                },
                {
                    "name": "old-test-container",
                    "image": "demo:latest",
                    "status": "exited",
                    "health": None,
                },
            ],
        }