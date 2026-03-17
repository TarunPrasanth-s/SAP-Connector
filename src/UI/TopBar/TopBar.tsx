import { Bell, Settings, HelpCircle, Sun, Moon } from "lucide-react";
import logo from "@/assets/syplat_logo.png";
import { useTheme } from "@/hooks/useTheme";
import styles from "./TopBar.module.css";

interface TopBarProps {
  userInitials?: string;
}

export function TopBar({ userInitials = "AP" }: TopBarProps) {
  const { theme, toggle } = useTheme();

  return (
    <header className={styles.topbar}>
      <a href="/" className={styles.logo}>
        <img src={logo} alt="SYplat" className={styles.logoImg} />
      </a>

      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={toggle}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

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
