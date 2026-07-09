type Props = {
  empty: boolean;
  message?: string;
};

export function WidgetEmpty({
  empty,
  message = "No data available.",
}: Props) {
  if (!empty) return null;

  return (
    <div className="widget-empty">
      <p>{message}</p>
    </div>
  );
}