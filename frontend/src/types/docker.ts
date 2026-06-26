export type DockerContainer = {
  name: string;
  image: string;
  status: string;
  health: string | null;
};

export type DockerStatus = {
  healthy: boolean;
  error?: string;
  running: number;
  stopped: number;
  containers: DockerContainer[];
};