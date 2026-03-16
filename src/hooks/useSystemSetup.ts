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

  const isCloud = backendType ? CLOUD_TYPES.has(backendType) : false;
  const isOnPrem = backendType ? !isCloud : false;

  useEffect(() => {
    setHasCC(null);
    setSetupDone(false);
  }, [backendType]);

  const showCCQuestion = isOnPrem;
  const showExistingCC = isOnPrem && hasCC === "yes";
  const showAutoSetup = isOnPrem && hasCC === "no";
  const showChangePwd = isOnPrem && hasCC === "no" && setupDone;
  const showBTPFields = isOnPrem && hasCC === "no" && setupDone;
  const showMapping = isOnPrem && (hasCC === "yes" || (hasCC === "no" && setupDone));
  const showCloudForm = isCloud;
  const showSave = showMapping || showCloudForm;

  return {
    backendType,
    setBackendType,
    hasCC,
    setHasCC,
    setupDone,
    setSetupDone,
    isCloud,
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
