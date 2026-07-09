import type { ReactNode } from "react";

type Props = {
  loading: boolean;
  children: ReactNode;
};

export function WidgetLoading({ loading, children }: Props) {
  if (loading) {
    return (
      <div className="widget-loading">
        <p>Loading…</p>
      </div>
    );
  }

  return <>{children}</>;
}