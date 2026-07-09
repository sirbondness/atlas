import type { ReactNode } from "react";

export function WidgetContent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="widget-content">
      {children}
    </div>
  );
}