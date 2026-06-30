import type { DockerMetrics } from "../../client/atlasClient";
import type { DockerContainer } from "../../types/docker";

type Props = {
  container: DockerContainer | null;
  metrics: DockerMetrics | null;
  onClose: () => void;
};

export function DockerDetailsDrawer({ container, metrics, onClose }: Props) {
  if (!container) return null;

  const m = metrics?.[container.id];
  const isRunning = container.status === "running";

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <span className="drawer-eyebrow">Container Details</span>
            <h2>{container.name}</h2>
          </div>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="drawer-status">
          <span
            className={
              isRunning ? "status status-healthy" : "status status-offline"
            }
          >
            ● {container.status}
          </span>
          <span>{container.image}</span>
        </div>

        <div className="drawer-metrics">
          <div>
            <span>CPU</span>
            <strong>{m?.cpu_percent ?? 0}%</strong>
          </div>
          <div>
            <span>Memory</span>
            <strong>{m?.memory_mb ?? 0} MB</strong>
          </div>
          <div>
            <span>Uptime</span>
            <strong>{container.uptime || "n/a"}</strong>
          </div>
        </div>

        <section className="drawer-section">
          <h3>Runtime</h3>

          <div className="drawer-info-grid">
            <div>
              <span>Created</span>
              <strong>{container.created || "n/a"}</strong>
            </div>
            <div>
              <span>Restart Count</span>
              <strong>{container.restart_count}</strong>
            </div>
            <div>
              <span>Health</span>
              <strong>{container.health || "n/a"}</strong>
            </div>
          </div>
        </section>

        <section className="drawer-section">
          <h3>Networking</h3>

          <div className="drawer-list">
            <span>Networks</span>
            <strong>{container.networks.join(", ") || "n/a"}</strong>
          </div>

          <div className="drawer-list">
            <span>Ports</span>
            <strong>{container.ports.join(", ") || "n/a"}</strong>
          </div>
        </section>

        <section className="drawer-section">
          <h3>Actions</h3>

          <div className="drawer-actions">
            <button disabled>Logs</button>
            <button disabled>Restart</button>
            <button disabled>Stop</button>
          </div>
        </section>
      </aside>
    </div>
  );
}