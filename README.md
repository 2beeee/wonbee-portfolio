# Wonbee Portfolio (wonbee.kr)

A minimal, technical personal engineering portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS.

## 1) Run locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## 2) Where to edit text

- Site-wide identity, intro, keywords, links: `data/site.ts`
- Project content (all fields): `data/projects.ts`
- About page narrative: `app/about/page.tsx`
- Resume page summary/capabilities: `app/resume/page.tsx`
- Contact page labels/placeholders: `app/contact/page.tsx`

## 3) Where to add projects

Edit `data/projects.ts`.

Each project object supports:
- `slug`
- `title`
- `summary`
- `yearOrStatus`
- `tags`
- `role`
- `challenge`
- `approach`
- `result`
- optional `image`
- optional `featured`

`/projects` and `/projects/[slug]` are generated from this file.

## 4) Where to change links/contact info

Update `data/site.ts`:
- `links.github`
- `links.linkedin`
- `links.email`
- `links.resumePdf`

## 5) Prepare for Vercel deployment

1. Push this folder to a Git repository.
2. Import the repo into Vercel.
3. Framework preset: Next.js (auto-detected).
4. Build command: `npm run build` (default).
5. Output: `.next` (default).

## 6) Must change before connecting wonbee.kr

- Replace placeholder contact links in `data/site.ts`.
- Replace placeholder email text in `app/contact/page.tsx`.
- Update resume section details in `app/resume/page.tsx`.
- Replace or refine placeholder project copy in `data/projects.ts`.
- Optionally replace:
  - `app/icon.png` (Next.js app icon source)
  - `public/favicon.ico` + `public/favicon-16x16.png` + `public/favicon-32x32.png`
  - `public/apple-touch-icon.png` + `public/android-chrome-192x192.png` + `public/android-chrome-512x512.png`
  - `public/site.webmanifest`
  - `public/og-image.svg`
- Confirm `metadataBase` in `app/layout.tsx` remains `https://wonbee.kr`.
- In Vercel, add domain `wonbee.kr` and `www.wonbee.kr` and configure DNS records at your registrar.

## 7) Maintenance Record

For full process history and future upkeep steps, see:
- `docs/MAINTENANCE_RUNBOOK.md`
