import { useState } from "react";

export interface TaskMap<T> {
  [key: string]: T;
}

export function useTaskMapping<T>(initial: TaskMap<T> = {}) {
  const [mapping, setMapping] = useState<TaskMap<T>>(initial);

  const set = (key: string, value: T) =>
    setMapping((prev) => ({ ...prev, [key]: value }));

  const remove = (key: string) =>
    setMapping((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const get = (key: string): T | undefined => mapping[key];

  return { mapping, set, remove, get };
}
