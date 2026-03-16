import { useState } from "react";

export function useChecklist(initialItems: string[] = []) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (item: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });

  const isChecked = (item: string) => checked.has(item);
  const allChecked = initialItems.length > 0 && initialItems.every(isChecked);
  const reset = () => setChecked(new Set());

  return { checked, toggle, isChecked, allChecked, reset };
}
