import type { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export function Label({ children, required, className = "" }: LabelProps) {
  return (
    <label className={`block text-sm font-medium text-foreground mb-1.5 ${className}`}>
      {children}
      {required && <span className="text-destructive ml-1"> *</span>}
    </label>
  );
}
