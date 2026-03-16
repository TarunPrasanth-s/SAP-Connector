import type { ReactNode } from "react";
import styles from "./TaskBucket.module.css";

interface TaskBucketProps {
  title: string;
  children: ReactNode;
}

export function TaskBucket({ title, children }: TaskBucketProps) {
  return (
    <div className={styles.bucket}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
