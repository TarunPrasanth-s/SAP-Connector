import type { CCStatus } from "@/types/common";
import { CardTile } from "@/UI/CardTile/CardTile";
import { Button } from "@/UI/Button/Button";
import { BackendTypeSection } from "@/components/SystemSetup/sections/BackendTypeSection";
import { DeploymentModeSection } from "@/components/SystemSetup/sections/DeploymentModeSection";
import { CloudConnectorSection } from "@/components/SystemSetup/sections/CloudConnectorSection";
import { ExistingCCSection } from "@/components/SystemSetup/sections/ExistingCCSection";
import { ChangePasswordSection } from "@/components/SystemSetup/sections/ChangePasswordSection";
import { BTPSubaccountSection } from "@/components/SystemSetup/sections/BTPSubaccountSection";
import { SystemMappingSection } from "@/components/SystemSetup/sections/SystemMappingSection";
import { CloudFormSection } from "@/components/SystemSetup/sections/CloudFormSection";
import { SetupPanel } from "@/components/SystemSetup/SetupPanel";
import { SectionHeader } from "@/components/SystemSetup/SectionHeader";
import styles from "@/components/SystemSetup/SystemSetup.module.css";
import { LABELS } from "@/constants/labels";

interface SystemSetupViewProps {
  title: string;
  saveLabel: string;
  backendTypes: string[];
  cloudUrlPlaceholder: string;
  cloudTitle: string;
  cloudDescription: string;
  showProxyType: boolean;
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

export function SystemSetupView({
  title,
  saveLabel,
  backendTypes,
  cloudUrlPlaceholder,
  cloudTitle,
  cloudDescription,
  showProxyType,
  onSave,
  backendType,
  setBackendType,
  hasCC,
  setHasCC,
  setupDone,
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
}: SystemSetupViewProps) {
  return (
    <div style={{ minHeight: "100%", background: "var(--color-background)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2.5rem 2rem" }}>
      <div style={{ width: "100%", maxWidth: "44rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", margin: 0 }}>{title}</h1>
        </div>

        <CardTile>
          <div style={{ divideY: "1px solid #f3f4f6" } as React.CSSProperties}>
            <BackendTypeSection value={backendType} onChange={setBackendType} options={backendTypes} />

            <div style={{ borderTop: "1px solid #f3f4f6" }}>
              <DeploymentModeSection isCloud={isCloud} />
            </div>

            {showCCQuestion && (
              <div style={{ borderTop: "1px solid #f3f4f6" }}>
                <CloudConnectorSection hasCC={hasCC} onSelect={setHasCC} />
              </div>
            )}

            {showExistingCC && (
              <div style={{ borderTop: "1px solid #f3f4f6" }}>
                <ExistingCCSection />
              </div>
            )}

            {showAutoSetup && (
              <div style={{ borderTop: "1px solid #f3f4f6" }}>
                <div className={styles.section}>
                  <SectionHeader
                    title="Automated Setup"
                    description="Download and run the batch script. It installs JDK, extracts Cloud Connector, and starts it — fully automated."
                  />
                  <SetupPanel onComplete={() => setSetupDone(true)} />
                </div>
              </div>
            )}

            {showChangePwd && (
              <div style={{ borderTop: "1px solid #f3f4f6" }}>
                <ChangePasswordSection />
              </div>
            )}

            {showBTPFields && (
              <div style={{ borderTop: "1px solid #f3f4f6" }}>
                <BTPSubaccountSection />
              </div>
            )}

            {showMapping && (
              <div style={{ borderTop: "1px solid #f3f4f6" }}>
                <SystemMappingSection backendType={backendType} />
              </div>
            )}

            {showCloudForm && (
              <div style={{ borderTop: "1px solid #f3f4f6" }}>
                <CloudFormSection
                  title={cloudTitle}
                  description={cloudDescription}
                  showProxyType={showProxyType}
                  urlPlaceholder={cloudUrlPlaceholder}
                />
              </div>
            )}

            {showSave && (
              <div style={{ borderTop: "1px solid #f3f4f6", padding: "1.5rem" }}>
                <Button fullWidth onClick={onSave}>{saveLabel}</Button>
              </div>
            )}
          </div>
        </CardTile>

        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#9ca3af", paddingBottom: "1rem" }}>
          {LABELS.footer}
        </p>
      </div>
    </div>
  );
}
