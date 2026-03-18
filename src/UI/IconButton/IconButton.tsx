import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
}

export function IconButton({ children, label, className = "", ...rest }: IconButtonProps) {
  return (
    <button aria-label={label} className={`w-8 h-8 flex items-center justify-center rounded-md border-transparent bg-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed ${className}`} {...rest}>
      {children}
    </button>
  );
}
