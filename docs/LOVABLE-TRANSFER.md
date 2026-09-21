# Moving this project into Lovable

This project is deliberately Lovable-native: Vite, React 18, TypeScript,
Tailwind and shadcn/ui, which is the stack Lovable builds on. There is
nothing to port.

---

## 1. Import

1. In Lovable, create a new project and choose **Import from GitHub**, or
   upload the zip.
2. Repository: `https://github.com/opulentgrowofficial-og/OG-PS`
3. Lovable will detect the Vite and React setup and run `npm install`.
4. Dev server runs on port 8080, already set in `vite.config.ts`.

If Lovable re-adds `lovable-tagger` to `vite.config.ts` and `package.json`
on import, that is expected and harmless. It is a development-only plugin
and it is stripped from production builds.

---

## 2. Paste this into Lovable's first prompt

Giving Lovable the rules up front is what stops it drifting back to generic
output on the first edit.

> This is an existing, finished design system. Do not restyle it.
>
> **Colour.** All tokens are defined in `src/index.css` under `:root` and
> exposed through `tailwind.config.ts`. Never write a hex value in a
> component. The palette is: bone `#F4F1EA` as the dominant surface, ink
> `#0E141B` for text and inverted sections, and oxide `#A8462A` as the only
> accent, kept under 10% of any viewport. There is no second accent. Do not
> add gradients to backgrounds.
>
> **Type.** Exactly two families. Newsreader for display headings and key
> figures at light weights, Instrument Sans for everything else including
> numerals, which use tabular figures. Never add a third family. Never use
> bold display type. No italics.
>
> **Geometry.** One border radius (`--radius`, 4px), one shadow
> (`shadow-lift`), one hairline colour (`rule`). Spacing follows an 8pt
> scale. Section padding is 80px on mobile and 120px on desktop.
>
> **Motion.** CSS transitions driven by `useReveal`, an IntersectionObserver
> hook in `src/hooks/`. Easing is `--ease-premium` or `--ease-expo`. Never
> `ease-in-out`, never `transition-all`, never animate anything except
> transform and opacity. Reveals fire once and do not replay.
>
> **Copy.** No em dashes anywhere. No eyebrow labels on any section; they
> open with a ledger index like `01 / Capabilities` through the
> `SectionHead` component. Avoid "elevate", "unlock", "empower",
> "seamless", "supercharge". No emoji in the interface.
>
> **Numbers.** Every visitor-facing figure comes from the `figures` array in
> `src/components/sections/Proof.tsx`. Never state a metric in another
> section with a different value.
>
> **Mobile.** The hero's engagement panel is an accordion below `lg` and a
> split layout above it. Do not change that: the two column version leaves
> the answer off screen on a phone, which is the bug this rebuild fixed.
> Test every change at 360px.

---

## 3. Where things are

```
src/
  index.css                      All design tokens. Change colour here, nowhere else
  App.tsx                        Routes. Add pages above the catch-all
  pages/Index.tsx                Section order and the scroll narrative
  pages/NotFound.tsx
  hooks/useReveal.ts             Scroll reveal, count-up trigger, media queries
  components/
    layout/Navbar.tsx            Nav model lives in the exported `navigation` array
    layout/Footer.tsx
    primitives/SectionHead.tsx   Every section heading. Enforces no-eyebrow rule
    primitives/Counter.tsx       Count-up, respects reduced motion
    sections/                    One file per section, own copy, in scroll order
    ui/                          shadcn primitives, already retokenised
```

Each section file owns its own content, so a copy change touches one file.

---

## 4. Likely first tasks, phrased for Lovable

**Adding a page:**

> Create `src/pages/About.tsx` and register it at `/about` in `App.tsx`
> above the catch-all route. Reuse `Navbar`, `Footer` and `SectionHead`.
> Follow the section structure of `src/components/sections/Capabilities.tsx`:
> a ledger index, a light-weight serif heading, a lede, then content. Use
> only the existing tokens.

**Switching to an alternative colour theme:**

> In `src/index.css`, replace the values of `--bone`, `--bone-deep`,
> `--ink`, `--ink-soft`, `--ink-mute`, `--oxide` and `--rule` with the new
> theme's HSL triplets. Change nothing else. Every component reads these.

**Wiring the enquiry form:**

> Set `VITE_ENQUIRY_ENDPOINT` in the environment. The POST handler is
> already in `ContactDialog` in `src/components/sections/Contact.tsx`. Do
> not change the failure path: it deliberately surfaces an error rather than
> showing a success screen for a lead that was not delivered.

---

## 5. Things to watch for

- **Lovable may suggest `framer-motion`.** It was deliberately removed. The
  reveal system is eleven lines of IntersectionObserver and it saved about
  50KB of JavaScript. Decline.
- **Lovable may re-add unused shadcn components** when you ask for a UI
  element. 27 were removed. Only add one back if it is actually imported.
- **Lovable defaults to `ease-in-out` and `transition-all`.** Both are
  banned here. Name the properties, use the easing tokens.
- **Lovable will offer stock photography.** The case study section is
  typographic on purpose, because stock imagery next to a specific client
  claim misrepresents the work. Wait for real photography.
- **Watch the 360px width** after any layout change. That is where the
  original build failed.

---

## 6. Before the site goes live

1. Set `VITE_ENQUIRY_ENDPOINT`.
2. Replace `public/favicon.svg` with the real mark, add `apple-touch-icon.png`.
3. Add `public/og-cover.png` at 1200x630.
4. Build the Phase 1 pages, which the navigation already links to.
5. Migrate the fourteen blog posts with 301s from the WordPress URLs.
6. Generate `public/sitemap.xml`.
7. Confirm every figure in `Proof.tsx` with the client.
8. Return 410 for `/cosmetics/` and `/product-design/`.
