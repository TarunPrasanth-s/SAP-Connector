import type { CCStatus } from "@/types/common";
import { SectionHeader } from "../SectionHeader";

interface CloudConnectorSectionProps {
  hasCC: CCStatus;
  onSelect: (v: CCStatus) => void;
}

const OPTIONS = [
  { val: "yes" as const, label: "Yes, it is installed" },
  { val: "no" as const, label: "No, set it up for me" },
];

export function CloudConnectorSection({ hasCC, onSelect }: CloudConnectorSectionProps) {
  return (
    <div className="p-6">
      <SectionHeader
        title="Cloud Connector"
        description="A Cloud Connector instance is required to route traffic from SAP BTP to your on-premises backend."
      />
      <p className="text-sm text-muted-foreground mb-3">
        Is Cloud Connector already installed and running on this machine?
      </p>
      <div className="flex gap-3">
        {OPTIONS.map((opt) => {
          const isSelected = hasCC === opt.val;
          return (
            <button
              key={opt.val}
              onClick={() => onSelect(opt.val)}
              className={`flex-1 p-2.5 rounded-md text-base font-semibold cursor-pointer transition-all duration-150 border
                ${isSelected 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-border bg-card text-muted-foreground hover:bg-accent/50"
                }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
