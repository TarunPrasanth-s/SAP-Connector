import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TabId } from "@/constants/sidebarConfig";

interface UIState {
  activeTab: TabId;
  sidebarOpen: boolean;
}

const initialState: UIState = {
  activeTab: "Source System",
  sidebarOpen: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabId>) {
      state.activeTab = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setActiveTab, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
