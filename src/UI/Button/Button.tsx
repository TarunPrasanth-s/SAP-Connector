import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  fullWidth?: boolean;
}

export function Button({ children, variant = "primary", fullWidth, className = "", ...rest }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-sm px-4 py-2.5",
    outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground px-4 py-2.5",
    ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground px-4 py-2.5"
  };

  const widthClass = fullWidth ? "w-full" : "";

  const cls = `${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`.trim();

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
