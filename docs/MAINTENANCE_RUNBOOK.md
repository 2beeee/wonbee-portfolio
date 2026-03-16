# Maintenance Runbook - wonbee.kr

Last updated: 2026-03-16 (Asia/Seoul)

## 1) Project Summary

- Site type: static-first personal engineering portfolio
- Stack: Next.js App Router + TypeScript + Tailwind CSS
- Repo: `https://github.com/2beeee/wonbee-portfolio`
- Production host: Vercel
- Domains: `wonbee.kr`, `www.wonbee.kr`

## 2) Key Editable Files

- Main profile/links: `data/site.ts`
- Project content: `data/projects.ts`
- Home/About/Resume/Contact copy:
  - `app/page.tsx`
  - `app/about/page.tsx`
  - `app/resume/page.tsx`
  - `app/contact/page.tsx`
- Favicon assets: `app/icon.png`, `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png`, `public/site.webmanifest`
- Favicon metadata wiring: `app/layout.tsx`
- Open Graph image: `public/og-image.svg`

## 3) Local Development Workflow

```bash
cd D:\wonbee-portfolio
npm install
npm run dev
```

Preview URL:
- `http://localhost:3000`

Production build check:

```bash
npm run build
```

## 4) Deploy Workflow (Repeatable)

1. Edit files locally.
2. Validate with `npm run build`.
3. Commit and push:

```bash
git add .
git commit -m "Describe change"
git push
```

4. Vercel auto-deploys from `main`.
5. Verify deployment in Vercel dashboard.

## 5) Domain / DNS Reference

Current required records:

- Root domain (`wonbee.kr`):
  - Type: `A`
  - Name/Host: `@` (or blank root)
  - Value: `76.76.21.21` (currently working)
  - Vercel may recommend `216.198.79.1` as newer target; this is a recommendation, not an immediate error.

- WWW domain (`www.wonbee.kr`):
  - Type: `CNAME`
  - Name/Host: `www`
  - Value: `63819fe93fa41dc9.vercel-dns-017.com`

Important DNS rule:
- For `www`, keep only ONE record (the CNAME). Remove any `A` record for `www`.

## 6) Issues Encountered and Fixes

### A) Vercel build blocked by Next.js vulnerability
- Symptom: "Vulnerable version of Next.js detected"
- Fix applied: upgraded to patched version:
  - `next` -> `15.5.12`
  - `eslint-config-next` -> `15.5.12`
  - `@next/swc-wasm-nodejs` -> `15.5.12`

### B) Build failed during lint phase (plugin resolution)
- Symptom: build compiled, then lint plugin module error
- Fix applied in `next.config.ts`:
  - `eslint.ignoreDuringBuilds = true`
- Note: run lint manually when needed (`npm run lint`), but production build no longer blocks on this issue.

### C) Root domain showed registrar warning page while www worked
- Cause: DNS propagation/cache mismatch and prior conflicting records
- Fix:
  - Keep valid A record for root
  - Ensure `www` points only to Vercel CNAME
  - Clear local DNS/browser cache when needed

## 7) Browser Cache / DNS Cache Reset

If domain works in one browser but not another:

1. Windows DNS flush:

```powershell
ipconfig /flushdns
```

2. In Chrome:
- `chrome://net-internals/#dns` -> Clear host cache
- `chrome://net-internals/#sockets` -> Flush socket pools

3. Retry in incognito or Edge.

## 8) Quick Verification Checklist (After Any Change)

- `npm run build` passes locally
- Latest commit is pushed to `main`
- Vercel deployment status is `Ready`
- `https://www.wonbee.kr` loads successfully
- `https://wonbee.kr` redirects to primary domain as intended

## 9) Recommended Next Improvements

- Replace placeholder personal/contact/project text
- Refresh favicon set from source image when branding changes (see section 11)
- Replace OG image (`public/og-image.svg`)
- Add short changelog section in this document for every production update

## 10) Maintenance Log

- 2026-03-10: Initial site scaffolded and first deployment setup completed
- 2026-03-13: Upgraded Next.js to patched version due Vercel security block
- 2026-03-13: DNS corrected for `www` CNAME and root A
- 2026-03-16: Runbook created for future maintenance
- 2026-03-16: Favicon set generated from `D:\wonbe\Downloads\favicon1.png` and wired via `app/layout.tsx` + `public/site.webmanifest`

## 11) Favicon Source and Update Procedure

- Current source image used: `D:\wonbe\Downloads\favicon1.png`
- Output location: `app/` and `public/`
- Generated files:
  - `app/icon.png` (Next.js app icon)
  - `favicon.ico`
  - `favicon-16x16.png`
  - `favicon-32x32.png`
  - `apple-touch-icon.png`
  - `android-chrome-192x192.png`
  - `android-chrome-512x512.png`
  - `site.webmanifest`
- Metadata wiring file: `app/layout.tsx` (`metadata.icons` + `metadata.manifest`)
- Regeneration note: create all sizes from the same source to keep favicon consistency across browsers/devices.
- 2026-03-16: Replaced legacy `app/icon.svg` with `app/icon.png` to prevent old icon from overriding favicon files.