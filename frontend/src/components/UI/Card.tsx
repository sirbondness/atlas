import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

type CardHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function Card({ children, className = "" }: CardProps) {
  return <div className={`panel ${className}`}>{children}</div>;
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="panel-header card-header">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      {action && <div className="card-action">{action}</div>}
    </div>
  );
}

export function CardBody({ children }: CardProps) {
  return <div className="card-body">{children}</div>;
}