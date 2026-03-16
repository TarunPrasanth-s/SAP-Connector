import { Field } from "../Field";
import { SectionHeader } from "../SectionHeader";
import styles from "../SystemSetup.module.css";

export function ExistingCCSection() {
  return (
    <div className={styles.section}>
      <SectionHeader
        title="Cloud Connector Credentials"
        description="Provide the credentials for your running Cloud Connector instance."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Field label="Cloud Connector URL" value="https://localhost:8443" required hint="Default URL: https://localhost:8443" />
        <div className={styles.grid2}>
          <Field label="Username" value="Administrator" required />
          <Field label="Password" type="password" placeholder="Enter password" required />
        </div>
      </div>
    </div>
  );
}
