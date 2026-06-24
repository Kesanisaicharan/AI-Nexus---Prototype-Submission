# CertiSafe AI — Verifier Dashboard (Prototype)

AI Nexus 2026 · SRM Connects · Team CertiSafe

A working prototype of the CertiSafe AI document verification dashboard described in our pitch deck. Upload a document, watch a simulated Vision AI forensic scan run, and get an Authenticity Score with a pass/fail breakdown — exactly like Slide 4 of the deck.

> **Note on scope:** This MVP simulates the AI analysis (deterministic scoring based on file properties) to demo the full user flow and UI without needing live cloud AI credentials. The architecture described in the deck (Google Vision API, OpenCV, AWS, FastAPI) is the production plan — see Slide 5 & 6.

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Deploy (free, ~2 minutes)

**Vercel:**
1. Push this folder to a GitHub repo (see below).
2. Go to [vercel.com](https://vercel.com) → New Project → Import the repo.
3. Framework preset: **Vite**. Click Deploy.
4. You'll get a live URL like `https://certisafe-ai.vercel.app`.

**Netlify (alternative):**
1. [netlify.com](https://netlify.com) → Add new site → Import from Git.
2. Build command: `npm run build`, Publish directory: `dist`.

## Push to GitHub

```bash
git init
git add .
git commit -m "CertiSafe AI prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/certisafe-ai.git
git push -u origin main
```

Make sure the repo is **Public** so judges can view the code.

## Recording the demo video

1. Run the deployed (or local) app, screen-record a 60-90s walkthrough:
   - Dashboard -> stats + recent scans
   - Verify Doc -> upload a sample PDF/image -> scanning animation -> result with score + checks
   - History -> audit trail
2. Upload the video to Google Drive -> right-click -> Share -> **Anyone with the link** -> copy link.

## Tech stack

React 19 + Vite, lucide-react icons. No backend required for this demo build - all scan data is generated client-side.
