import type { ReactNode } from "react";
import { TopBar } from "@/UI/TopBar/TopBar";
import { LeftSidebar } from "@/UI/LeftSidebar/LeftSidebar";
import { RightSidebar } from "@/UI/RightSidebar/RightSidebar";
import { useAppState } from "@/state/AppContext";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isHelpSidebarOpen } = useAppState();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-3.5rem)] bg-muted/10 relative">
          {children}
        </main>
        {isHelpSidebarOpen && <RightSidebar />}
      </div>
    </div>
  );
}
