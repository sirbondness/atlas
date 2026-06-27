# ROADMAP

# Atlas Roadmap

> **Atlas** is an open-source Infrastructure Operations Center designed to monitor and manage homelab and small business infrastructure from a single modern interface.

This roadmap represents the planned development milestones for Atlas. Features may evolve over time, but the project's architectural principles remain constant.

---

# Release Strategy

| Version   | Status      | Focus                      |
| --------- | ----------- | -------------------------- |
| ✅ v0.1.0  | Released    | Foundation                 |
| 🚧 v0.2.0 | In Progress | Docker Monitoring          |
| 📋 v0.3.0 | Planned     | Atlas Platform             |
| 📋 v0.4.0 | Planned     | Proxmox Integration        |
| 📋 v0.5.0 | Planned     | Cloudflare Integration     |
| 📋 v0.6.0 | Planned     | Home Assistant Integration |
| 📋 v0.7.0 | Planned     | Mazda Integration          |
| 📋 v0.8.0 | Planned     | Splunk Integration         |
| 📋 v0.9.0 | Planned     | Network Monitoring         |
| 🎯 v1.0.0 | Planned     | Stable Public Release      |

---

# v0.1.0 — Foundation ✅

Completed

### Frontend

* React
* TypeScript
* Vite
* Reusable component architecture

### Backend

* FastAPI
* REST API
* Docker SDK integration

### Development

* Docker Compose
* Dev Container
* GitHub Repository
* Atlas Client abstraction
* Basic Health Dashboard

---

# v0.2.0 — Docker Monitoring 🚧

Current Sprint

## Backend

* [ ] Separate Docker Inventory API
* [ ] Separate Docker Metrics API
* [ ] Docker Events support
* [ ] Performance optimization
* [ ] Improved error handling

## Frontend

* [ ] Docker Widget improvements
* [ ] CPU monitoring
* [ ] Memory monitoring
* [ ] Container uptime
* [ ] Search
* [ ] Filtering
* [ ] Sorting
* [ ] Container detail view

Goal:

A Docker monitoring experience that can replace basic day-to-day container monitoring tools.

---

# v0.3.0 — Atlas Platform

## Core

* Global application store
* Widget framework
* Theme engine
* Health engine
* Alert system
* Responsive dashboard

## Communication

* WebSocket support
* Live updates
* Background refresh manager

Goal:

Transform Atlas from a dashboard into a scalable monitoring platform.

---

# v0.4.0 — Proxmox Integration

* Cluster overview
* Nodes
* Virtual Machines
* LXC Containers
* Storage
* Tasks
* Live resource usage

---

# v0.5.0 — Cloudflare Integration

* DNS Records
* Zero Trust
* Tunnels
* SSL Certificates
* Domains
* Analytics

---

# v0.6.0 — Home Assistant Integration

* Devices
* Entities
* Areas
* Automations
* Energy Dashboard
* System Health

---

# v0.7.0 — Mazda Integration

* Battery State
* Estimated Range
* Charging Status
* Climate Control
* Vehicle Location
* Charging Statistics

---

# v0.8.0 — Splunk Integration

* Cluster Health
* Indexers
* Search Heads
* License Status
* Storage Capacity
* Alerts

---

# v0.9.0 — Network Monitoring

## MikroTik

* Interfaces
* VLANs
* Routing
* VPN
* WAN Status

## UniFi

* Access Points
* Clients
* Switches
* Network Health

---

# v1.0.0 — Stable Release

## Production Ready

* Complete documentation
* Installation wizard
* Docker image
* Configuration guide
* User guide
* Stable API
* First public release

---

# Future Ideas

The following ideas are intentionally **not** part of the current roadmap and are tracked separately as backlog items.

* Infrastructure Topology View
* Historical Metrics
* Notification Center
* Plugin SDK
* AI-assisted Insights
* Mobile Companion App
* Prometheus Export
* Multi-user Support
* Role Based Access Control (RBAC)

---

# Development Philosophy

Atlas follows a few simple principles:

* Build for long-term maintainability.
* Performance before features.
* API-first architecture.
* Components never communicate directly with APIs.
* Reusable UI over duplicated code.
* Small, incremental releases.
* Stable milestones over rapid feature growth.

> **Build it once. Build it right.**
