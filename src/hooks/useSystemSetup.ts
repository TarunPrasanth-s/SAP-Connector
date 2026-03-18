import { useState, useEffect } from "react";
import type { CCStatus } from "@/types/common";

const CLOUD_TYPES = new Set([
  "Identity Authentication",
  "Local Identity Directory",
  "SAP S/4HANA Cloud Public Edition",
  "SAP SuccessFactors",
  "SAP Ariba Applications",
  "SAP Analytics Cloud",
  "SAP Concur",
  "SAP FieldGlass",
  "SAP Sales Cloud and Service Cloud",
  "SAP BTP XS Advanced UAA",
  "SAP Build Work Zone",
  "SAP HANA Cloud Database",
  "SAP Cloud Identity Access Governance",
  "Microsoft Azure Active Directory",
  "Generic SCIM System",
]);

export function useSystemSetup() {
  const [backendType, setBackendType] = useState<string>("");
  const [hasCC, setHasCC] = useState<CCStatus>(null);
  const [setupDone, setSetupDone] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Track explicit user selection, falling back to computed type
  const [userCloudOverride, setUserCloudOverride] = useState<boolean | null>(null);

  const defaultIsCloud = backendType ? CLOUD_TYPES.has(backendType) : false;
  const isCloud = userCloudOverride !== null ? userCloudOverride : defaultIsCloud;
  const isOnPrem = backendType ? !isCloud : false;

  useEffect(() => {
    setHasCC(null);
    setSetupDone(false);
    setCurrentStep(0); // Reset step when backend changes
    setUserCloudOverride(null); // Reset explicit override on backend change
  }, [backendType]);

  const showCCQuestion = isOnPrem;
  const showExistingCC = isOnPrem && hasCC === "yes";
  const showAutoSetup = isOnPrem && hasCC === "no";
  const showChangePwd = isOnPrem && hasCC === "no" && setupDone;
  const showBTPFields = isOnPrem && hasCC === "no" && setupDone;
  const showMapping = isOnPrem && (hasCC === "yes" || (hasCC === "no" && setupDone));
  const showCloudForm = isCloud;
  const showSave = showMapping || showCloudForm;

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  let canProceed = false;
  let totalSteps = isCloud ? 3 : 4;

  if (currentStep === 0) {
    canProceed = !!backendType;
  } else if (currentStep === 1) {
    // Deployment mode is static display based on backend type
    canProceed = true; 
  } else if (currentStep === 2) {
    if (isCloud) {
       canProceed = true; // Wait, for cloud, step 2 is CloudForm, it has its own validation but we'll let proceed save.
    } else {
       canProceed = hasCC !== null;
    }
  } else if (currentStep === 3) {
    canProceed = true;
  }

  return {
    backendType,
    setBackendType,
    hasCC,
    setHasCC,
    setupDone,
    setSetupDone,
    currentStep,
    nextStep,
    prevStep,
    canProceed,
    totalSteps,
    isCloud,
    setIsCloud: setUserCloudOverride, // Expose setter to the view
    isOnPrem,
    showCCQuestion,
    showExistingCC,
    showAutoSetup,
    showChangePwd,
    showBTPFields,
    showMapping,
    showCloudForm,
    showSave,
  };
}
