import { useSystemSetup } from "@/hooks/useSystemSetup";
import { SystemSetupView } from "../views/SystemSetupView";

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

  return (
    <SystemSetupView
      title="Source System Configuration"
      saveLabel="Save Source System"
      backendTypes={SOURCE_BACKEND_TYPES}
      cloudUrlPlaceholder="https://<account>.successfactors.com"
      cloudTitle="HTTP / HTTPS Connection"
      cloudDescription="Configure the connection details for your cloud SAP source system."
      showProxyType={false}
      onSave={() => {}}
      {...setup}
    />
  );
}
