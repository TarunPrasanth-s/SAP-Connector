import { useSidebar } from "@/hooks/useSidebar";
import { SourceSystemSetup } from "./containers/SourceSystemSetup";
import { TargetSystemSetup } from "./containers/TargetSystemSetup";
import { ProxySystemSetup } from "./containers/ProxySystemSetup";
import styles from "./migration.module.css";

export default function MigrationPage() {
  const { activeTab } = useSidebar();

  return (
    <div className={styles.page}>
      {activeTab === "Source System" && <SourceSystemSetup />}
      {activeTab === "Target System" && <TargetSystemSetup />}
      {activeTab === "Proxy System" && <ProxySystemSetup />}
    </div>
  );
}
