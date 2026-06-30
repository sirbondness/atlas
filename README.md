# Atlas

> **A modern Infrastructure Operations Center for Docker, Proxmox, Cloudflare, Home Assistant, Splunk, network devices, and homelabs.**

Atlas is an open-source monitoring platform built for infrastructure enthusiasts, homelab operators, and IT professionals who want a single, modern interface to monitor and manage their environment.

> **Status:** 🚧 Active Development (v0.2.0)

---

## Dashboard

![Atlas Dashboard](screenshots/dashboard-overview.png)

## Features

### Available

### Docker Monitoring

Atlas currently includes a modern Docker monitoring dashboard featuring:

- Inventory overview
- Search
- Filtering
- Sorting
- Detail drawer
- Health monitoring

![Docker Dashboard](screenshots/docker-dashboard.png)

![Docker Container Details](screenshots/docker-details.png)

### Planned

* 🖥️ Proxmox VE
* ☁️ Cloudflare
* 🏠 Home Assistant
* 🚗 Mazda Connected Services
* 📊 Splunk Enterprise
* 🌐 MikroTik & UniFi Network Monitoring

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite

### Backend

* FastAPI
* Docker SDK
* Python

### Development

* Docker Compose
* Dev Containers
* GitHub Projects

---

## Quick Start

Clone the repository:

```bash
git clone https://github.com/sirbondness/atlas.git
cd atlas
```

Start the development environment:

```bash
docker compose up --build
```

Frontend:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:8000
```

---

## Project Structure

```text
atlas/

├── frontend/
│   ├── components/
│   ├── hooks/
│   ├── client/
│   └── types/
│
├── backend/
│   ├── api/
│   ├── services/
│   ├── models/
│   └── core/
│
├── docs/
├── docker/
└── diagrams/
```

---

## Roadmap

The complete development roadmap can be found in:

* ROADMAP.md

Project architecture and development guidelines are documented in:

* PROJECT.md

---

## Development Status

Current milestone:

**v0.2.0 – Docker Monitoring**

Upcoming milestone:

**v0.3.0 – Atlas Platform**

* Widget System
* Global Store
* Theme Engine
* WebSocket Support
* Alert Engine
* Metrics Cache

---

## Philosophy

Atlas follows a few simple principles:

* Performance before features
* API-first architecture
* Reusable UI components
* Clean separation of concerns
* Long-term maintainability
* Incremental releases

> **Build it once. Build it right.**

---

## Contributing

Contributions, ideas, and feedback are always welcome.

Please check the project roadmap before opening new feature requests.

---

## License

MIT License
