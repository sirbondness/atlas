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

import type { Status } from "../types/service";

export const services = [
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

export const network = [
  { name: "Swisscom", value: "Online", status: "healthy" as Status },
  { name: "Starlink", value: "Online", status: "healthy" as Status },
  { name: "5G Backup", value: "Standby", status: "warning" as Status },
];

export const sidebarItems = [
  { label: "Dashboard", icon: Gauge },
  { label: "Infrastructure", icon: Server },
  { label: "Network", icon: Network },
  { label: "Containers", icon: Container },
  { label: "Vehicle", icon: Car },
  { label: "Monitoring", icon: Activity },
];

export const summaryItems = [
  { label: "Internet", value: "Online", icon: Wifi },
  { label: "Security", value: "Cloudflare", icon: ShieldCheck },
  { label: "Storage", value: "62%", icon: HardDrive },
  { label: "Home Assistant", value: "Running", icon: Home },
];
