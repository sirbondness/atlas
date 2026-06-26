import "./App.css";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "./config";
import type { ApiStatusResponse } from "./types/service";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { ServiceCard } from "./components/ServiceCard";
import { SummaryCard } from "./components/SummaryCard";
import { StatusDot } from "./components/StatusDot";

import { network, services, summaryItems } from "./data/mockData";

function App() {
  const [apiData, setApiData] = useState<ApiStatusResponse | null>(null);

useEffect(() => {
  fetch(`${API_BASE_URL}/api/status`)
    .then((res) => res.json())
    .then(setApiData)
    .catch(console.error);
}, []);

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
