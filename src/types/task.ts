export interface SystemMapping {
  protocol: string;
  backendType: string;
  virtualHost: string;
  virtualPort: string;
  internalHost: string;
  internalPort: string;
  saprouter?: string;
  systemId: string;
  principalType: string;
  sncPartnerName?: string;
  hostInRequestHeader?: string;
  certificateLogon: boolean;
  description?: string;
}

export interface CloudConnection {
  url: string;
  type: string;
  proxyType?: string;
  authentication: string;
  user: string;
  password: string;
  clientId?: string;
  sapClient?: string;
}

export type SystemType = "source" | "target" | "proxy";
