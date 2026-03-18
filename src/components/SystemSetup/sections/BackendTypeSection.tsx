import { Dropdown } from "@/UI/Dropdown/Dropdown";
import { SectionHeader } from "../SectionHeader";

interface BackendTypeSectionProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  description?: string;
}

export function BackendTypeSection({ value, onChange, options, description }: BackendTypeSectionProps) {
  return (
    <div className="p-6">
      <SectionHeader
        title="Back-end Type"
        description={description ?? "Select the type of SAP system you are connecting to."}
      />
      <Dropdown required value={value} onChange={onChange} options={options} />
    </div>
  );
}
