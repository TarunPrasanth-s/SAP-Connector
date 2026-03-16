import styles from "./Checklist.module.css";

interface ChecklistProps {
  items: string[];
  checked: Set<string>;
  onToggle: (item: string) => void;
}

export function Checklist({ items, checked, onToggle }: ChecklistProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={checked.has(item)}
              onChange={() => onToggle(item)}
              className={styles.checkbox}
            />
            <span>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
