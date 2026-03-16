import type { ReactNode } from "react";
import styles from "./Label.module.css";

interface LabelProps {
  children: ReactNode;
  required?: boolean;
}

export function Label({ children, required }: LabelProps) {
  return (
    <label className={styles.label}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
}
