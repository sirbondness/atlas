import type { ReactNode } from "react";

export function WidgetToolbar({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="widget-toolbar">
      {children}
    </div>
  );
}