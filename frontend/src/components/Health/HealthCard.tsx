import { Card, CardBody, CardHeader } from "../UI/Card";


type HealthCardProps = {
  healthScore: number;
  lastUpdated: Date | null;
};

export function HealthCard({ healthScore, lastUpdated }: HealthCardProps) {
  return (
  <Card className="health-card">
    <CardHeader
      title="Infrastructure Score"
      description="Overall platform health based on monitored services."
      action={lastUpdated ? lastUpdated.toLocaleTimeString("de-CH") : "waiting"}
    />

    <CardBody>
      <strong>{healthScore}%</strong>

      <div className="health-bar">
        <div style={{ width: `${healthScore}%` }} />
      </div>

      <p>
        Last updated:{" "}
        {lastUpdated
          ? lastUpdated.toLocaleTimeString("de-CH")
          : "waiting for data"}
      </p>
    </CardBody>
  </Card>
);
}