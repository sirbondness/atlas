export type DockerContainer = {
  id: string;
  name: string;
  image: string;
  status: string;
  health: string | null;
  created: string | null;
  uptime: string | null;
  restart_count: number;
  cpu_percent: number;
  memory_mb: number;
  ports: string[];
  networks: string[];
};

export type DockerStatus = {
  healthy: boolean;
  error?: string;
  running: number;
  stopped: number;
  images: number;
  containers: DockerContainer[];
};