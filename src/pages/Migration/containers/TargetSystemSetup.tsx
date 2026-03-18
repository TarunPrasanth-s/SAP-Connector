import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSystemSetup } from "@/hooks/useSystemSetup";
import { SystemSetupView } from "../views/SystemSetupView";
import { saveSystem } from "@/state/connectionsSlice";
import { toast } from "sonner";

const TARGET_BACKEND_TYPES = [
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
  "SAP HANA Cloud Database",
  "SAP Cloud Identity Access Governance",
  "Microsoft Active Directory",
  "Microsoft Azure Active Directory",
  "LDAP Server",
  "Generic SCIM System",
];

export function TargetSystemSetup() {
  const setup = useSystemSetup();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    toast.loading("Saving target configuration...", { id: "save-target" });

    setTimeout(() => {
      dispatch(saveSystem({
        role: "target",
        backendType: setup.backendType,
        deploymentMode: setup.isCloud ? "cloud" : "on-premise",
      }));
      setIsSaving(false);
      toast.success("Target system configured successfully", { id: "save-target" });
      setup.setSetupDone(true);
    }, 1500);
  };

  return (
    <SystemSetupView
      title="Target System Configuration"
      saveLabel={isSaving ? "Saving..." : "Save Target System"}
      backendTypes={TARGET_BACKEND_TYPES}
      cloudUrlPlaceholder="https://<account>.workzone.ondemand.com"
      cloudTitle="HTTP / HTTPS Destination"
      cloudDescription="Configure the destination for your cloud SAP system."
      showProxyType={true}
      onSave={handleSave}
      isSaving={isSaving}
      {...setup}
    />
  );
}
