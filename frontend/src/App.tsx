import {
  Activity,
  Car,
  Cloud,
  Container,
  Gauge,
  Globe,
  HardDrive,
  Home,
  Network,
  Server,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import "./App.css";

type Status = "healthy" | "warning" | "offline";

const services = [
  {
    name: "Ghost CMS",
    description: "Personal website",
    status: "healthy" as Status,
    value: "22 ms",
    icon: Globe,
  },
  {
    name: "Nextcloud",
    description: "Private cloud",
    status: "healthy" as Status,
    value: "31 ms",
    icon: Cloud,
  },
  {
    name: "Cloudflare Tunnel",
    description: "Secure publishing",
    status: "healthy" as Status,
    value: "Connected",
    icon: ShieldCheck,
  },
  {
    name: "Docker",
    description: "Container runtime",
    status: "warning" as Status,
    value: "18 running",
    icon: Container,
  },
  {
    name: "Proxmox",
    description: "Virtualization platform",
    status: "healthy" as Status,
    value: "7 guests",
    icon: Server,
  },
  {
    name: "Mazda 6e",
    description: "Vehicle telemetry",
    status: "healthy" as Status,
    value: "78%",
    icon: Car,
  },
];

const network = [
  { name: "Swisscom", value: "Online", status: "healthy" as Status },
  { name: "Starlink", value: "Online", status: "healthy" as Status },
  { name: "5G Backup", value: "Standby", status: "warning" as Status },
];

function StatusDot({ status }: { status: Status }) {
  const label =
    status === "healthy"
      ? "Healthy"
      : status === "warning"
      ? "Warning"
      : "Offline";

  return <span className={`status status-${status}`}>● {label}</span>;
}

function Sidebar() {
  const items = [
    { label: "Dashboard", icon: Gauge },
    { label: "Infrastructure", icon: Server },
    { label: "Network", icon: Network },
    { label: "Containers", icon: Container },
    { label: "Vehicle", icon: Car },
    { label: "Monitoring", icon: Activity },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">▲</div>
        <div>
          <div className="brand-title">ATLAS</div>
          <div className="brand-subtitle">Infrastructure</div>
        </div>
      </div>

      <nav>
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <a className={index === 0 ? "nav-item active" : "nav-item"} key={item.label}>
              <Icon size={18} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const Icon = service.icon;

  return (
    <article className="card">
      <div className="card-top">
        <div className="icon-box">
          <Icon size={22} />
        </div>
        <StatusDot status={service.status} />
      </div>

      <h3>{service.name}</h3>
      <p>{service.description}</p>

      <div className="metric">{service.value}</div>
    </article>
  );
}

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Unified Infrastructure Dashboard</p>
            <h1>Atlas</h1>
            <p className="intro">
              A single operational view for self-hosted services, networking,
              containers, automation and vehicle telemetry.
            </p>
          </div>

          <div className="overall">
            <span className="pulse" />
            All systems operational
          </div>
        </header>

        <section className="summary-grid">
          <div className="summary-card">
            <Wifi size={22} />
            <div>
              <span>Internet</span>
              <strong>Online</strong>
            </div>
          </div>

          <div className="summary-card">
            <ShieldCheck size={22} />
            <div>
              <span>Security</span>
              <strong>Cloudflare</strong>
            </div>
          </div>

          <div className="summary-card">
            <HardDrive size={22} />
            <div>
              <span>Storage</span>
              <strong>62%</strong>
            </div>
          </div>

          <div className="summary-card">
            <Home size={22} />
            <div>
              <span>Home Assistant</span>
              <strong>Running</strong>
            </div>
          </div>
        </section>

        <section className="section-header">
          <div>
            <h2>Infrastructure</h2>
            <p>Core systems and self-hosted services.</p>
          </div>
          <span>Last updated just now</span>
        </section>

        <section className="cards-grid">
          {services.map((service) => (
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