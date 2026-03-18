import type { ReactNode } from "react";

interface TaskBucketProps {
  title: string;
  children: ReactNode;
}

export function TaskBucket({ title, children }: TaskBucketProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 group">
      <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 transition-colors group-hover:text-primary">
        {title}
      </h4>
      <div className="flex flex-col gap-3 group-hover:translate-x-1 border-l-2 border-transparent pl-0 group-hover:border-primary/30 group-hover:pl-3 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
