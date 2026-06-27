import { useEffect, useState } from "react";

import { atlasClient, type DockerMetrics } from "../client/atlasClient";
import type { DockerStatus } from "../types/docker";
import type { ApiStatusResponse } from "../types/service";

type AtlasDataState = {
  statusData: ApiStatusResponse | null;
  dockerData: DockerStatus | null;
  dockerMetrics: DockerMetrics | null;
  lastUpdated: Date | null;
  isLoading: boolean;
  error: string | null;
};

export function useAtlasData() {
  const [state, setState] = useState<AtlasDataState>({
    statusData: null,
    dockerData: null,
    dockerMetrics: null,
    lastUpdated: null,
    isLoading: true,
    error: null,
  });

  async function refresh() {
    try {
      const [statusData, dockerData, dockerMetrics] = await Promise.all([
        atlasClient.getStatus(),
        atlasClient.getDocker(),
        atlasClient.getDockerMetrics(),
      ]);

      setState({
        statusData,
        dockerData,
        dockerMetrics,
        lastUpdated: new Date(),
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(refresh, 15000);

    return () => clearInterval(interval);
  }, []);

  return {
    ...state,
    refresh,
  };
}