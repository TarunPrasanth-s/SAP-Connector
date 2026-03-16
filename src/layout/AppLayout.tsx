import type { ReactNode } from "react";
import { TopBar } from "@/UI/TopBar/TopBar";
import { LeftSidebar } from "@/UI/LeftSidebar/LeftSidebar";
import { useSidebar } from "@/hooks/useSidebar";
import styles from "./layout.module.css";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { activeTab, setActiveTab } = useSidebar();

  return (
    <div className={styles.shell}>
      <TopBar />
      <div className={styles.body}>
        <LeftSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
