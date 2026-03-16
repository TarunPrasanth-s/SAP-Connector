import { useState } from "react";
import { useSystemSetup } from "@/hooks/useSystemSetup";
import { ProxySystemSetupView } from "../views/ProxySystemSetupView";

const PROXY_BACKEND_TYPES = [
  "Identity Authentication",
  "Local Identity Directory",
  "SAP Application Server ABAP",
  "SAP S/4HANA On-Premise",
  "SAP SuccessFactors",
  "SAP Ariba Applications",
  "SAP Analytics Cloud",
  "SAP Sales Cloud and Service Cloud",
  "SAP BTP XS Advanced UAA",
  "Microsoft Active Directory",
  "Microsoft Azure Active Directory",
  "LDAP Server",
  "Generic SCIM System",
];

export function ProxySystemSetup() {
  const setup = useSystemSetup();
  const [systemName, setSystemName] = useState("");

  const proxyUrl = systemName
    ? `https://<your-tenant>.accounts.ondemand.com/ipsproxy/api/v1/scim/${systemName.toLowerCase().replace(/\s+/g, "-")}`
    : "https://<your-tenant>.accounts.ondemand.com/ipsproxy/api/v1/scim/<system-id>";

  return (
    <ProxySystemSetupView
      backendTypes={PROXY_BACKEND_TYPES}
      systemName={systemName}
      onSystemNameChange={setSystemName}
      proxyUrl={proxyUrl}
      onSave={() => {}}
      {...setup}
    />
  );
}
