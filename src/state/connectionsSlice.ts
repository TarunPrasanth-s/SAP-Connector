import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export interface SavedSystem {
  id: string;
  role: "source" | "target" | "proxy";
  backendType: string;
  deploymentMode: "cloud" | "on-premise";
  savedAt: string;
  status: "active";
  systemName?: string;
}

export interface EntryTypeConnection {
  leftId: string;
  rightId: string;
}

export interface SystemConfiguration {
  id: string;
  name: string;
  sourceId: string;
  targetId: string;
  proxyId?: string;
  createdAt: string;
  status: "active";
}

export interface ConnectionsState {
  savedSystems: SavedSystem[];
  entryTypeMappings: EntryTypeConnection[];
  systemConfigurations: SystemConfiguration[];
}

const initialState: ConnectionsState = {
  savedSystems: [],
  entryTypeMappings: [],
  systemConfigurations: [],
};

export const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    saveSystem(
      state,
      action: PayloadAction<Omit<SavedSystem, "id" | "savedAt" | "status">>
    ) {
      const newSystem: SavedSystem = {
        ...action.payload,
        id: nanoid(),
        savedAt: new Date().toISOString(),
        status: "active",
      };
      
      // Allow multiple instances per role (N-to-N architecture).
      state.savedSystems.push(newSystem);
    },

    removeSystem(state, action: PayloadAction<string>) {
      // Also remove any configurations that reference this system
      state.systemConfigurations = state.systemConfigurations.filter(
        (c) =>
          c.sourceId !== action.payload &&
          c.targetId !== action.payload &&
          c.proxyId !== action.payload
      );
      state.savedSystems = state.savedSystems.filter((s) => s.id !== action.payload);
    },

    setEntryTypeMappings(state, action: PayloadAction<EntryTypeConnection[]>) {
      state.entryTypeMappings = action.payload;
    },

    addSystemConfiguration(
      state,
      action: PayloadAction<Omit<SystemConfiguration, "id" | "createdAt" | "status">>
    ) {
      state.systemConfigurations.push({
        ...action.payload,
        id: nanoid(),
        createdAt: new Date().toISOString(),
        status: "active",
      });
    },

    removeSystemConfiguration(state, action: PayloadAction<string>) {
      state.systemConfigurations = state.systemConfigurations.filter(
        (c) => c.id !== action.payload
      );
    },
  },
});

export const {
  saveSystem,
  removeSystem,
  setEntryTypeMappings,
  addSystemConfiguration,
  removeSystemConfiguration,
} = connectionsSlice.actions;

export default connectionsSlice.reducer;
