import type { ReactNode } from "react";
import styles from "./RightSidebar.module.css";

interface RightSidebarProps {
  children?: ReactNode;
}

export function RightSidebar({ children }: RightSidebarProps) {
  return <aside className={styles.sidebar}>{children}</aside>;
}
