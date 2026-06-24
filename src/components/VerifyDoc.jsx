import { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { analyzeFile } from '../data';

const STAGE = { IDLE: 'idle', SCANNING: 'scanning', DONE: 'done' };

export default function VerifyDoc({ onComplete }) {
  const [stage, setStage] = useState(STAGE.IDLE);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  function handleFile(f) {
    if (!f) return;
    setFile(f);
    setStage(STAGE.SCANNING);
    setResult(null);

    const analysis = analyzeFile(f);
    window.setTimeout(() => {
      setResult(analysis);
      setStage(STAGE.DONE);
      onComplete({
        id: `s${Date.now()}`,
        name: f.name,
        size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
        verdict: analysis.verdict,
        score: analysis.score,
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      });
    }, 2200);
  }

  function onDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  }

  function reset() {
    setStage(STAGE.IDLE);
    setFile(null);
    setResult(null);
  }

  return (
    <div className="view">
      <header className="view-header">
        <div>
          <div className="eyebrow">Vision AI Analysis</div>
          <h1>Verify a Document</h1>
        </div>
      </header>

      {stage === STAGE.IDLE && (
        <div
          className="dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud size={34} strokeWidth={1.75} />
          <p className="dropzone-title">Drop a PDF or image here</p>
          <p className="dropzone-sub">or click to browse · encrypted in transit</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      )}

      {stage === STAGE.SCANNING && file && (
        <div className="scan-stage">
          <div className="scan-doc">
            <FileText size={48} strokeWidth={1.5} />
            <div className="scan-line" />
          </div>
          <p className="scan-filename">{file.name}</p>
          <p className="scan-status">
            <Loader2 size={15} className="spin" /> Running Vision AI + forensic checks…
          </p>
        </div>
      )}

      {stage === STAGE.DONE && result && file && (
        <div className="result-grid">
          <div className="result-score-card">
            <div className={`score-ring score-${result.verdict.toLowerCase()}`}>
              <span>{result.score}%</span>
            </div>
            <div className="score-meta">
              <div className="score-doc">📄 {file.name}</div>
              <div className={`badge badge-${result.verdict.toLowerCase()}`}>
                {result.verdict === 'Real' ? '✓ AUTHENTIC' : result.verdict === 'Fraud' ? '✗ FLAGGED' : '⚠ NEEDS REVIEW'}
              </div>
            </div>
            <button className="btn-secondary" onClick={reset}>Verify another document</button>
          </div>

          <div className="result-checks-card">
            <h3>Forensic Checks</h3>
            <ul className="check-list">
              {result.checks.map((c) => (
                <li key={c.key}>
                  {c.passed ? (
                    <CheckCircle2 size={16} className="check-pass" />
                  ) : (
                    <XCircle size={16} className="check-fail" />
                  )}
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
