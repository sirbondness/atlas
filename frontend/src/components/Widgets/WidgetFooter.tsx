import type { ReactNode } from "react";

export function WidgetFooter({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <footer className="widget-footer">
      {children}
    </footer>
  );
}