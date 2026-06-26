export type DockerContainer = {
  name: string;
  image: string;
  status: string;
  health: string | null;
  created: string | null;
  restart_count: number;
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