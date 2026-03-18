import { CheckCircle2, Cloud, Server } from "lucide-react";
import { SectionHeader } from "../SectionHeader";

interface DeploymentModeSectionProps {
  isCloud: boolean;
  onSelect: (isCloud: boolean) => void;
}

export function DeploymentModeSection({ isCloud, onSelect }: DeploymentModeSectionProps) {
  return (
    <div className="p-6">
      <SectionHeader title="Deployment Mode" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {/* On-Premises Option */}
        <div
          onClick={() => onSelect(false)}
          className={`flex flex-col gap-3 rounded-xl border p-5 transition-all duration-300 relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-md cursor-pointer
            ${!isCloud 
              ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/50" 
              : "border-border bg-card hover:border-blue-500/30"}
          `}
        >
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg ${!isCloud ? "bg-blue-500/20 text-blue-600 dark:text-blue-400" : "bg-muted text-muted-foreground group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors"}`}>
              <Server size={24} strokeWidth={2} />
            </div>
            {!isCloud && <CheckCircle2 className="text-blue-500 h-6 w-6 animate-in zoom-in-50 duration-200" />}
          </div>
          <div>
            <p className={`text-base font-bold m-0 ${!isCloud ? "text-blue-600 dark:text-blue-400" : "text-foreground group-hover:text-blue-500 transition-colors"}`}>
              On-Premises
            </p>
            <p className="text-sm mt-1 text-muted-foreground leading-relaxed">
              Cloud Connector required to tunnel securely into your SAP backend behind the corporate firewall.
            </p>
          </div>
          <span className={`self-start text-xs font-semibold px-2 py-1 rounded shrink-0 mt-auto
              ${!isCloud ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors"}
            `}
          >
            RFC / HTTP
          </span>
        </div>

        {/* Cloud Option */}
        <div
          onClick={() => onSelect(true)}
          className={`flex flex-col gap-3 rounded-xl border p-5 transition-all duration-300 relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-md cursor-pointer
            ${isCloud 
              ? "border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500/50" 
              : "border-border bg-card hover:border-indigo-500/30"}
          `}
        >
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg ${isCloud ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400" : "bg-muted text-muted-foreground group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-colors"}`}>
              <Cloud size={24} strokeWidth={2} />
            </div>
            {isCloud && <CheckCircle2 className="text-indigo-500 h-6 w-6 animate-in zoom-in-50 duration-200" />}
          </div>
          <div>
            <p className={`text-base font-bold m-0 ${isCloud ? "text-indigo-600 dark:text-indigo-400" : "text-foreground group-hover:text-indigo-500 transition-colors"}`}>
              Cloud (BTP)
            </p>
            <p className="text-sm mt-1 text-muted-foreground leading-relaxed">
              Direct HTTP connection — no Cloud Connector required. Designed for public internet endpoints.
            </p>
          </div>
          <span className={`self-start text-xs font-semibold px-2 py-1 rounded shrink-0 mt-auto
              ${isCloud ? "bg-indigo-500 text-white" : "bg-muted text-muted-foreground group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-colors"}
            `}
          >
            HTTP / HTTPS
          </span>
        </div>
      </div>
    </div>
  );
}
