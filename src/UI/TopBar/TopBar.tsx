import { Bell, HelpCircle, Sun, Moon, UserCircle, Settings, LogOut } from "lucide-react";
import logo from "@/assets/syplat_logo.png";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppState } from "@/state/AppContext";

interface TopBarProps {
  userInitials?: string;
  userName?: string;
  userEmail?: string;
  notificationCount?: number;
}

export function TopBar({
  userInitials = "AP",
  userName = "Admin Panel",
  userEmail = "admin@company.com",
  notificationCount = 3,
}: TopBarProps) {
  const { theme, toggle } = useTheme();
  const { toggleHelpSidebar, isHelpSidebarOpen } = useAppState();

  return (
    <header className="h-14 bg-background border-b flex items-center justify-between px-5 sticky top-0 z-40 transition-colors duration-200">
      <a href="/" className="flex items-center gap-3 no-underline">
        <img
          src={logo}
          alt="SYplat"
          className="h-9 w-auto block dark:bg-white dark:p-1 dark:rounded dark:shadow-sm transition-all"
        />
        <span className="font-bold text-lg tracking-tight text-foreground hidden sm:block">
          SAP Connector
        </span>
      </a>

      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              onClick={toggle}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="mt-1">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </TooltipContent>
        </Tooltip>

        {/* Notifications with badge */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </Button>
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white pointer-events-none leading-none">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="mt-1">
            {notificationCount > 0 ? `${notificationCount} notifications` : "Notifications"}
          </TooltipContent>
        </Tooltip>

        {/* Help */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant={isHelpSidebarOpen ? "secondary" : "ghost"}
              size="icon"
              className={`rounded-full transition-colors ${
                isHelpSidebarOpen
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
              aria-label="Help"
              onClick={toggleHelpSidebar}
            >
              <HelpCircle size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="mt-1">
            Help
          </TooltipContent>
        </Tooltip>

        {/* User avatar with dropdown */}
        <DropdownMenu>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 ml-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 ring-2 ring-transparent hover:ring-border">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="mt-1">
              Profile
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="end" className="w-52 mt-1">
            <DropdownMenuLabel className="pb-2">
              <p className="text-sm font-semibold text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground font-normal">{userEmail}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2 text-sm">
              <UserCircle className="h-4 w-4 text-muted-foreground" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-sm">
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2 text-sm text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
