interface ChecklistProps {
  items: string[];
  checked: Set<string>;
  onToggle: (item: string) => void;
}

export function Checklist({ items, checked, onToggle }: ChecklistProps) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="p-0 m-0">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={checked.has(item)}
              onChange={() => onToggle(item)}
              className="mt-0.5 rounded border-border text-primary focus:ring-primary/20 cursor-pointer w-4 h-4 border"
            />
            <span className="text-sm text-foreground transition-colors group-hover:text-foreground/90">{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
