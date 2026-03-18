import type { ReactNode } from "react";

interface CardTileProps {
  children: ReactNode;
  className?: string;
}

export function CardTile({ children, className = "" }: CardTileProps) {
  return <div className={`bg-card border border-border rounded-xl shadow-sm ${className}`}>{children}</div>;
}
