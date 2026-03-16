import type { ReactNode } from "react";
import styles from "./CardTile.module.css";

interface CardTileProps {
  children: ReactNode;
  className?: string;
}

export function CardTile({ children, className = "" }: CardTileProps) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}
