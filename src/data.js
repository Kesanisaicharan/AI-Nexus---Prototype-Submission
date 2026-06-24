// Seed data for "Recent Scans" — mirrors the deck's dashboard mockup
export const SCANS_SEED = [
  { id: 's1', name: 'payslip_may.pdf', size: '1.1 MB', verdict: 'Real', score: 98, date: '2026-06-22 14:02' },
  { id: 's2', name: 'id_card_ravi.jpg', size: '0.8 MB', verdict: 'Fraud', score: 41, date: '2026-06-22 11:40' },
  { id: 's3', name: 'marksheet_2023.pdf', size: '2.0 MB', verdict: 'Review', score: 87, date: '2026-06-21 18:15' },
  { id: 's4', name: 'offer_letter.pdf', size: '0.6 MB', verdict: 'Real', score: 95, date: '2026-06-21 09:51' },
];

// Forensic checks shown during / after analysis — matches Slide 4 + Slide 5 stack
export const CHECKS = [
  { key: 'watermark', label: 'Watermark Verified' },
  { key: 'metadata', label: 'Metadata Intact' },
  { key: 'font', label: 'Font Pattern Match' },
  { key: 'pixel', label: 'Pixel Integrity' },
  { key: 'stamp', label: 'Digital Stamp Valid' },
];

// Deterministic "analysis" so a demo video looks consistent on every run.
// Uses the file name + size to derive a score — no network calls, no real AI,
// but behaves like a real verification pipeline for demo purposes.
export function analyzeFile(file) {
  let hash = 0;
  const str = file.name + file.size;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 100000;
  }
  const score = 60 + (hash % 39); // 60–98 range, feels realistic
  const verdict = score >= 90 ? 'Real' : score >= 75 ? 'Review' : 'Fraud';

  const checks = CHECKS.map((c, i) => ({
    ...c,
    passed: score >= 75 ? true : i < Math.floor((score / 100) * CHECKS.length) + 1,
  }));

  return { score, verdict, checks };
}
