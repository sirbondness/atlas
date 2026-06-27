import type { DockerStatus } from "../../types/docker";
import { Card, CardBody, CardHeader } from "../UI/Card";
import type { DockerMetrics } from "../../client/atlasClient";

type DockerCardProps = {
  dockerData: DockerStatus | null;
  dockerMetrics: DockerMetrics | null;
};

export function DockerCard({ dockerData, dockerMetrics }: DockerCardProps) {
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

          <div className="container-list">
            {dockerData.containers.map((container) => {
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