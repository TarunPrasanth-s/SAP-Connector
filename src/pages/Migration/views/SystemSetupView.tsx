import type { CCStatus } from "@/types/common";
import { CardTile } from "@/UI/CardTile/CardTile";
import { Button } from "@/UI/Button/Button";
import { Stepper } from "@/components/ui/stepper";
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
}: SystemSetupViewProps) {
  
  const cloudSteps = [
    { title: "Environment", description: "Select backend system" },
    { title: "Deployment", description: "Cloud or On-Premise" },
    { title: "Connection", description: "Cloud URL & Details" }
  ];

  const onPremSteps = [
    { title: "Environment", description: "Select backend system" },
    { title: "Deployment", description: "Cloud or On-Premise" },
    { title: "Connectivity", description: "Cloud Connector" },
    { title: "Configuration", description: "Mapping & Subaccount" }
  ];

  const steps = isCloud ? cloudSteps : (isOnPrem ? onPremSteps : [{title: "Environment", description: "Select backend system"}]);

  return (
    <div className="min-h-full bg-background flex flex-col items-center justify-start py-10 px-8">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        <div className="mb-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground m-0">{title}</h1>
        </div>
        
        {backendType && steps.length > 1 && (
          <div className="w-full px-4 mb-2">
            <Stepper activeStep={currentStep} steps={steps} />
          </div>
        )}

        <CardTile className="bg-card border border-border shadow-md rounded-xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            
            {/* STEP 0: Backend Type */}
            {currentStep === 0 && (
              <BackendTypeSection value={backendType} onChange={setBackendType} options={backendTypes} />
            )}

            {/* STEP 1: Deployment Mode */}
            {currentStep === 1 && (
              <DeploymentModeSection isCloud={isCloud} onSelect={setIsCloud} />
            )}

            {/* STEP 2: Connectivity (Cloud or Cloud Connector) */}
            {currentStep === 2 && (
              <div className="flex flex-col">
                {isCloud && showCloudForm && (
                  <CloudFormSection
                    title={cloudTitle}
                    description={cloudDescription}
                    showProxyType={showProxyType}
                    urlPlaceholder={cloudUrlPlaceholder}
                  />
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
                        <SectionHeader
                          title="Automated Setup"
                          description="Download and run the batch script. It installs JDK, extracts Cloud Connector, and starts it — fully automated."
                        />
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
                    <SystemMappingSection backendType={backendType} />
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

              {currentStep === totalSteps - 1 ? (
                <Button 
                  onClick={onSave} 
                  disabled={!canProceed}
                  className="w-32"
                >
                  {saveLabel}
                </Button>
              ) : (
                <Button 
                  onClick={nextStep} 
                  disabled={!canProceed}
                  className="w-32"
                >
                  Next
                </Button>
              )}
            </div>

          </div>
        </CardTile>

        <p className="text-center text-xs text-muted-foreground pb-4 mt-2">
          {LABELS.footer}
        </p>
      </div>
    </div>
  );
}
