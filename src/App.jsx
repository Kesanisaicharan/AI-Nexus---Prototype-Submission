import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VerifyDoc from './components/VerifyDoc';
import History from './components/History';
import { SCANS_SEED } from './data';
import './App.css';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [scans, setScans] = useState(SCANS_SEED);

  function addScan(scan) {
    setScans((prev) => [scan, ...prev]);
  }

  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} />
      <main className="app-main">
        {view === 'dashboard' && (
          <Dashboard scans={scans} onGoVerify={() => setView('verify')} />
        )}
        {view === 'verify' && <VerifyDoc onComplete={addScan} />}
        {view === 'history' && <History scans={scans} />}
      </main>
    </div>
  );
}
