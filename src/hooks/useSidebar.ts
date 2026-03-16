import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/state/store";
import { setActiveTab, toggleSidebar } from "@/state/uiSlice";
import type { TabId } from "@/constants/sidebarConfig";

export function useSidebar() {
  const dispatch = useDispatch();
  const activeTab = useSelector((s: RootState) => s.ui.activeTab);
  const sidebarOpen = useSelector((s: RootState) => s.ui.sidebarOpen);

  return {
    activeTab,
    sidebarOpen,
    setActiveTab: (tab: TabId) => dispatch(setActiveTab(tab)),
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
}
