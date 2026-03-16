import { Field } from "../Field";
import { Notice } from "../Notice";
import { SectionHeader } from "../SectionHeader";
import styles from "../SystemSetup.module.css";

export function ChangePasswordSection() {
  return (
    <div className={styles.section}>
      <SectionHeader
        title="Change Administrator Password"
        description="The default password must be changed before continuing."
      />
      <Notice type="warning">
        Default credentials were used for initial login (<strong>Administrator / manage</strong>). Set a new password to secure your instance.
      </Notice>
      <div className={styles.grid2} style={{ marginTop: "1rem" }}>
        <Field label="New Password" type="password" required placeholder="Min 8 chars" hint="At least 1 uppercase, 1 number, 1 special character" />
        <Field label="Confirm Password" type="password" required placeholder="Re-enter password" />
      </div>
    </div>
  );
}
