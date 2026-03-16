# Wonbee Portfolio (wonbee.kr)

Technical personal portfolio built with Next.js App Router, TypeScript, and Tailwind CSS.

## 1) Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2) Main editable files

- Site identity and external links: `data/site.ts`
- Category/project content and media wiring: `data/projects.ts`
- Home narrative layout: `app/page.tsx`
- Route pages:
  - `app/about/page.tsx`
  - `app/projects/page.tsx`
  - `app/projects/[slug]/page.tsx`
  - `app/resume/page.tsx`
  - `app/contact/page.tsx`

## 3) Assets and source material

- Public media/docs are under `public/assets/`
  - `public/assets/images/*`
  - `public/assets/videos/*`
  - `public/assets/docs/*`
- Use `data/projects.ts` to bind media items to each project entry.

## 4) Deployment

```bash
npm run build
```

Then deploy through the connected production flow (Vercel via Git integration or CLI).

## 5) Current public focus

- Propulsion progression (70 N to 2.5 kN-class lander direction)
- VTVL/GNC reference work
- Samsung Humantech Gold distinction
- Fabrication capability (TIG welding)
- TEDx and yearly recap communication assets
