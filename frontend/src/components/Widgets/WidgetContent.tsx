import type { ReactNode } from "react";

import { WidgetEmpty } from "./WidgetEmpty";
import { WidgetError } from "./WidgetError";
import { WidgetLoading } from "./WidgetLoading";

type Props = {
  children: ReactNode;
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
};

export function WidgetContent({
  children,
  loading = false,
  error = null,
  empty = false,
  emptyMessage,
}: Props) {
  if (loading) {
    return <WidgetLoading loading>{children}</WidgetLoading>;
  }

  if (error) {
    return <WidgetError error={error} />;
  }

  if (empty) {
    return <WidgetEmpty empty message={emptyMessage} />;
  }

  return <div className="widget-content">{children}</div>;
}