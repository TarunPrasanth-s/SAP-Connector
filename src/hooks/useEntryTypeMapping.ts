import { useState, useCallback } from "react";
import type { EntryTypeConnection } from "@/state/connectionsSlice";

export function useEntryTypeMapping(initialConnections: EntryTypeConnection[] = []) {
  const [connections, setConnections] = useState<EntryTypeConnection[]>(initialConnections);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const connect = useCallback((leftId: string, rightId: string) => {
    setConnections((prev) => {
      const filtered = prev.filter((c) => c.leftId !== leftId && c.rightId !== rightId);
      return [...filtered, { leftId, rightId }];
    });
    setSelectedLeft(null);
    setSelectedRight(null);
  }, []);

  const handleSelectLeft = useCallback(
    (item: string) => {
      if (selectedLeft === item) { setSelectedLeft(null); return; }
      if (selectedRight) { connect(item, selectedRight); }
      else { setSelectedLeft(item); }
    },
    [selectedLeft, selectedRight, connect]
  );

  const handleSelectRight = useCallback(
    (item: string) => {
      if (selectedRight === item) { setSelectedRight(null); return; }
      if (selectedLeft) { connect(selectedLeft, item); }
      else { setSelectedRight(item); }
    },
    [selectedLeft, selectedRight, connect]
  );

  const handleDragStart = useCallback((leftId: string) => {
    setDraggedItem(leftId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  const handleDrop = useCallback(
    (rightId: string) => {
      if (!draggedItem) return;
      connect(draggedItem, rightId);
      setDraggedItem(null);
    },
    [draggedItem, connect]
  );

  const removeConnection = useCallback((leftId: string, rightId: string) => {
    setConnections((prev) =>
      prev.filter((c) => !(c.leftId === leftId && c.rightId === rightId))
    );
  }, []);

  return {
    connections,
    selectedLeft,
    selectedRight,
    draggedItem,
    handleSelectLeft,
    handleSelectRight,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    removeConnection,
  };
}
