import type { summaryItems } from "../data/mockData";

type SummaryItem = (typeof summaryItems)[number];

export function SummaryCard({ item }: { item: SummaryItem }) {
  const Icon = item.icon;

  return (
    <div className="summary-card">
      <Icon size={22} />
      <div>
        <span>{item.label}</span>
        <strong>{item.value}</strong>
      </div>
    </div>
  );
}
