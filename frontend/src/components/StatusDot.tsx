import type { Status } from "../types/service";

export function StatusDot({ status }: { status: Status }) {
  const label =
    status === "healthy"
      ? "Healthy"
      : status === "warning"
      ? "Warning"
      : "Offline";

  return <span className={`status status-${status}`}>● {label}</span>;
}
