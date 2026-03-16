import type { ReactNode } from "react";
import type { NoticeType } from "@/types/common";
import styles from "./SystemSetup.module.css";

const noticeClass: Record<NoticeType, string> = {
  info: styles.noticeInfo,
  warning: styles.noticeWarning,
  success: styles.noticeSuccess,
};

export function Notice({ type = "info", children }: { type?: NoticeType; children: ReactNode }) {
  return <div className={`${styles.notice} ${noticeClass[type]}`}>{children}</div>;
}
