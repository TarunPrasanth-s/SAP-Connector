import { apiClient } from "./apiClient";
import type { SystemMapping, CloudConnection, SystemType } from "@/types/task";

export interface SystemConfig {
  type: SystemType;
  backendType: string;
  mapping?: SystemMapping;
  connection?: CloudConnection;
  proxySystemName?: string;
}

export const migrationService = {
  saveSystem: (config: SystemConfig) =>
    apiClient.post<{ id: string }>("/api/systems", config),
  getSystems: () => apiClient.get<SystemConfig[]>("/api/systems"),
};
