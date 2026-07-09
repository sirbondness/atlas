import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function WidgetHeader({
  title,
  description,
  action,
}: Props) {
  return (
    <header className="widget-header">

      <div>

        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}

      </div>

      {action}

    </header>
  );
}