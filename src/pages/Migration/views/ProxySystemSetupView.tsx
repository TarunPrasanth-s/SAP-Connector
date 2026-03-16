import type { CCStatus } from "@/types/common";
import { CardTile } from "@/UI/CardTile/CardTile";
import { Button } from "@/UI/Button/Button";
import { Label } from "@/UI/Label/Label";
import { Dropdown } from "@/UI/Dropdown/Dropdown";
import { BackendTypeSection } from "@/components/SystemSetup/sections/BackendTypeSection";
import { DeploymentModeSection } from "@/components/SystemSetup/sections/DeploymentModeSection";
import { CloudConnectorSection } from "@/components/SystemSetup/sections/CloudConnectorSection";
import { ExistingCCSection } from "@/components/SystemSetup/sections/ExistingCCSection";
import { ChangePasswordSection } from "@/components/SystemSetup/sections/ChangePasswordSection";
import { BTPSubaccountSection } from "@/components/SystemSetup/sections/BTPSubaccountSection";
import { CloudFormSection } from "@/components/SystemSetup/sections/CloudFormSection";
import { SetupPanel } from "@/components/SystemSetup/SetupPanel";
import { Notice } from "@/components/SystemSetup/Notice";
import { SectionHeader } from "@/components/SystemSetup/SectionHeader";
import { Field } from "@/components/SystemSetup/Field";
import styles from "@/components/SystemSetup/SystemSetup.module.css";
import { LABELS } from "@/constants/labels";

function ProxyMappingSection({ backendType }: { backendType: string }) {
  return (
    <div className={styles.section}>
      <SectionHeader title="Proxy Connection Details" description="Define the virtual-to-internal mapping. This system will be exposed as a SCIM 2.0 endpoint." />
      <div className={styles.grid2}>
        <Dropdown label="Protocol" required options={["RFC", "HTTP"]} />
        <div>
          <Label>Back-end Type</Label>
          <div className={styles.readonlyField}>{backendType}</div>
        </div>
        <Field label="Virtual Host" required placeholder="sap.virtual.cloud" hint="Virtual hostname exposed to BTP" />
        <Field label="Virtual Port" required placeholder="e.g. 443" />
        <Field label="Internal Host" required placeholder="sap.internal.local" hint="Actual hostname in your network" />
        <Field label="Internal Port" required placeholder="e.g. 443" />
        <Field label="SAProuter" placeholder="/H/router/S/3299" hint="Optional — only if SAProuter is in use" />
        <Field label="System ID" required placeholder="e.g. HHJ" hint="3-character SAP System ID" />
        <Dropdown label="Principal Type" required options={["None", "Kerberos"]} />
        <Field label="SNC Partner Name" placeholder="p:CN=SAP..." hint="Optional — required when Principal Type is Kerberos" />
        <div className={styles.colSpan2}>
          <Label>Description</Label>
          <textarea placeholder="Optional description for this proxy system" className={styles.textarea} />
        </div>
      </div>
    </div>
  );
}

interface ProxySystemSetupViewProps {
  backendTypes: string[];
  systemName: string;
  onSystemNameChange: (v: string) => void;
  proxyUrl: string;
  onSave: () => void;
  backendType: string;
  setBackendType: (v: string) => void;
  hasCC: CCStatus;
  setHasCC: (v: CCStatus) => void;
  setupDone: boolean;
  setSetupDone: (v: boolean) => void;
  isCloud: boolean;
  showCCQuestion: boolean;
  showExistingCC: boolean;
  showAutoSetup: boolean;
  showChangePwd: boolean;
  showBTPFields: boolean;
  showMapping: boolean;
  showCloudForm: boolean;
  showSave: boolean;
}

export function ProxySystemSetupView({
  backendTypes,
  systemName,
  onSystemNameChange,
  proxyUrl,
  onSave,
  backendType,
  setBackendType,
  hasCC,
  setHasCC,
  setSetupDone,
  isCloud,
  showCCQuestion,
  showExistingCC,
  showAutoSetup,
  showChangePwd,
  showBTPFields,
  showMapping,
  showCloudForm,
  showSave,
}: ProxySystemSetupViewProps) {
  const divider = { borderTop: "1px solid #f3f4f6" };

  return (
    <div style={{ minHeight: "100%", background: "var(--color-background)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2.5rem 2rem" }}>
      <div style={{ width: "100%", maxWidth: "44rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", margin: 0 }}>Proxy System Configuration</h1>
        </div>

        <Notice type="info">
          A proxy system exposes your backend as a <strong>SCIM 2.0 endpoint</strong>, allowing external identity managers (e.g. SAP Identity Management) to read and write users without a direct connection.
        </Notice>

        <CardTile>
          <BackendTypeSection value={backendType} onChange={setBackendType} options={backendTypes} description="Select the type of SAP system to expose as a proxy." />

          <div style={divider}><DeploymentModeSection isCloud={isCloud} /></div>

          {showCCQuestion && <div style={divider}><CloudConnectorSection hasCC={hasCC} onSelect={setHasCC} /></div>}
          {showExistingCC && <div style={divider}><ExistingCCSection /></div>}

          {showAutoSetup && (
            <div style={divider}>
              <div className={styles.section}>
                <SectionHeader title="Automated Setup" description="Download and run the batch script. It installs JDK, extracts Cloud Connector, and starts it fully automatically." />
                <SetupPanel onComplete={() => setSetupDone(true)} />
              </div>
            </div>
          )}

          {showChangePwd && <div style={divider}><ChangePasswordSection /></div>}
          {showBTPFields && <div style={divider}><BTPSubaccountSection /></div>}
          {showMapping && <div style={divider}><ProxyMappingSection backendType={backendType} /></div>}

          {showCloudForm && (
            <div style={divider}>
              <CloudFormSection
                title="HTTP / HTTPS Connection"
                description="Configure the connection for your cloud SAP system to expose as a proxy."
                showProxyType={true}
                urlPlaceholder="https://<account>.workzone.ondemand.com"
              />
            </div>
          )}

          {showSave && (
            <div style={divider}>
              <div className={styles.section}>
                <SectionHeader title="Proxy System Identity" description="Give this proxy a unique name. A SCIM 2.0 endpoint URL will be generated for use by external identity managers." />
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <Field label="Proxy System Name" required placeholder="e.g. SAP-ABAP-Proxy" value={systemName} onChange={onSystemNameChange} hint="Unique identifier for this proxy system" />
                  <div>
                    <Label>Generated SCIM 2.0 Proxy URL</Label>
                    <div style={{ border: "1px solid #e5e7eb", borderRadius: "0.5rem", padding: "0.625rem 0.75rem", fontSize: "0.75rem", background: "#f9fafb", color: "#6b7280", fontFamily: "monospace", wordBreak: "break-all" }}>
                      {proxyUrl}
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>Share this URL with your external identity manager</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: "0 1.5rem 1.5rem" }}>
                <Button fullWidth onClick={onSave}>{LABELS.saveProxy}</Button>
              </div>
            </div>
          )}
        </CardTile>

        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#9ca3af", paddingBottom: "1rem" }}>{LABELS.footer}</p>
      </div>
    </div>
  );
}
