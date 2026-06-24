function VerdictBadge({ verdict }) {
  const cls = verdict === 'Real' ? 'badge-real' : verdict === 'Fraud' ? 'badge-fraud' : 'badge-review';
  return <span className={`badge ${cls}`}>{verdict}</span>;
}

export default function History({ scans }) {
  return (
    <div className="view">
      <header className="view-header">
        <div>
          <div className="eyebrow">Audit Trail</div>
          <h1>Verification History</h1>
        </div>
      </header>

      <section className="panel">
        <table className="scan-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Size</th>
              <th>Verdict</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((s) => (
              <tr key={s.id}>
                <td className="doc-cell">📄 {s.name}</td>
                <td>{s.size}</td>
                <td><VerdictBadge verdict={s.verdict} /></td>
                <td className="score-cell">{s.score}%</td>
                <td className="muted">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
