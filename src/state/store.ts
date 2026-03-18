import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import connectionsReducer, { type ConnectionsState } from "./connectionsSlice";

const STORAGE_KEY = "sap_connector_connections";

function loadFromStorage(): ConnectionsState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as ConnectionsState;
  } catch {
    return undefined;
  }
}

function saveToStorage(state: ConnectionsState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage quota or unavailable — silently ignore
  }
}

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    connections: connectionsReducer,
  },
  preloadedState: {
    connections: loadFromStorage(),
  },
});

store.subscribe(() => {
  saveToStorage(store.getState().connections);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
