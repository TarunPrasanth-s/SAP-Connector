import { useState } from "react";
import { Button } from "@/UI/Button/Button";
import { Notice } from "./Notice";
import { LABELS } from "@/constants/labels";

interface SetupPanelProps {
  onComplete: () => void;
}

const STEPS = [
  "Open your Downloads folder",
  "Right-click setup-cloud-connector.bat",
  'Select "Run as Administrator"',
  "The script installs JDK, starts Cloud Connector and opens localhost:8443 automatically",
];

export function SetupPanel({ onComplete }: SetupPanelProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    onComplete();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-background)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>
          {downloaded ? "Script downloaded — run it as Administrator" : "Download the automated setup script"}
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", margin: 0 }}>
          {downloaded
            ? 'Right-click the downloaded .bat file → "Run as Administrator". It installs JDK, extracts Cloud Connector, and starts it automatically.'
            : "A batch script will be downloaded. It installs JDK, extracts and starts Cloud Connector automatically."}
        </p>
        <Button onClick={handleDownload}>
          {downloaded ? LABELS.downloadAgain : LABELS.downloadScript}
        </Button>
      </div>

      {downloaded && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", padding: "1rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Run the script
            </p>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {STEPS.map((step, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ width: "1.25rem", height: "1.25rem", borderRadius: "50%", background: "var(--color-primary-blue)", color: "#fff", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.125rem" }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <Notice type="warning">
            When the browser opens <strong>localhost:8443</strong>, accept the certificate warning then login with{" "}
            <strong>Administrator / manage</strong>.
          </Notice>
        </div>
      )}
    </div>
  );
}
