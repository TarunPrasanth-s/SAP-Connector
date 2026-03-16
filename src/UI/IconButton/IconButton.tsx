import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
}

export function IconButton({ children, label, className = "", ...rest }: IconButtonProps) {
  return (
    <button aria-label={label} className={`${styles.btn} ${className}`} {...rest}>
      {children}
    </button>
  );
}
