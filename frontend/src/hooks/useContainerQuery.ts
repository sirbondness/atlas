import { useMemo } from "react";

import type { DockerMetrics } from "../client/atlasClient";
import type { DockerStatus } from "../types/docker";

export type ContainerFilter = "all" | "running" | "stopped" | "healthy";

export type ContainerSort =
  | "name-asc"
  | "name-desc"
  | "memory"
  | "restart"
  | "status";

type UseContainerQueryOptions = {
  dockerData: DockerStatus | null;
  dockerMetrics: DockerMetrics | null;
  search: string;
  filter: ContainerFilter;
  sort: ContainerSort;
};

export function useContainerQuery({
  dockerData,
  dockerMetrics,
  search,
  filter,
  sort,
}: UseContainerQueryOptions) {
  return useMemo(() => {
    if (!dockerData) return [];

    const containers = dockerData.containers.filter((container) => {
      const matchesSearch = container.name
        .toLowerCase()
        .includes(search.toLowerCase());

      let matchesFilter = true;

      switch (filter) {
        case "running":
          matchesFilter = container.status === "running";
          break;
        case "stopped":
          matchesFilter = container.status !== "running";
          break;
        case "healthy":
          matchesFilter = container.health === "healthy";
          break;
        default:
          matchesFilter = true;
      }

      return matchesSearch && matchesFilter;
    });

    containers.sort((a, b) => {
      const metricsA = dockerMetrics?.[a.id];
      const metricsB = dockerMetrics?.[b.id];

      switch (sort) {
        case "name-desc":
          return b.name.localeCompare(a.name);

        case "memory":
          return (metricsB?.memory_mb ?? 0) - (metricsA?.memory_mb ?? 0);

        case "restart":
          return b.restart_count - a.restart_count;

        case "status":
          return a.status.localeCompare(b.status);

        case "name-asc":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return containers;
  }, [dockerData, dockerMetrics, search, filter, sort]);
}