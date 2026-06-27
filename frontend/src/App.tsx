import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { ServiceCard } from "./components/ServiceCard";
import { SummaryCard } from "./components/SummaryCard";
import { StatusDot } from "./components/StatusDot";
import { useAtlasData } from "./hooks/useAtlasData";
import { network, services, summaryItems } from "./data/mockData";



function App() {
  const { statusData: apiData, dockerData, lastUpdated } = useAtlasData();

  const healthScore = dockerData?.healthy === false ? 85 : 98;

const liveServices = apiData
  ? apiData.services.map((apiService) => {
      const mockService = services.find((s) => s.name === apiService.name);

      return {
        ...apiService,
        icon: mockService?.icon ?? services[0].icon,
      };
    })
  : services;

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Topbar />

        <section className="health-card">
          <div>
            <span>Infrastructure Score</span>
            <strong>{healthScore}%</strong>
          </div>

          <div className="health-bar">
            <div style={{ width: `${healthScore}%` }} />
          </div>

        <p>
          Last updated:{" "}
          {lastUpdated
          ? lastUpdated.toLocaleTimeString("de-CH")
          : "waiting for data"}
        </p>
          </section>

        <section className="summary-grid">
          {summaryItems.map((item) => (
            <SummaryCard item={item} key={item.label} />
          ))}
        </section>

        <section className="section-header">
          <div>
            <h2>Infrastructure</h2>
            <p>Core systems and self-hosted services.</p>
          </div>
          <span>Last updated just now</span>
        </section>

        <section className="cards-grid">
          {liveServices.map((service) => (
          <ServiceCard key={service.name} service={service} />
          ))}
        </section>

        <section className="lower-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>Network Paths</h2>
              <p>Multi-WAN connectivity overview.</p>
            </div>

            <div className="network-list">
              {network.map((item) => (
                <div className="network-row" key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.value}</span>
                  </div>
                  <StatusDot status={item.status} />
                </div>
              ))}
            </div>
          </div>

<div className="panel">
  <div className="panel-header">
    <h2>Docker Engine</h2>
    <p>Container runtime overview.</p>
  </div>

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
    {dockerData.containers.map((container) => (
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
    ))}
  </div>
</>
) : (
  <p>Loading Docker data...</p>
)}

</div>

          <div className="panel">
            <div className="panel-header">
              <h2>Vehicle</h2>
              <p>Mazda 6e telemetry preview.</p>
            </div>

            <div className="vehicle">
              <div className="battery-ring">78%</div>
              <div>
                <h3>Mazda 6e</h3>
                <p>Parked at home</p>
                <span>Estimated range: 295 km</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
