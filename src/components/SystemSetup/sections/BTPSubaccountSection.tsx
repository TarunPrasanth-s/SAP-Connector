import { Field } from "../Field";
import { Dropdown } from "@/UI/Dropdown/Dropdown";
import { SectionHeader } from "../SectionHeader";
import styles from "../SystemSetup.module.css";

const BTP_REGIONS = [
  "cf.eu10.hana.ondemand.com",
  "cf.us10.hana.ondemand.com",
  "cf.ap10.hana.ondemand.com",
  "cf.ap21.hana.ondemand.com",
  "cf.br10.hana.ondemand.com",
  "hanatrial.ondemand.com",
];

export function BTPSubaccountSection() {
  return (
    <div className={styles.section}>
      <SectionHeader title="BTP Subaccount" description="Connect your Cloud Connector to your SAP BTP subaccount." />
      <div className={styles.grid2}>
        <Dropdown label="Region" required options={BTP_REGIONS} hint="Your SAP BTP region host" />
        <Field label="Subaccount ID" required placeholder="e.g. 653ffe4e-ed14-4291..." hint="Found in BTP Cockpit → Overview" />
        <Field label="Subaccount Username" required placeholder="email@company.com" />
        <Field label="Subaccount Password" required type="password" placeholder="••••••••" />
      </div>
    </div>
  );
}
