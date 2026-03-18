import { useState } from "react";
import { Button } from "@/UI/Button/Button";
import { Notice } from "./Notice";
import { LABELS } from "@/constants/labels";
import { CheckCircle2, Download } from "lucide-react";

interface SetupPanelProps {
  onComplete: () => void;
}

const STEPS = [
  "Open your Downloads folder",
  "Right-click setup-cloud-connector.bat",
  'Select "Run as Administrator"',
  "The script installs JDK, starts Cloud Connector and opens localhost:8443 automatically",
];

export function SetupPanel({ onComplete }: SetupPanelProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    onComplete();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className={`rounded-xl border p-6 transition-all duration-300 ${downloaded ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full shrink-0 ${downloaded ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            {downloaded ? <CheckCircle2 size={24} className="animate-in zoom-in-50" /> : <Download size={24} />}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground m-0 mb-1">
              {downloaded ? "Script Downloaded Successfully" : "Automated Setup Script"}
            </h3>
            <p className="text-sm text-muted-foreground m-0 mb-4 leading-relaxed">
              {downloaded
                ? "The batch script has been downloaded. Follow the timeline below to execute it and configure your On-Premises tunnel securely."
                : "Downloading this script will automatically install the Java Development Kit (JDK), extract the Cloud Connector, and start the local server. Recommended for quick setups."}
            </p>
            <Button onClick={handleDownload} variant={downloaded ? "outline" : "primary"} className="h-10 px-6">
              {downloaded ? LABELS.downloadAgain : LABELS.downloadScript}
            </Button>
          </div>
        </div>
      </div>

      {downloaded && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 ml-2 border-l-2 border-primary/20 pl-6 relative space-y-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative group">
                <div className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors text-xs font-bold text-muted-foreground group-hover:text-primary z-10 box-content">
                  {i + 1}
                </div>
                <div className="bg-card border border-border rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow group-hover:border-primary/20">
                  <p className="text-sm text-foreground m-0 font-medium">Step {i + 1}</p>
                  <p className="text-sm text-muted-foreground m-0 mt-1">{step}</p>
                </div>
              </div>
            ))}
          </div>

          <Notice type="warning">
            When the browser opens <strong>localhost:8443</strong>, accept the certificate warning then login with{" "}
            <strong>Administrator / manage</strong>.
          </Notice>
        </div>
      )}
    </div>
  );
}
