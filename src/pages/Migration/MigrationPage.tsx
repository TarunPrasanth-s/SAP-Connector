import { useSidebar } from "@/hooks/useSidebar";
import { SourceSystemSetup } from "./containers/SourceSystemSetup";
import { TargetSystemSetup } from "./containers/TargetSystemSetup";
import { ProxySystemSetup } from "./containers/ProxySystemSetup";

export default function MigrationPage() {
  const { activeTab } = useSidebar();

  return (
    <div className="h-full bg-background overflow-y-auto w-full">
      {activeTab === "Source System" && <SourceSystemSetup />}
      {activeTab === "Target System" && <TargetSystemSetup />}
      {activeTab === "Proxy System" && <ProxySystemSetup />}
    </div>
  );
}
