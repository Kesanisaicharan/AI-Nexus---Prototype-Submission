import { FileCheck2, Percent, FlagTriangleRight, Timer, ArrowUpRight } from 'lucide-react';

const STATS = [
  { label: 'Total Verified', value: '1,284', icon: FileCheck2 },
  { label: 'Authentic Rate', value: '97.2%', icon: Percent },
  { label: 'Flagged Today', value: '34', icon: FlagTriangleRight },
  { label: 'Avg. Scan Time', value: '< 28s', icon: Timer },
];

function VerdictBadge({ verdict }) {
  const cls = verdict === 'Real' ? 'badge-real' : verdict === 'Fraud' ? 'badge-fraud' : 'badge-review';
  return <span className={`badge ${cls}`}>{verdict}</span>;
}

export default function Dashboard({ scans, onGoVerify }) {
  return (
    <div className="view">
      <header className="view-header">
        <div>
          <div className="eyebrow">Verifier Dashboard</div>
          <h1>Document Scan Overview</h1>
        </div>
        <button className="btn-primary" onClick={onGoVerify}>
          <ArrowUpRight size={16} />
          Verify a document
        </button>
      </header>

      <div className="stat-grid">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon"><Icon size={18} strokeWidth={2} /></div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Recent Scans</h2>
          <span className="panel-sub">Last {scans.length} verifications</span>
        </div>
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
