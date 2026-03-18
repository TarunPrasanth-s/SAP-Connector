import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSystemSetup } from "@/hooks/useSystemSetup";
import { ProxySystemSetupView } from "../views/ProxySystemSetupView";
import { saveSystem } from "@/state/connectionsSlice";
import { toast } from "sonner";

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
  const dispatch = useDispatch();
  const [systemName, setSystemName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const proxyUrl = systemName
    ? `https://<your-tenant>.accounts.ondemand.com/ipsproxy/api/v1/scim/${systemName.toLowerCase().replace(/\s+/g, "-")}`
    : "https://<your-tenant>.accounts.ondemand.com/ipsproxy/api/v1/scim/<system-id>";

  const handleSave = () => {
    setIsSaving(true);
    toast.loading("Generating proxy endpoint...", { id: "save-proxy" });

    setTimeout(() => {
      dispatch(saveSystem({
        role: "proxy",
        backendType: setup.backendType,
        deploymentMode: setup.isCloud ? "cloud" : "on-premise",
        systemName,
      }));
      setIsSaving(false);
      toast.success("Proxy system configured successfully", { id: "save-proxy" });
      setup.setSetupDone(true);
    }, 1500);
  };

  return (
    <ProxySystemSetupView
      backendTypes={PROXY_BACKEND_TYPES}
      systemName={systemName}
      onSystemNameChange={setSystemName}
      proxyUrl={proxyUrl}
      onSave={handleSave}
      isSaving={isSaving}
      {...setup}
    />
  );
}
