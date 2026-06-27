import type { DockerStatus } from "../../types/docker";
import { Card, CardBody, CardHeader } from "../UI/Card";
import type { DockerMetrics } from "../../client/atlasClient";
import { useMemo, useState } from "react";

type DockerCardProps = {
  dockerData: DockerStatus | null;
  dockerMetrics: DockerMetrics | null;
};

export function DockerCard({ dockerData, dockerMetrics }: DockerCardProps) {
  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
  "all" | "running" | "stopped" | "healthy"
  >("all");
  const filteredContainers = useMemo(() => {
  if (!dockerData) return [];

  return dockerData.containers.filter((container) => {
    const matchesSearch = container.name
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchesFilter = true;

    switch (filter) {
      case "running":
        matchesFilter = container.status === "running";
        break;

      case "stopped":
        matchesFilter = container.status !== "running";
        break;

      case "healthy":
        matchesFilter = container.health === "healthy";
        break;

      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });
}, [dockerData, search, filter]);
  return (
  
  <Card>
    <CardHeader
      title="Docker Engine"
      description="Container runtime overview."
      action={dockerData?.healthy ? "Healthy" : "Degraded"}
    />

    <CardBody>

      {dockerData ? (
        <>
          <div className="docker-stats">
            <div>
              <span>Running</span>
              <strong>{dockerData.running}</strong>
            </div>
            <div>
              <span>Stopped</span>
              <strong>{dockerData.stopped}</strong>
            </div>
            <div>
              <span>Images</span>
              <strong>{dockerData.images}</strong>
            </div>
          </div>

            <div className="docker-toolbar">
              <input
                type="text"
                placeholder="🔍 Search containers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(
                    e.target.value as
                    | "all"
                    | "running"
                    | "stopped"
                    | "healthy"
                  )
                }
              >
                <option value="all">All</option>
                <option value="running">Running</option>
                <option value="stopped">Stopped</option>
                <option value="healthy">Healthy</option>
                </select>
              </div>

          <div className="container-list">
            {filteredContainers.map((container) => {
            const metrics = dockerMetrics?.[container.id];

            return (
              <div className="container-row" key={container.name}>
                <div className="container-main">
                  <div>
                    <strong>{container.name}</strong>
                    <span>{container.image}</span>
                  </div>

                  <span
                    className={
                      container.status === "running"
                        ? "status status-healthy"
                        : "status status-offline"
                    }
                  >
                    ● {container.status}
                  </span>
                </div>

                <div className="container-metrics">
                    <div>
                        <span>CPU</span>
                        <strong>{metrics?.cpu_percent ?? 0}%</strong>
                    </div>
                <div>
                    <span>Memory</span>
                    <strong>{metrics?.memory_mb ?? 0} MB</strong>
                </div>
                <div>
                <span>Uptime</span>
                <strong>{container.uptime || "n/a"}</strong>
                </div>
            </div>

            <div className="container-meta">
                <span>Created: {container.created || "n/a"}</span>
                <span>Restarts: {container.restart_count}</span>
                <span>Networks: {container.networks.join(", ") || "n/a"}</span>
            </div>

                {container.ports.length > 0 && (
                  <div className="container-ports">
                    {container.ports.map((port) => (
                      <span key={port}>{port}</span>
                    ))}
                  </div>
                )}
              </div>
        );
      })}
          </div>
        </>
      ) :(
        <p>Loading Docker data...</p>
      )}
    </CardBody>
 </Card>
  );
}