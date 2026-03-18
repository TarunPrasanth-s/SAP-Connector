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
import { LABELS } from "@/constants/labels";

function ProxyMappingSection({ backendType }: { backendType: string }) {
  return (
    <div className="p-6">
      <SectionHeader title="Proxy Connection Details" description="Define the virtual-to-internal mapping. This system will be exposed as a SCIM 2.0 endpoint." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown label="Protocol" required options={["RFC", "HTTP"]} />
        <div>
          <Label>Back-end Type</Label>
          <div className="w-full border border-border rounded-md px-3.5 py-2.5 text-base bg-muted text-muted-foreground">{backendType}</div>
        </div>
        <Field label="Virtual Host" required placeholder="sap.virtual.cloud" hint="Virtual hostname exposed to BTP" />
        <Field label="Virtual Port" required placeholder="e.g. 443" />
        <Field label="Internal Host" required placeholder="sap.internal.local" hint="Actual hostname in your network" />
        <Field label="Internal Port" required placeholder="e.g. 443" />
        <Field label="SAProuter" placeholder="/H/router/S/3299" hint="Optional — only if SAProuter is in use" />
        <Field label="System ID" required placeholder="e.g. HHJ" hint="3-character SAP System ID" />
        <Dropdown label="Principal Type" required options={["None", "Kerberos"]} />
        <Field label="SNC Partner Name" placeholder="p:CN=SAP..." hint="Optional — required when Principal Type is Kerberos" />
        <div className="col-span-1 md:col-span-2">
          <Label>Description</Label>
          <textarea 
            placeholder="Optional description for this proxy system" 
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-base bg-background text-foreground outline-none resize-none h-24 transition-colors duration-150 hover:border-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20" 
          />
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
  setIsCloud: (v: boolean) => void;
  isOnPrem: boolean;
  showCCQuestion: boolean;
  showExistingCC: boolean;
  showAutoSetup: boolean;
  showChangePwd: boolean;
  showBTPFields: boolean;
  showMapping: boolean;
  showCloudForm: boolean;
  showSave: boolean;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: boolean;
  totalSteps: number;
  isSaving?: boolean;
}

import { Stepper } from "@/components/ui/stepper";

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
  setupDone,
  setSetupDone,
  isCloud,
  setIsCloud,
  isOnPrem,
  showCCQuestion,
  showExistingCC,
  showAutoSetup,
  showChangePwd,
  showBTPFields,
  showMapping,
  showCloudForm,
  showSave,
  currentStep,
  nextStep,
  prevStep,
  canProceed,
  totalSteps,
}: ProxySystemSetupViewProps) {
  
  const cloudSteps = [
    { title: "Environment", description: "Select backend system" },
    { title: "Deployment", description: "Cloud or On-Premise" },
    { title: "Proxy Identity", description: "Connection & Scim URL" }
  ];

  const onPremSteps = [
    { title: "Environment", description: "Select backend system" },
    { title: "Deployment", description: "Cloud or On-Premise" },
    { title: "Connectivity", description: "Cloud Connector" },
    { title: "Proxy Identity", description: "Mapping & Scim URL" }
  ];

  const steps = isCloud ? cloudSteps : (isOnPrem ? onPremSteps : [{title: "Environment", description: "Select backend system"}]);

  // Adjust canProceed for proxy final step (must have a system name)
  const isFinalStep = currentStep === totalSteps - 1;
  const isProceedable = canProceed && (!isFinalStep || systemName.trim() !== "");

  return (
    <div className="min-h-full bg-background flex flex-col items-center justify-start py-10 px-8">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        <div className="mb-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground m-0">Proxy System Configuration</h1>
        </div>

        <Notice type="info">
          A proxy system exposes your backend as a <strong>SCIM 2.0 endpoint</strong>, allowing external identity managers (e.g. SAP Identity Management) to read and write users without a direct connection.
        </Notice>

        {backendType && steps.length > 1 && (
          <div className="w-full px-4 mb-2">
            <Stepper activeStep={currentStep} steps={steps} />
          </div>
        )}

        <CardTile className="bg-card border border-border shadow-md rounded-xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            
            {/* STEP 0: Backend Type */}
            {currentStep === 0 && (
               <BackendTypeSection value={backendType} onChange={setBackendType} options={backendTypes} description="Select the type of SAP system to expose as a proxy." />
            )}

            {/* STEP 1: Deployment Mode */}
            {currentStep === 1 && (
              <DeploymentModeSection isCloud={isCloud} onSelect={setIsCloud} />
            )}

            {/* STEP 2: Connectivity (Cloud Form or Cloud Connector) */}
            {currentStep === 2 && (
              <div className="flex flex-col">
                {isCloud && showCloudForm && (
                  <>
                    <CloudFormSection
                      title="HTTP / HTTPS Connection"
                      description="Configure the connection for your cloud SAP system to expose as a proxy."
                      showProxyType={true}
                      urlPlaceholder="https://<account>.workzone.ondemand.com"
                    />
                    {showSave && (
                      <div className="border-t border-border p-6">
                        <SectionHeader title="Proxy System Identity" description="Give this proxy a unique name. A SCIM 2.0 endpoint URL will be generated for use by external identity managers." />
                        <div className="flex flex-col gap-4">
                          <Field label="Proxy System Name" required placeholder="e.g. SAP-ABAP-Proxy" value={systemName} onChange={onSystemNameChange} hint="Unique identifier for this proxy system" />
                          <div>
                            <Label>Generated SCIM 2.0 Proxy URL</Label>
                            <div className="border border-border rounded-lg px-3 py-2.5 text-xs bg-muted text-muted-foreground font-mono break-all mt-1">
                              {proxyUrl}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Share this URL with your external identity manager</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {isOnPrem && (
                  <>
                    {showCCQuestion && (
                      <CloudConnectorSection hasCC={hasCC} onSelect={setHasCC} />
                    )}
                    
                    {showExistingCC && (
                      <div className="border-t border-border">
                        <ExistingCCSection />
                      </div>
                    )}

                    {showAutoSetup && (
                      <div className="border-t border-border p-6">
                        <SectionHeader title="Automated Setup" description="Download and run the batch script. It installs JDK, extracts Cloud Connector, and starts it fully automatically." />
                        <SetupPanel onComplete={() => setSetupDone(true)} />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* STEP 3: On-Premise specific configuration */}
            {currentStep === 3 && isOnPrem && (
              <div className="flex flex-col">
                {showChangePwd && (
                  <ChangePasswordSection />
                )}
                
                {showBTPFields && (
                  <div className="border-t border-border">
                    <BTPSubaccountSection />
                  </div>
                )}
                
                {showMapping && (
                  <div className="border-t border-border">
                    <ProxyMappingSection backendType={backendType} />
                  </div>
                )}
                
                {showSave && (
                  <div className="border-t border-border flex flex-col pt-0">
                    <div className="p-6">
                      <SectionHeader title="Proxy System Identity" description="Give this proxy a unique name. A SCIM 2.0 endpoint URL will be generated for use by external identity managers." />
                      <div className="flex flex-col gap-4">
                        <Field label="Proxy System Name" required placeholder="e.g. SAP-ABAP-Proxy" value={systemName} onChange={onSystemNameChange} hint="Unique identifier for this proxy system" />
                        <div>
                          <Label>Generated SCIM 2.0 Proxy URL</Label>
                          <div className="border border-border rounded-lg px-3 py-2.5 text-xs bg-muted text-muted-foreground font-mono break-all mt-1">
                            {proxyUrl}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Share this URL with your external identity manager</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="bg-muted/30 border-t border-border p-6 flex justify-between gap-4 items-center">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 0}
                className="w-32"
              >
                Back
              </Button>

              {isFinalStep ? (
                <Button 
                  onClick={onSave} 
                  disabled={!isProceedable}
                  className="w-32"
                >
                  {LABELS.saveProxy}
                </Button>
              ) : (
                <Button 
                  onClick={nextStep} 
                  disabled={!isProceedable}
                  className="w-32"
                >
                  Next
                </Button>
              )}
            </div>

          </div>
        </CardTile>

        <p className="text-center text-xs text-muted-foreground pb-4 mt-2">{LABELS.footer}</p>
      </div>
    </div>
  );
}
