import type { CCStatus } from "@/types/common";
import { SectionHeader } from "../SectionHeader";
import styles from "../SystemSetup.module.css";

interface CloudConnectorSectionProps {
  hasCC: CCStatus;
  onSelect: (v: CCStatus) => void;
}

const OPTIONS = [
  { val: "yes" as const, label: "Yes, it is installed" },
  { val: "no" as const, label: "No, set it up for me" },
];

export function CloudConnectorSection({ hasCC, onSelect }: CloudConnectorSectionProps) {
  return (
    <div className={styles.section}>
      <SectionHeader
        title="Cloud Connector"
        description="A Cloud Connector instance is required to route traffic from SAP BTP to your on-premises backend."
      />
      <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
        Is Cloud Connector already installed and running on this machine?
      </p>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        {OPTIONS.map((opt) => {
          const isSelected = hasCC === opt.val;
          return (
            <button
              key={opt.val}
              onClick={() => onSelect(opt.val)}
              style={{
                flex: 1,
                padding: "0.625rem",
                borderRadius: "var(--radius-md)",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                border: isSelected
                  ? "1px solid var(--color-primary-blue)"
                  : "1px solid var(--color-border)",
                background: isSelected ? "var(--color-primary-blue-light)" : "var(--color-surface)",
                color: isSelected ? "var(--color-primary-blue)" : "var(--color-text-secondary)",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
