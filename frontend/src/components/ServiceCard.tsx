import type { services } from "../data/mockData";
import { StatusDot } from "./StatusDot";

type Service = (typeof services)[number];

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <article className="card">
      <div className="card-top">
        <div className="icon-box">
          <Icon size={22} />
        </div>
        <StatusDot status={service.status} />
      </div>

      <h3>{service.name}</h3>
      <p>{service.description}</p>

      <div className="metric">{service.value}</div>
    </article>
  );
}
