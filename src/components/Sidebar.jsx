import { ShieldCheck, LayoutGrid, ScanLine, History, Bell, Settings } from 'lucide-react';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { key: 'verify', label: 'Verify Doc', icon: ScanLine },
  { key: 'history', label: 'History', icon: History },
];

export default function Sidebar({ view, setView }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <ShieldCheck size={22} strokeWidth={2.25} />
        <span>CertiSafe</span>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`sidebar-link ${view === key ? 'active' : ''}`}
            onClick={() => setView(key)}
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        <button className="sidebar-link" disabled>
          <Bell size={17} strokeWidth={2} />
          Alerts
        </button>
        <button className="sidebar-link" disabled>
          <Settings size={17} strokeWidth={2} />
          Settings
        </button>
      </div>
    </aside>
  );
}
