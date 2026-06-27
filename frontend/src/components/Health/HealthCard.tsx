type HealthCardProps = {
  healthScore: number;
  lastUpdated: Date | null;
};

export function HealthCard({ healthScore, lastUpdated }: HealthCardProps) {
  return (
    <section className="health-card">
      <div>
        <span>Infrastructure Score</span>
        <strong>{healthScore}%</strong>
      </div>

      <div className="health-bar">
        <div style={{ width: `${healthScore}%` }} />
      </div>

      <p>
        Last updated:{" "}
        {lastUpdated
          ? lastUpdated.toLocaleTimeString("de-CH")
          : "waiting for data"}
      </p>
    </section>
  );
}