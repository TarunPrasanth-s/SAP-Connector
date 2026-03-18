import type { ReactNode } from "react";
import type { NoticeType } from "@/types/common";

const noticeClasses: Record<NoticeType, string> = {
  info: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
  warning: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
  success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
};

export function Notice({ type = "info", children }: { type?: NoticeType; children: ReactNode }) {
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${noticeClasses[type]}`}>
      {children}
    </div>
  );
}
