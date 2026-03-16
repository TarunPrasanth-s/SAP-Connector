import { Plus, LayoutDashboard, LayoutGrid, Users, Settings } from "lucide-react";
import { type TabId } from "@/constants/sidebarConfig";
import styles from "./LeftSidebar.module.css";

interface LeftSidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const NAV_ICONS = [
  { icon: LayoutDashboard, tab: "Source System" as TabId, tooltip: "Source System" },
  { icon: LayoutGrid, tab: "Target System" as TabId, tooltip: "Target System" },
  { icon: Users, tab: "Proxy System" as TabId, tooltip: "Proxy System" },
];

export function LeftSidebar({ activeTab, onTabChange }: LeftSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <button className={styles.addBtn} aria-label="New">
        <Plus size={20} strokeWidth={2.5} />
      </button>

      <div className={styles.divider} />

      {NAV_ICONS.map(({ icon: Icon, tab, tooltip }) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          data-tooltip={tooltip}
          aria-label={tooltip}
          className={`${styles.navBtn} ${activeTab === tab ? styles.navBtnActive : ""}`}
        >
          <Icon size={21} />
        </button>
      ))}

      <div style={{ flex: 1 }} />

      <div className={styles.divider} />

      <button className={styles.navBtn} data-tooltip="Settings" aria-label="Settings">
        <Settings size={21} />
      </button>
    </aside>
  );
}
