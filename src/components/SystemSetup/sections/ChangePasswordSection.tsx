import { Field } from "../Field";
import { Notice } from "../Notice";
import { SectionHeader } from "../SectionHeader";

export function ChangePasswordSection() {
  return (
    <div className="p-6">
      <SectionHeader
        title="Change Administrator Password"
        description="The default password must be changed before continuing."
      />
      <Notice type="warning">
        Default credentials were used for initial login (<strong>Administrator / manage</strong>). Set a new password to secure your instance.
      </Notice>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Field label="New Password" type="password" required placeholder="Min 8 chars" hint="At least 1 uppercase, 1 number, 1 special character" />
        <Field label="Confirm Password" type="password" required placeholder="Re-enter password" />
      </div>
    </div>
  );
}
