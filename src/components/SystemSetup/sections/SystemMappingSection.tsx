import { Field } from "../Field";
import { Dropdown } from "@/UI/Dropdown/Dropdown";
import { Label } from "@/UI/Label/Label";
import { SectionHeader } from "../SectionHeader";

interface SystemMappingSectionProps {
  backendType: string;
}

export function SystemMappingSection({ backendType }: SystemMappingSectionProps) {
  return (
    <div className="p-6">
      <SectionHeader title="System Mapping" description="Define the virtual-to-internal host mapping for your SAP backend." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown label="Protocol" required options={["RFC", "HTTP"]} />
        <div>
          <Label>Back-end Type</Label>
          <div className="w-full border border-border rounded-md px-3.5 py-2.5 text-base bg-muted text-muted-foreground">{backendType}</div>
        </div>
        <Field label="Virtual Host" required placeholder="sap.virtual.cloud" hint="Virtual hostname exposed to BTP" />
        <Field label="Virtual Port" required placeholder="e.g. 443" hint="Virtual port exposed to BTP" />
        <Field label="Internal Host" required placeholder="sap.internal.local" hint="Hostname of the on-prem SAP system" />
        <Field label="Internal Port" required placeholder="e.g. 443" hint="Port of the SAP backend" />
        <Field label="SAProuter" placeholder="/H/router/S/3299" hint="Optional — only if SAProuter is in use" />
        <Field label="System ID" required placeholder="e.g. HHJ" hint="3-character SAP System ID" />
        <Dropdown label="Principal Type" required options={["None", "Kerberos"]} />
        <Field label="SNC Partner Name" placeholder="p:CN=SAP..." hint="Optional — required when Principal Type is Kerberos" />
        <Field label="Host in Request Header" placeholder="Use Virtual Host" hint="Optional override" />
        <div className="col-span-1 md:col-span-2">
          <Label>System Certificate for Logon</Label>
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer mt-1">
            <input type="checkbox" className="rounded border-border text-primary cursor-pointer" />
            Enable certificate-based logon
          </label>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Label>Description</Label>
          <textarea
            placeholder="Optional description for this system mapping"
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-base bg-background text-foreground outline-none resize-none h-24 transition-colors duration-150
            hover:border-muted-foreground/50
            focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
}
