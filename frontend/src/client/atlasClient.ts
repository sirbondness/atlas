import { API_BASE_URL } from "../config";
import type { DockerStatus } from "../types/docker";
import type { ApiStatusResponse } from "../types/service";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Atlas API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const atlasClient = {
  getStatus() {
    return request<ApiStatusResponse>("/api/v1/status");
  },

  getDocker() {
    return request<DockerStatus>("/api/v1/docker");
  },
};