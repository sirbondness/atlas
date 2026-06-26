export type Status = "healthy" | "warning" | "offline";

export type ApiServiceStatus = {
  name: string;
  description: string;
  status: Status;
  value: string;
  response_time_ms?: number | null;
};

export type ApiStatusResponse = {
  updated_at: string;
  overall_status: Status;
  services: ApiServiceStatus[];
};
