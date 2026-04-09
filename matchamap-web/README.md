# MatchaMap Web (JavaScript MVP)

This is a JavaScript React app built from your PRD + SoT docs.

## Included in this MVP

- Matcha-only cafe discovery (BR-001)
- Preference onboarding gate before recommendations (BR-002)
- Taste-priority recommendation ranking with adjustable focus mode (BR-003)
- Account flow (local demo auth)
- Save favorite cafes
- Submit reviews with a 10 reviews / 24h limit (BR-401)
- Mock cafe dataset (no external DB required)
- Google Maps integration (when API key is set)

## Run locally

1. Install dependencies
2. Start dev server

Suggested commands:

- `npm install`
- `npm run dev`

## Google Maps setup

Create [matchamap-web/.env.local](.env.local):

```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

If key is missing, the app still works with a coordinate fallback panel.

## Host through GitHub Pages

A workflow is included at [.github/workflows/deploy-matchamap-pages.yml](../.github/workflows/deploy-matchamap-pages.yml).

Steps:

1. Push to GitHub
2. In repository Settings → Pages, set Source to **GitHub Actions**
3. Add repository secret:
   - `VITE_GOOGLE_MAPS_API_KEY`
4. Workflow deploys automatically on pushes to `main`

## Notes

- Auth is localStorage-based for MVP speed and GitHub Pages compatibility.
- For production, move auth + data to a backend (e.g., Supabase/Firebase/Postgres API).
