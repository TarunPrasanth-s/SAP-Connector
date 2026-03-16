import { Label } from "@/UI/Label/Label";
import styles from "./Dropdown.module.css";

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
    <div>
      {label && <Label required={required}>{label}</Label>}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`${styles.select} ${disabled ? styles.disabled : ""}`}
      >
        <option value="" hidden>Select an option</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
