import { useState, useEffect, type ComponentType } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Database,
  Server,
  Component,
  MessageSquare,
  Settings,
  ChevronDown,
  Network,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { setActiveTab } from "@/state/uiSlice";
import type { TabId } from "@/constants/sidebarConfig";
import type { RootState } from "@/state/store";
import { RoutePaths } from "@/routes/RoutePaths";

const MIGRATION_SUB_ITEMS: { icon: ComponentType<{ size?: number; className?: string }>; tab: TabId; label: string }[] = [
  { icon: Database, tab: "Source System", label: "Source System" },
  { icon: Server, tab: "Target System", label: "Target System" },
  { icon: Component, tab: "Proxy System", label: "Proxy System" },
];

export function LeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const activeTab = useSelector((s: RootState) => s.ui.activeTab);

  const isMigrationRoute =
    location.pathname === RoutePaths.MIGRATION || location.pathname === RoutePaths.HOME;

  const [migrationOpen, setMigrationOpen] = useState(isMigrationRoute);

  useEffect(() => {
    if (isMigrationRoute) setMigrationOpen(true);
  }, [isMigrationRoute]);

  return (
    <aside className="w-56 min-h-[calc(100vh-3.5rem)] bg-background border-r flex flex-col py-4 flex-shrink-0 relative z-10 transition-colors duration-200">
      {/* New Connection button */}
      <div className="px-3 mb-4">
        <button className="w-full h-9 flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-[0.98]">
          <Plus size={15} className="stroke-[2.5px]" />
          New Connection
        </button>
      </div>

      <div className="mx-3 h-px bg-border mb-2" />

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 overflow-y-auto">
        {/* Dashboard */}
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          isActive={location.pathname === RoutePaths.DASHBOARD}
          onClick={() => navigate(RoutePaths.DASHBOARD)}
        />

        {/* Migration — collapsible */}
        <Collapsible open={migrationOpen} onOpenChange={setMigrationOpen}>
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                isMigrationRoute
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              onClick={() => {
                if (!isMigrationRoute) navigate(RoutePaths.MIGRATION);
              }}
            >
              {isMigrationRoute && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-primary rounded-r-full" />
              )}
              <Network
                size={18}
                className={cn("shrink-0", isMigrationRoute ? "stroke-[2px]" : "stroke-[1.5px]")}
              />
              <span className="flex-1 text-left">Migration</span>
              <ChevronDown
                size={14}
                className={cn(
                  "shrink-0 transition-transform duration-200",
                  migrationOpen ? "rotate-180" : "",
                  isMigrationRoute ? "text-primary" : "text-muted-foreground"
                )}
              />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent className="ml-5 mt-0.5 border-l border-border pl-3 space-y-0.5">
            {MIGRATION_SUB_ITEMS.map(({ icon: Icon, tab, label }) => {
              const isSubActive = isMigrationRoute && activeTab === tab;
              return (
                <button
                  key={tab}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-all duration-150",
                    isSubActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                  onClick={() => {
                    dispatch(setActiveTab(tab));
                    if (!isMigrationRoute) navigate(RoutePaths.MIGRATION);
                  }}
                >
                  <Icon
                    size={15}
                    className={cn("shrink-0", isSubActive ? "stroke-[2px]" : "stroke-[1.5px]")}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </CollapsibleContent>
        </Collapsible>

      </nav>

      {/* Bottom Navigation */}
      <div className="mx-3 h-px bg-border mt-2 mb-2" />
      <div className="px-2 flex flex-col gap-0.5">
        <NavItem
          icon={MessageSquare}
          label="Feedback"
          isActive={false}
          onClick={() => {}}
        />
        <NavItem
          icon={Settings}
          label="Settings"
          isActive={false}
          onClick={() => {}}
        />
      </div>
    </aside>
  );
}

function NavItem({
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
      onClick={onClick}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-primary rounded-r-full" />
      )}
      <Icon size={18} className={cn("shrink-0", isActive ? "stroke-[2px]" : "stroke-[1.5px]")} />
      <span>{label}</span>
    </button>
  );
}
