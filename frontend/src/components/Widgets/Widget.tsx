import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Widget({ children }: Props) {
  return (
    <section className="widget">
      {children}
    </section>
  );
}