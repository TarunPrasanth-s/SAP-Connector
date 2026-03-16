import { useState } from "react";
import SourceSystemSetup from "@/components/SourceSystemSetup";
import TargetSystemSetup from "@/components/TargetSystemSetup";
import ProxySystemSetup from "@/components/ProxySystemSetup";

const TABS = [
  {
    id: "Source System",
    label: "Source System",
    description: "Read users from",
  },
  {
    id: "Target System",
    label: "Target System",
    description: "Provision users to",
  },
  {
    id: "Proxy System",
    label: "Proxy System",
    description: "Expose as SCIM 2.0",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Index() {
  const [active, setActive] = useState<TabId>("Source System");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Sidebar ── */}
      <aside className="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col py-8 px-4 gap-1 flex-shrink-0">
        {/* Logo / App Title */}
        <div className="mb-8 px-2">
          <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">SAP Connectivity</p>
          <p className="text-xs text-gray-400 mt-0.5">Automation Platform</p>
        </div>

        {/* Nav Items */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">Systems</p>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 group
              ${active === tab.id ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
          >
            <p className={`text-sm font-semibold ${active === tab.id ? "text-white" : "text-gray-700"}`}>{tab.label}</p>
            <p className={`text-xs mt-0.5 ${active === tab.id ? "text-gray-400" : "text-gray-400"}`}>
              {tab.description}
            </p>
          </button>
        ))}
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto">
        {active === "Source System" && <SourceSystemSetup />}
        {active === "Target System" && <TargetSystemSetup />}
        {active === "Proxy System" && <ProxySystemSetup />}
      </main>
    </div>
  );
}
