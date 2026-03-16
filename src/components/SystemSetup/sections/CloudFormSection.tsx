import { Field } from "../Field";
import { Dropdown } from "@/UI/Dropdown/Dropdown";
import { SectionHeader } from "../SectionHeader";
import styles from "../SystemSetup.module.css";

interface CloudFormSectionProps {
  title?: string;
  description?: string;
  showProxyType?: boolean;
  urlPlaceholder?: string;
}

export function CloudFormSection({
  title = "HTTP / HTTPS Destination",
  description = "Configure the destination for your cloud SAP system.",
  showProxyType = false,
  urlPlaceholder = "https://<account>.workzone.ondemand.com",
}: CloudFormSectionProps) {
  return (
    <div className={styles.section}>
      <SectionHeader title={title} description={description} />
      <div className={styles.grid2}>
        <div className={styles.colSpan2}>
          <Field label="URL" required placeholder={urlPlaceholder} hint="Your SAP cloud system endpoint URL" />
        </div>
        <Dropdown label="Type" required options={["HTTP", "HTTPS"]} hint="Use HTTPS for secure connections (recommended)" />
        {showProxyType && <Dropdown label="Proxy Type" required options={["Internet", "OnPremise"]} />}
        <Dropdown label="Authentication" required options={["BasicAuthentication", "ClientCertificateAuthentication"]} />
        <Field label="User" required placeholder="OAuth Client Key" hint="OAuth client key for your tenant" />
        <Field label="Password" required type="password" placeholder="••••••••" hint="OAuth client secret" />
        <Field label="Client ID" placeholder="OAuth Client ID" hint="Required for ClientCertificateAuthentication" />
        <Field label="SAP Client" placeholder="e.g. 100" hint="SAP client number" />
      </div>
    </div>
  );
}
