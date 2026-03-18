import {
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import type { EntryTypeConnection } from "@/state/connectionsSlice";
import { MappingTable } from "./MappingTable";

interface TaskMappingProps {
  leftLabel?: string;
  rightLabel?: string;
  leftItems: string[];
  rightItems: string[];
  connections: EntryTypeConnection[];
  selectedLeft: string | null;
  selectedRight: string | null;
  draggedItem: string | null;
  onSelectLeft: (item: string) => void;
  onSelectRight: (item: string) => void;
  onDragStart: (leftId: string) => void;
  onDragEnd: () => void;
  onDrop: (rightId: string) => void;
  onRemoveConnection?: (leftId: string, rightId: string) => void;
}

interface Pos { id: string; y: number }
interface PathData { id: string; leftY: number; rightY: number; path: string }

export function TaskMapping({
  leftLabel = "Source System",
  rightLabel = "Target System",
  leftItems,
  rightItems,
  connections,
  selectedLeft,
  selectedRight,
  draggedItem,
  onSelectLeft,
  onSelectRight,
  onDragStart,
  onDragEnd,
  onDrop,
  onRemoveConnection,
}: TaskMappingProps) {
  const connectorRef = useRef<HTMLDivElement>(null);
  const leftCircleRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const rightCircleRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [leftPositions, setLeftPositions] = useState<Pos[]>([]);
  const [rightPositions, setRightPositions] = useState<Pos[]>([]);

  const setLeftRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) leftCircleRefs.current.set(id, el);
    else leftCircleRefs.current.delete(id);
  }, []);

  const setRightRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) rightCircleRefs.current.set(id, el);
    else rightCircleRefs.current.delete(id);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      if (!connectorRef.current) return;
      const base = connectorRef.current.getBoundingClientRect();

      const lp: Pos[] = [];
      leftCircleRefs.current.forEach((el, id) => {
        const r = el.getBoundingClientRect();
        lp.push({ id, y: r.top + r.height / 2 - base.top });
      });
      setLeftPositions(lp);

      const rp: Pos[] = [];
      rightCircleRefs.current.forEach((el, id) => {
        const r = el.getBoundingClientRect();
        rp.push({ id, y: r.top + r.height / 2 - base.top });
      });
      setRightPositions(rp);
    };

    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", measure); };
  }, [leftItems, rightItems, connections]);

  const isLeftConnected = useCallback(
    (id: string) => connections.some((c) => c.leftId === id),
    [connections]
  );
  const isRightConnected = useCallback(
    (id: string) => connections.some((c) => c.rightId === id),
    [connections]
  );

  const paths = useMemo((): PathData[] =>
    connections.flatMap((conn) => {
      const lp = leftPositions.find((p) => p.id === conn.leftId);
      const rp = rightPositions.find((p) => p.id === conn.rightId);
      if (!lp || !rp) return [];
      const mid = 50;
      return [{
        id: `${conn.leftId}-${conn.rightId}`,
        leftY: lp.y,
        rightY: rp.y,
        path: `M 8 ${lp.y} C ${mid} ${lp.y}, ${mid} ${rp.y}, 92 ${rp.y}`,
      }];
    }),
    [connections, leftPositions, rightPositions]
  );

  const svgHeight = useMemo(() => {
    const ys = [...leftPositions, ...rightPositions].map((p) => p.y);
    return ys.length === 0 ? 300 : Math.max(...ys) + 24;
  }, [leftPositions, rightPositions]);

  return (
    <div className="w-full py-4">
      {/* Three-column grid: left bucket | connector | right bucket */}
      <div className="grid grid-cols-[1fr_7rem_1fr] gap-0 items-start">

        {/* ── Left Bucket ── */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
            <h4 className="text-sm font-semibold text-foreground">{leftLabel}</h4>
            <span className="text-sm text-primary font-medium">{leftItems.length} items</span>
          </div>
          <ul className="list-none m-0 p-0 flex flex-col gap-2">
            {leftItems.map((item) => (
              <li key={item} className="relative flex items-center">
                <button
                  type="button"
                  draggable
                  className={cn(
                    "w-full h-10 px-3 text-sm font-medium bg-background border border-border rounded-md text-left flex items-center gap-2 transition-all select-none",
                    "hover:border-primary hover:bg-primary/5",
                    selectedLeft === item
                      ? "border-primary ring-2 ring-primary/20 text-primary"
                      : "text-muted-foreground",
                    isLeftConnected(item) && "border-primary bg-primary/5 text-primary",
                    draggedItem === item
                      ? "opacity-60 scale-[0.98] cursor-grabbing"
                      : "cursor-grab"
                  )}
                  onClick={() => onSelectLeft(item)}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", item);
                    e.dataTransfer.effectAllowed = "link";
                    onDragStart(item);
                  }}
                  onDragEnd={onDragEnd}
                >
                  <span className="text-muted-foreground/40 text-xs select-none tracking-widest shrink-0">⋮⋮</span>
                  <span className="flex-1 truncate">{item}</span>
                </button>
                {/* Endpoint circle — measured for SVG anchor */}
                <div
                  ref={(el) => setLeftRef(item, el)}
                  className={cn(
                    "absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-primary bg-background z-10 pointer-events-none transition-opacity",
                    isLeftConnected(item) ? "opacity-100" : "opacity-0"
                  )}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* ── Connector SVG ── */}
        <div className="flex flex-col" style={{ paddingTop: "calc(1.25rem + 1rem + 0.75rem + 1px + 1rem)" }}>
          <div className="relative min-h-[200px]" ref={connectorRef}>
            <svg
              className="absolute top-0 left-0 w-full overflow-visible pointer-events-none"
              viewBox={`0 0 100 ${svgHeight}`}
              preserveAspectRatio="none"
              style={{ height: `${svgHeight}px` }}
            >
              {paths.map(({ id, path, leftY, rightY }) => (
                <g key={id}>
                  <path
                    d={path}
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke="hsl(var(--primary))"
                    className="connection-path"
                  />
                  <circle cx="4" cy={leftY} r="4" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <circle cx="96" cy={rightY} r="4" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* ── Right Bucket ── */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
            <h4 className="text-sm font-semibold text-foreground">{rightLabel}</h4>
            <span className="text-sm text-primary font-medium">{rightItems.length} items</span>
          </div>
          <ul className="list-none m-0 p-0 flex flex-col gap-2">
            {rightItems.map((item) => (
              <li key={item} className="relative flex items-center">
                {/* Endpoint circle */}
                <div
                  ref={(el) => setRightRef(item, el)}
                  className={cn(
                    "absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-primary bg-background z-10 pointer-events-none transition-opacity",
                    isRightConnected(item) ? "opacity-100" : "opacity-0"
                  )}
                />
                <button
                  type="button"
                  className={cn(
                    "w-full h-10 px-3 text-sm font-medium bg-background border border-border rounded-md text-left flex items-center gap-2 transition-all",
                    "hover:border-primary hover:bg-primary/5",
                    selectedRight === item
                      ? "border-primary ring-2 ring-primary/20 text-primary"
                      : "text-muted-foreground",
                    isRightConnected(item) && "border-primary bg-primary/5 text-primary",
                    draggedItem && "border-dashed"
                  )}
                  onClick={() => onSelectRight(item)}
                  onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "link"; }}
                  onDrop={(e) => { e.preventDefault(); onDrop(item); }}
                >
                  <span className="flex-1 truncate">{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MappingTable connections={connections} onRemove={onRemoveConnection} />
    </div>
  );
}
