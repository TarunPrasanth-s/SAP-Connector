import { Field } from "../Field";
import { SectionHeader } from "../SectionHeader";

export function ExistingCCSection() {
  return (
    <div className="p-6">
      <SectionHeader
        title="Cloud Connector Credentials"
        description="Provide the credentials for your running Cloud Connector instance."
      />
      <div className="flex flex-col gap-4">
        <Field label="Cloud Connector URL" value="https://localhost:8443" required hint="Default URL: https://localhost:8443" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Username" value="Administrator" required />
          <Field label="Password" type="password" placeholder="Enter password" required />
        </div>
      </div>
    </div>
  );
}
