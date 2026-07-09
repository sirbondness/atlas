type Props = {
  error: string | null;
};

export function WidgetError({ error }: Props) {
  if (!error) return null;

  return (
    <div className="widget-error">
      <strong>Error</strong>
      <p>{error}</p>
    </div>
  );
}