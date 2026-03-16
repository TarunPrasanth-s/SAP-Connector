export interface SidebarTab {
  id: "Source System" | "Target System" | "Proxy System";
  label: string;
  description: string;
}

export const SIDEBAR_TABS: SidebarTab[] = [
  { id: "Source System", label: "Source System", description: "Read users from" },
  { id: "Target System", label: "Target System", description: "Provision users to" },
  { id: "Proxy System", label: "Proxy System", description: "Expose as SCIM 2.0" },
];

export type TabId = SidebarTab["id"];
