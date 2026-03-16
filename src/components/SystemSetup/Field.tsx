import { Label } from "@/UI/Label/Label";
import styles from "./SystemSetup.module.css";

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
        className={`${styles.input} ${disabled ? styles.disabled : ""}`}
      />
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
