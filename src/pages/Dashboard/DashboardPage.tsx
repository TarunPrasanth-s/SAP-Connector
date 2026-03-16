import styles from "./dashboard.module.css";

const CARDS = [
  { title: "Documents", sub: "File management" },
  { title: "Workflow Automation", sub: "Process orchestration" },
];

const TABLE_ROWS = Array.from({ length: 3 }, (_, r) =>
  Array.from({ length: 5 }, (_, c) => `dashboard - Row ${r + 1} - Cell ${c + 1}`)
);

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.cardGrid}>
        {CARDS.map((c) => (
          <div key={c.title} className={styles.card}>
            <p className={styles.cardTitle}>{c.title}</p>
            <p className={styles.cardSub}>{c.sub}</p>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <p className={styles.tableTitle}>Data Table</p>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Column1", "Column2", "Column3", "Column4", "Column5"].map((h) => (
                <th key={h} className={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className={styles.td}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
