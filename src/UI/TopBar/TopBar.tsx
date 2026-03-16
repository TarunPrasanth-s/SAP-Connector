import { Bell, Settings, HelpCircle } from "lucide-react";
import logo from "@/assets/syplat_logo.png";
import styles from "./TopBar.module.css";

interface TopBarProps {
  userInitials?: string;
}

export function TopBar({ userInitials = "AP" }: TopBarProps) {
  return (
    <header className={styles.topbar}>
      {/* Logo */}
      <a href="/" className={styles.logo}>
        <img src={logo} alt="SYplat" className={styles.logoImg} />
      </a>

      {/* Right actions */}
      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button className={styles.iconBtn} aria-label="Settings">
          <Settings size={20} />
        </button>
        <button className={styles.iconBtn} aria-label="Help">
          <HelpCircle size={20} />
        </button>
        <div className={styles.avatar}>{userInitials}</div>
      </div>
    </header>
  );
}
