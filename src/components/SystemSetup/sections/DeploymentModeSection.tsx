import { SectionHeader } from "../SectionHeader";
import styles from "../SystemSetup.module.css";

interface DeploymentModeSectionProps {
  isCloud: boolean;
}

export function DeploymentModeSection({ isCloud }: DeploymentModeSectionProps) {
  return (
    <div className={styles.section}>
      <SectionHeader title="Deployment Mode" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "var(--radius-lg)",
          border: "1px solid hsl(217, 91%, 82%)",
          background: "var(--color-primary-blue-light)",
          padding: "0.75rem 1rem",
        }}
      >
        <div>
          <p style={{ fontSize: "1rem", fontWeight: 700, color: "hsl(217, 91%, 35%)", margin: 0 }}>
            {isCloud ? "Cloud" : "On-Premises"}
          </p>
          <p style={{ fontSize: "0.875rem", color: "hsl(217, 60%, 50%)", marginTop: "0.125rem" }}>
            {isCloud
              ? "Direct HTTP connection — no Cloud Connector required"
              : "Cloud Connector required to tunnel into your SAP backend"}
          </p>
        </div>
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            padding: "0.25rem 0.625rem",
            borderRadius: "9999px",
            background: "var(--color-primary-blue)",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {isCloud ? "HTTP / HTTPS" : "RFC / HTTP"}
        </span>
      </div>
    </div>
  );
}
