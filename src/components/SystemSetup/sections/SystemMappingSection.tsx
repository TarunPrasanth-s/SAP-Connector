import { Field } from "../Field";
import { Dropdown } from "@/UI/Dropdown/Dropdown";
import { Label } from "@/UI/Label/Label";
import { SectionHeader } from "../SectionHeader";
import styles from "../SystemSetup.module.css";

interface SystemMappingSectionProps {
  backendType: string;
}

export function SystemMappingSection({ backendType }: SystemMappingSectionProps) {
  return (
    <div className={styles.section}>
      <SectionHeader title="System Mapping" description="Define the virtual-to-internal host mapping for your SAP backend." />
      <div className={styles.grid2}>
        <Dropdown label="Protocol" required options={["RFC", "HTTP"]} />
        <div>
          <Label>Back-end Type</Label>
          <div className={styles.readonlyField}>{backendType}</div>
        </div>
        <Field label="Virtual Host" required placeholder="sap.virtual.cloud" hint="Virtual hostname exposed to BTP" />
        <Field label="Virtual Port" required placeholder="e.g. 443" hint="Virtual port exposed to BTP" />
        <Field label="Internal Host" required placeholder="sap.internal.local" hint="Hostname of the on-prem SAP system" />
        <Field label="Internal Port" required placeholder="e.g. 443" hint="Port of the SAP backend" />
        <Field label="SAProuter" placeholder="/H/router/S/3299" hint="Optional — only if SAProuter is in use" />
        <Field label="System ID" required placeholder="e.g. HHJ" hint="3-character SAP System ID" />
        <Dropdown label="Principal Type" required options={["None", "Kerberos"]} />
        <Field label="SNC Partner Name" placeholder="p:CN=SAP..." hint="Optional — required when Principal Type is Kerberos" />
        <Field label="Host in Request Header" placeholder="Use Virtual Host" hint="Optional override" />
        <div className={styles.colSpan2}>
          <Label>System Certificate for Logon</Label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#4b5563" }}>
            <input type="checkbox" style={{ borderRadius: "0.25rem", border: "1px solid #d1d5db" }} />
            Enable certificate-based logon
          </label>
        </div>
        <div className={styles.colSpan2}>
          <Label>Description</Label>
          <textarea
            placeholder="Optional description for this system mapping"
            className={styles.textarea}
          />
        </div>
      </div>
    </div>
  );
}
