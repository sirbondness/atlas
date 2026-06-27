from docker import DockerClient


def get_metrics():
    client = DockerClient.from_env()

    metrics = {}

    for container in client.containers.list():

        try:
            stats = container.stats(stream=False)

            usage = stats["memory_stats"].get("usage", 0)

            metrics[container.short_id] = {
                "cpu_percent": 0.0,
                "memory_mb": round(usage / 1024 / 1024, 1),
            }

        except Exception:

            metrics[container.short_id] = {
                "cpu_percent": 0.0,
                "memory_mb": 0.0,
            }

    return metrics