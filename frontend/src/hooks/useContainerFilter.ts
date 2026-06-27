import { useMemo } from "react";

import type { DockerStatus } from "../types/docker";

export type ContainerFilter = "all" | "running" | "stopped" | "healthy";

type UseContainerFilterOptions = {
  dockerData: DockerStatus | null;
  search: string;
  filter: ContainerFilter;
};

export function useContainerFilter({
  dockerData,
  search,
  filter,
}: UseContainerFilterOptions) {
  return useMemo(() => {
    if (!dockerData) return [];

    return dockerData.containers.filter((container) => {
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
  }, [dockerData, search, filter]);
}