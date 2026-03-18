import { Label } from "@/UI/Label/Label";

interface FieldProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (v: string) => void;
}

export function Field({ label, placeholder, required, hint, type = "text", value, disabled, onChange }: FieldProps) {
  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={onChange ? undefined : value}
        value={onChange ? value : undefined}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full border border-border rounded-md px-3.5 py-2.5 text-base bg-background text-foreground outline-none transition-all duration-200
          placeholder:text-muted-foreground
          hover:border-primary/40
          focus:border-primary focus:ring-4 focus:ring-primary/10
          ${disabled ? "text-muted-foreground cursor-not-allowed bg-muted opacity-80" : ""}
        `}
      />
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}
