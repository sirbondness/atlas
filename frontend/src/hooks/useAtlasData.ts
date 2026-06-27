import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import type { ApiStatusResponse } from "../types/service";
import type { DockerStatus } from "../types/docker";

export function useAtlasData() {
  const [statusData, setStatusData] = useState<ApiStatusResponse | null>(null);
  const [dockerData, setDockerData] = useState<DockerStatus | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function refresh() {
    try {
      const [statusResponse, dockerResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/status`),
        fetch(`${API_BASE_URL}/api/v1/docker`),
      ]);

      setStatusData(await statusResponse.json());
      setDockerData(await dockerResponse.json());
      setLastUpdated(new Date());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    statusData,
    dockerData,
    lastUpdated,
    refresh,
  };
}