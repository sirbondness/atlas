import { LiveClock } from "./LiveClock";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Unified Infrastructure Dashboard</p>
        <h1>{getGreeting()}, Alexander</h1>
        <p className="intro">
          Everything looks healthy. Your self-hosted services, network paths,
          containers and vehicle telemetry are monitored from one central place.
        </p>
      </div>

      <div className="topbar-actions">
        <LiveClock />

        <div className="overall">
          <span className="pulse" />
          All systems operational
        </div>
      </div>
    </header>
  );
}
