import { Label } from "@/UI/Label/Label";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  label?: string;
  required?: boolean;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  hint?: string;
  disabled?: boolean;
}

export function Dropdown({ label, required, options, value, onChange, hint, disabled }: DropdownProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <Label required={required} className="text-sm font-medium text-foreground">{label}</Label>}
      <div className="relative w-full group">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none border border-border rounded-lg outline-none bg-background text-foreground text-sm px-3.5 py-2.5 transition-all duration-200 shadow-sm
            hover:border-primary/40
            focus:border-primary focus:ring-4 focus:ring-primary/10
            ${disabled ? "text-muted-foreground cursor-not-allowed bg-muted/50 border-border/50 shadow-none z-0" : "cursor-pointer z-10"}
          `}
        >
          <option value="" hidden disabled>Select an option...</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${disabled ? "opacity-40" : "group-hover:text-primary group-focus-within:rotate-180 text-muted-foreground"}`}>
          <ChevronDown size={16} strokeWidth={2.5} />
        </div>
      </div>
      {hint && <p className="text-xs text-muted-foreground animate-in fade-in">{hint}</p>}
    </div>
  );
}
