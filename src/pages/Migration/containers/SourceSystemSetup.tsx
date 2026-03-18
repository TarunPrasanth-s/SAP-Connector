import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSystemSetup } from "@/hooks/useSystemSetup";
import { SystemSetupView } from "../views/SystemSetupView";
import { saveSystem } from "@/state/connectionsSlice";
import { toast } from "sonner";

const SOURCE_BACKEND_TYPES = [
  "Identity Authentication",
  "Local Identity Directory",
  "SAP Application Server ABAP",
  "SAP S/4HANA On-Premise",
  "SAP S/4HANA Cloud Public Edition",
  "SAP SuccessFactors",
  "SAP Ariba Applications",
  "SAP Analytics Cloud",
  "SAP Concur",
  "SAP FieldGlass",
  "SAP Sales Cloud and Service Cloud",
  "SAP BTP XS Advanced UAA",
  "SAP Build Work Zone",
  "Microsoft Active Directory",
  "Microsoft Azure Active Directory",
  "LDAP Server",
  "Generic SCIM System",
];

export function SourceSystemSetup() {
  const setup = useSystemSetup();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    toast.loading("Saving configuration...", { id: "save-config" });

    setTimeout(() => {
      dispatch(saveSystem({
        role: "source",
        backendType: setup.backendType,
        deploymentMode: setup.isCloud ? "cloud" : "on-premise",
      }));
      setIsSaving(false);
      toast.success("Source system configured successfully", { id: "save-config" });
      setup.setSetupDone(true);
    }, 1500);
  };

  return (
    <SystemSetupView
      title="Source System Configuration"
      saveLabel={isSaving ? "Saving..." : "Save Configuration"}
      backendTypes={SOURCE_BACKEND_TYPES}
      cloudUrlPlaceholder="https://<tenant>.sapsf.com"
      cloudTitle="Cloud Connection Details"
      cloudDescription="Configure the API endpoint for your source system."
      showProxyType={false}
      onSave={handleSave}
      isSaving={isSaving}
      {...setup}
    />
  );
}
