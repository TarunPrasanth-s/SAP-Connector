import { useSystemSetup } from "@/hooks/useSystemSetup";
import { SystemSetupView } from "../views/SystemSetupView";

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

  return (
    <SystemSetupView
      title="Target System Configuration"
      saveLabel="Save Target System"
      backendTypes={TARGET_BACKEND_TYPES}
      cloudUrlPlaceholder="https://<account>.workzone.ondemand.com"
      cloudTitle="HTTP / HTTPS Destination"
      cloudDescription="Configure the destination for your cloud SAP system."
      showProxyType={true}
      onSave={() => {}}
      {...setup}
    />
  );
}
