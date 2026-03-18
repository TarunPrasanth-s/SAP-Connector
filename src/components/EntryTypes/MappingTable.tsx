import { X } from "lucide-react";
import type { EntryTypeConnection } from "@/state/connectionsSlice";

interface MappingTableProps {
  connections: EntryTypeConnection[];
  onRemove?: (leftId: string, rightId: string) => void;
}

export function MappingTable({ connections, onRemove }: MappingTableProps) {
  if (connections.length === 0) return null;

  return (
    <div className="mt-6 rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 bg-muted/40 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground">
          Active Mappings ({connections.length})
        </h4>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/20">
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2.5 border-b border-border rounded-tl-sm">
              Source Task
            </th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2.5 border-b border-border">
              Target Task
            </th>
            {onRemove && (
              <th className="w-10 border-b border-border" />
            )}
          </tr>
        </thead>
        <tbody>
          {connections.map((conn, i) => (
            <tr
              key={`${conn.leftId}-${conn.rightId}`}
              className="bg-background hover:bg-primary/5 transition-colors group"
            >
              <td
                className={`px-4 py-3 text-sm font-medium text-primary ${i < connections.length - 1 ? "border-b border-border" : ""}`}
              >
                {conn.leftId}
              </td>
              <td
                className={`px-4 py-3 text-sm font-medium text-primary ${i < connections.length - 1 ? "border-b border-border" : ""}`}
              >
                {conn.rightId}
              </td>
              {onRemove && (
                <td className={`px-2 ${i < connections.length - 1 ? "border-b border-border" : ""}`}>
                  <button
                    onClick={() => onRemove(conn.leftId, conn.rightId)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    aria-label="Remove mapping"
                  >
                    <X size={13} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
