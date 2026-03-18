import type { ReactNode } from "react";
import { BookOpen, ExternalLink, Lightbulb, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RightSidebarProps {
  children?: ReactNode;
}

export function RightSidebar({ children }: RightSidebarProps) {
  return (
    <aside className="w-80 shrink-0 border-l border-border bg-card overflow-y-auto hidden xl:flex flex-col">
      <div className="p-6 flex-1 flex flex-col gap-8">
        {children ? (
          children
        ) : (
          <>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold text-foreground">Quick Guidance</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Connect your SAP systems seamlessly. Choose your landscape, configure connectivity, and map your distinct environments to begin synchronization.
              </p>
              <Button variant="outline" className="w-full justify-start text-sm h-9">
                <PlayCircle className="mr-2 h-4 w-4" /> Watch Setup Tutorial
              </Button>
            </div>

            <div className="h-px bg-border w-full" />

            <div>
              <h3 className="font-semibold text-foreground mb-4">Documentation</h3>
              <ul className="space-y-3">
                {[
                  "Prerequisites for On-Premise",
                  "Cloud Connector Setup Guide",
                  "Understanding SCIM 2.0 Mapping",
                  "Troubleshooting Sync Errors"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
                      <BookOpen className="mr-2 h-4 w-4 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
                      <span className="flex-1 truncate">{item}</span>
                      <ExternalLink className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-auto rounded-lg bg-primary/5 border border-primary/10 p-4">
              <h4 className="text-sm font-semibold text-primary mb-1">Need Enterprise Support?</h4>
              <p className="text-xs text-muted-foreground mb-3">Our engineers are available 24/7 for your critical deployments.</p>
              <Button size="sm" className="w-full text-xs h-8">Contact Support</Button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
