import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Database, Server, Component, Cloud, HardDrive, Plus, Link2,
  Trash2, CheckCircle2, Settings, X, ArrowRight, Unlink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import type { RootState } from "@/state/store";
import type { SavedSystem, SystemConfiguration } from "@/state/connectionsSlice";
import { removeSystem, addSystemConfiguration, removeSystemConfiguration } from "@/state/connectionsSlice";
import { setActiveTab } from "@/state/uiSlice";
import { RoutePaths } from "@/routes/RoutePaths";
import type { TabId } from "@/constants/sidebarConfig";

// ─── Tile layout constants ────────────────────────────────────────────────────
const TW = 224;   // tile width
const TH = 148;   // tile height
const GAP = 32;

const ROLE_META: Record<SavedSystem["role"], {
  icon: typeof Database; label: string; tab: TabId;
  color: string; bg: string; border: string; ring: string;
}> = {
  source: { icon: Database,  label: "Source", tab: "Source System", color: "text-blue-500",   bg: "bg-blue-500/10",   border: "border-blue-500/30",   ring: "ring-blue-500/40"   },
  target: { icon: Server,    label: "Target", tab: "Target System", color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/30", ring: "ring-violet-500/40" },
  proxy:  { icon: Component, label: "Proxy",  tab: "Proxy System",  color: "text-amber-500",  bg: "bg-amber-500/10",  border: "border-amber-500/30",  ring: "ring-amber-500/40"  },
};

type Pos = { x: number; y: number };
type PosMap = Record<string, Pos>;

function defaultPositions(systems: SavedSystem[]): PosMap {
  const map: PosMap = {};
  const cols: Record<SavedSystem["role"], number> = { source: 48, target: 48 + TW + 80, proxy: 48 + (TW + 80) * 2 };
  const counts: Record<SavedSystem["role"], number> = { source: 0, target: 0, proxy: 0 };
  for (const s of systems) {
    map[s.id] = { x: cols[s.role], y: 40 + counts[s.role] * (TH + GAP) };
    counts[s.role]++;
  }
  return map;
}

// ─── Quick-access category tiles ─────────────────────────────────────────────

function CategoryTile({
  role, count,
}: {
  role: SavedSystem["role"]; count: number;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { icon: Icon, label, tab, color, bg, border } = ROLE_META[role];

  const handleClick = () => {
    dispatch(setActiveTab(tab));
    navigate(RoutePaths.MIGRATION);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex-1 min-w-[160px] flex flex-col items-start gap-3 rounded-xl border-2 p-5 text-left transition-all duration-200",
        "hover:shadow-md hover:scale-[1.02] active:scale-[0.99]",
        "bg-card", border
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", bg)}>
          <Icon className={cn("h-5 w-5", color)} />
        </div>
        <span className={cn("text-2xl font-bold tabular-nums", color)}>{count}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{label} System</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {count === 0 ? "Click to configure" : `${count} configured`}
        </p>
      </div>
      <div className={cn("flex items-center gap-1 text-xs font-medium mt-auto", color)}>
        <Plus className="h-3 w-3" />
        {count === 0 ? "Add" : "Edit"}
        <ArrowRight className="h-3 w-3 ml-auto opacity-60" />
      </div>
    </button>
  );
}

// ─── System tile (draggable, connectable) ─────────────────────────────────────

function SystemTile({
  system, pos, isPendingSource, isConnectable, isConnected,
  onDragStart, onConnectClick, onConnectTo, onConfigure, onDelete,
}: {
  system: SavedSystem;
  pos: Pos;
  isPendingSource: boolean;
  isConnectable: boolean;
  isConnected: boolean;
  onDragStart: (id: string, e: React.MouseEvent) => void;
  onConnectClick: (id: string) => void;
  onConnectTo: (id: string) => void;
  onConfigure: () => void;
  onDelete: () => void;
}) {
  const { icon: Icon, label, color, bg, border, ring } = ROLE_META[system.role];
  const canBeSource = system.role === "source" || system.role === "proxy";

  return (
    <div
      className={cn(
        "absolute select-none rounded-xl border-2 bg-card shadow-md transition-shadow duration-150 group",
        "hover:shadow-lg",
        isPendingSource && "ring-2 ring-offset-2 ring-primary shadow-lg",
        isConnectable && "ring-2 ring-offset-2 ring-emerald-400 cursor-pointer",
        border,
      )}
      style={{ left: pos.x, top: pos.y, width: TW }}
      onMouseDown={(e) => {
        // Only start drag from the header, not buttons
        if ((e.target as HTMLElement).closest("button")) return;
        onDragStart(system.id, e);
      }}
      onClick={() => { if (isConnectable) onConnectTo(system.id); }}
    >
      {/* Drag header */}
      <div
        className={cn("flex items-center gap-2.5 px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing rounded-t-[10px]", bg)}
      >
        <Icon className={cn("h-4 w-4 shrink-0", color)} />
        <span className={cn("text-xs font-bold uppercase tracking-wider", color)}>{label}</span>
        {isConnected && (
          <span className="ml-auto">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-3 py-2.5">
        <p className="text-sm font-semibold text-foreground leading-snug truncate">
          {system.systemName || system.backendType}
        </p>
        {system.systemName && (
          <p className="text-xs text-muted-foreground truncate">{system.backendType}</p>
        )}
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
          {system.deploymentMode === "cloud"
            ? <Cloud className="h-3 w-3 text-primary/60" />
            : <HardDrive className="h-3 w-3 text-primary/60" />}
          <span className="capitalize">{system.deploymentMode}</span>
          <span className="mx-1 text-border">·</span>
          <span>{formatDistanceToNow(new Date(system.savedAt), { addSuffix: true })}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 px-3 pb-3">
        {/* Connect button — only for sources/proxies */}
        {canBeSource && (
          <button
            onClick={(e) => { e.stopPropagation(); onConnectClick(system.id); }}
            className={cn(
              "flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md transition-all",
              isPendingSource
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            )}
          >
            <Link2 className="h-3 w-3" />
            {isPendingSource ? "Cancel" : "Connect"}
          </button>
        )}
        <div className="ml-auto flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onConfigure(); }}
            className="h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            title="Configure"
          >
            <Settings className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Connection hint overlay */}
      {isConnectable && (
        <div className="absolute inset-0 rounded-[10px] flex items-center justify-center bg-emerald-500/10 pointer-events-none">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-500/20 px-2 py-1 rounded-full">
            Connect here
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Canvas playground ─────────────────────────────────────────────────────────

function CanvasPlayground({
  systems, configurations,
}: {
  systems: SavedSystem[];
  configurations: SystemConfiguration[];
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<PosMap>(() => defaultPositions(systems));
  const [dragging, setDragging] = useState<{ id: string; ox: number; oy: number } | null>(null);
  const [pendingSource, setPendingSource] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<Pos | null>(null);

  // Re-add positions for any newly added systems
  useEffect(() => {
    setPositions((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const s of systems) {
        if (!next[s.id]) {
          const existing = defaultPositions(systems);
          next[s.id] = existing[s.id] ?? { x: 48, y: 40 };
          changed = true;
        }
      }
      // Remove positions for deleted systems
      for (const id of Object.keys(next)) {
        if (!systems.find((s) => s.id === id)) {
          delete next[id];
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [systems]);

  const canvasHeight = useMemo(() => {
    const ys = Object.values(positions).map((p) => p.y + TH);
    return Math.max(520, ...ys) + 60;
  }, [positions]);

  const canvasWidth = useMemo(() => {
    const xs = Object.values(positions).map((p) => p.x + TW);
    return Math.max(900, ...xs) + 60;
  }, [positions]);

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const handleDragStart = useCallback((id: string, e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const pos = positions[id] ?? { x: 0, y: 0 };
    setDragging({
      id,
      ox: e.clientX - rect.left - pos.x,
      oy: e.clientY - rect.top  - pos.y,
    });
    e.preventDefault();
  }, [positions]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setMousePos({ x: mx, y: my });

    if (dragging) {
      setPositions((prev) => ({
        ...prev,
        [dragging.id]: {
          x: Math.max(0, mx - dragging.ox),
          y: Math.max(0, my - dragging.oy),
        },
      }));
    }
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  // ── Connection handlers ────────────────────────────────────────────────────
  const handleConnectClick = useCallback((id: string) => {
    setPendingSource((prev) => (prev === id ? null : id));
  }, []);

  const handleConnectTo = useCallback((targetId: string) => {
    if (!pendingSource) return;
    const src = systems.find((s) => s.id === pendingSource);
    const tgt = systems.find((s) => s.id === targetId);
    if (!src || !tgt) { setPendingSource(null); return; }

    // Check duplicate
    const exists = configurations.some(
      (c) => c.sourceId === pendingSource && c.targetId === targetId
    );
    if (exists) { toast.error("This connection already exists"); setPendingSource(null); return; }

    const name = `${src.backendType.split(" ").pop()} → ${tgt.backendType.split(" ").pop()}`;
    dispatch(addSystemConfiguration({ name, sourceId: pendingSource, targetId, proxyId: undefined }));
    toast.success(`Connected: ${name}`);
    setPendingSource(null);
  }, [pendingSource, systems, configurations, dispatch]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement) === canvasRef.current) setPendingSource(null);
  }, []);

  // ── SVG paths for connections ──────────────────────────────────────────────
  const connPaths = useMemo(() =>
    configurations.flatMap((cfg) => {
      const sp = positions[cfg.sourceId];
      const tp = positions[cfg.targetId];
      if (!sp || !tp) return [];
      const x1 = sp.x + TW, y1 = sp.y + TH / 2;
      const x2 = tp.x,       y2 = tp.y + TH / 2;
      const cx = (x1 + x2) / 2;
      return [{ id: cfg.id, path: `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`, cfg }];
    }),
    [configurations, positions]
  );

  // Rubber-band path while connecting
  const rubberPath = useMemo(() => {
    if (!pendingSource || !mousePos) return null;
    const sp = positions[pendingSource];
    if (!sp) return null;
    const x1 = sp.x + TW, y1 = sp.y + TH / 2;
    const cx = (x1 + mousePos.x) / 2;
    return `M${x1},${y1} C${cx},${y1} ${cx},${mousePos.y} ${mousePos.x},${mousePos.y}`;
  }, [pendingSource, mousePos, positions]);

  const sourceIds = new Set(systems.filter((s) => s.role === "source" || s.role === "proxy").map((s) => s.id));
  const connectedIds = new Set(configurations.flatMap((c) => [c.sourceId, c.targetId, c.proxyId ?? ""]));

  if (systems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] rounded-xl border-2 border-dashed border-border bg-muted/20 gap-4">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Link2 className="h-7 w-7 text-primary" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">No systems configured yet</p>
          <p className="text-sm text-muted-foreground mt-1">Use the tiles above to add Source, Target, or Proxy systems</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className={cn(
        "relative overflow-auto rounded-xl border border-border bg-muted/10",
        pendingSource ? "cursor-crosshair" : dragging ? "cursor-grabbing" : ""
      )}
      style={{ minHeight: canvasHeight, minWidth: "100%" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleCanvasClick}
    >
      {/* Dot grid background */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="hsl(var(--border))" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* SVG overlay for connection lines */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        {/* Saved connections */}
        {connPaths.map(({ id, path }) => (
          <g key={id}>
            {/* Shadow */}
            <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="5" strokeOpacity="0.1" strokeLinecap="round" />
            {/* Line */}
            <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"
              className="connection-path" strokeDasharray="none" />
            {/* Endpoint dots */}
          </g>
        ))}

        {/* Rubber-band line while connecting */}
        {rubberPath && (
          <path
            d={rubberPath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        )}
      </svg>

      {/* System tiles */}
      {systems.map((sys) => {
        const pos = positions[sys.id] ?? { x: 0, y: 0 };
        const isConnectable =
          !!pendingSource &&
          pendingSource !== sys.id &&
          sys.role === "target";

        return (
          <SystemTile
            key={sys.id}
            system={sys}
            pos={pos}
            isPendingSource={pendingSource === sys.id}
            isConnectable={isConnectable}
            isConnected={connectedIds.has(sys.id)}
            onDragStart={handleDragStart}
            onConnectClick={handleConnectClick}
            onConnectTo={handleConnectTo}
            onConfigure={() => {
              dispatch(setActiveTab(ROLE_META[sys.role].tab));
              navigate(RoutePaths.MIGRATION);
            }}
            onDelete={() => {
              dispatch(removeSystem(sys.id));
              toast.success(`${ROLE_META[sys.role].label} system removed`);
            }}
          />
        );
      })}

      {/* Connecting mode hint */}
      {pendingSource && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg pointer-events-none">
          <Link2 className="h-3.5 w-3.5" />
          Click a Target System tile to connect — or click the source tile again to cancel
        </div>
      )}
    </div>
  );
}

// ─── Configurations table ──────────────────────────────────────────────────────

function ConfigurationsTable({
  configurations, systems,
}: {
  configurations: SystemConfiguration[];
  systems: SavedSystem[];
}) {
  const dispatch = useDispatch();

  const find = (id?: string) => id ? systems.find((s) => s.id === id) : undefined;

  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="py-4 border-b border-border/50">
        <CardTitle className="text-base">Saved Configurations</CardTitle>
        <CardDescription className="text-xs">All provisioning pipelines you have created</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              {["#", "Name", "Source", "Target", "Proxy", "Created", "Status", ""].map((h, i) => (
                <TableHead key={i} className="h-9 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {configurations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                  No configurations yet — use the playground above to connect systems
                </TableCell>
              </TableRow>
            ) : (
              configurations.map((cfg, i) => {
                const src   = find(cfg.sourceId);
                const tgt   = find(cfg.targetId);
                const proxy = find(cfg.proxyId);
                return (
                  <TableRow key={cfg.id} className="group hover:bg-muted/20 transition-colors">
                    <TableCell className="pl-4 text-xs text-muted-foreground w-8">{i + 1}</TableCell>
                    <TableCell className="py-3 text-sm font-semibold text-foreground">{cfg.name}</TableCell>
                    <TableCell className="py-3">
                      {src ? (
                        <span className="flex items-center gap-1.5 text-xs">
                          <Database className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                          <span className="truncate max-w-[120px]">{src.systemName || src.backendType}</span>
                        </span>
                      ) : <span className="text-xs text-muted-foreground/50">—</span>}
                    </TableCell>
                    <TableCell className="py-3">
                      {tgt ? (
                        <span className="flex items-center gap-1.5 text-xs">
                          <Server className="h-3.5 w-3.5 text-violet-500 shrink-0" />
                          <span className="truncate max-w-[120px]">{tgt.systemName || tgt.backendType}</span>
                        </span>
                      ) : <span className="text-xs text-muted-foreground/50">—</span>}
                    </TableCell>
                    <TableCell className="py-3">
                      {proxy ? (
                        <span className="flex items-center gap-1.5 text-xs">
                          <Component className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span className="truncate max-w-[100px]">{proxy.systemName || proxy.backendType}</span>
                        </span>
                      ) : <span className="text-xs text-muted-foreground/40">—</span>}
                    </TableCell>
                    <TableCell className="py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(cfg.createdAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Active
                      </span>
                    </TableCell>
                    <TableCell className="py-3 pr-4 text-right">
                      <button
                        onClick={() => { dispatch(removeSystemConfiguration(cfg.id)); toast.success("Configuration removed"); }}
                        className="h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove"
                      >
                        <Unlink className="h-3.5 w-3.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedSystems   = useSelector((s: RootState) => s.connections.savedSystems);
  const configurations = useSelector((s: RootState) => s.connections.systemConfigurations);

  const countOf = (role: SavedSystem["role"]) => savedSystems.filter((s) => s.role === role).length;

  const handleAddSystem = () => {
    dispatch(setActiveTab("Source System"));
    navigate(RoutePaths.MIGRATION);
  };

  return (
    <div className="p-8 h-full overflow-y-auto flex flex-col gap-8">

      {/* ── Header ── */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1.5">
            Configure your SAP systems and create provisioning pipelines.
          </p>
        </div>
        <button
          onClick={handleAddSystem}
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.98] shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add System
        </button>
      </div>

      {/* ── Category tiles ── */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Access — Migration Systems
        </p>
        <div className="flex flex-wrap gap-4">
          <CategoryTile role="source" count={countOf("source")} />
          <CategoryTile role="target" count={countOf("target")} />
          <CategoryTile role="proxy"  count={countOf("proxy")}  />
        </div>
      </div>

      {/* ── Canvas Playground ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Configuration Playground
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Drag tiles to reposition · Click <strong>Connect</strong> on a Source tile then click a Target tile to link them
            </p>
          </div>
          {savedSystems.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {savedSystems.length} system{savedSystems.length !== 1 ? "s" : ""} · {configurations.length} connection{configurations.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <CanvasPlayground systems={savedSystems} configurations={configurations} />
      </div>

      {/* ── Saved Configurations ── */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Saved Configurations
        </p>
        <ConfigurationsTable configurations={configurations} systems={savedSystems} />
      </div>

    </div>
  );
}
