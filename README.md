# PropelSaga

Marketing site for PropelSaga, a Microsoft Dynamics 365 delivery partner.

## Stack

Vite 5, React 18, TypeScript, Tailwind CSS 3, Radix primitives via shadcn/ui.
No CSS-in-JS, no animation library: motion is CSS transitions driven by
`IntersectionObserver`, which keeps the bundle small and reduced-motion
handling in one place.

```bash
npm install
npm run dev        # http://localhost:8080
npm run build
npm run preview
npm run typecheck
npm run lint
```

## Design system

All tokens live in `src/index.css` under `:root` and are surfaced to Tailwind
in `tailwind.config.ts`. Nothing should hardcode a colour, radius or shadow.

| Token | Value | Role |
| --- | --- | --- |
| `bone` | `#F4F1EA` | Dominant surface, roughly 60% of the page |
| `bone-deep` | `#E9E4DA` | Recessed sections |
| `ink` | `#0E141B` | Text, and the inverted sections |
| `ink-soft` | `#41495A` | Body copy |
| `ink-mute` | `#6E7681` | Metadata and labels |
| `oxide` | `#A8462A` | The only accent. Keep it under 10% of any viewport |
| `rule` | `#DCD7CC` | Every hairline on the site |

Type is two families only. `Newsreader` for display, `Instrument Sans` for
body and all metadata. Both load from Google Fonts with `display=swap`.
See `docs/DESIGN-DIRECTION.md` for the licensed alternatives.

Radius is a single value (`--radius`, 4px). Shadow is a single recipe
(`shadow-lift`). Easing is `--ease-premium` and `--ease-expo`. Adding a new
one is a design decision, not an implementation detail.

## Structure

```
src/
  components/
    layout/        Navbar, Footer
    primitives/    Counter, SectionHead
    sections/      One file per homepage section, in scroll order
    ui/            shadcn primitives, retokenised to the kit
  hooks/useReveal.ts
  pages/           Index, NotFound
```

`src/pages/Index.tsx` composes the sections and documents the scroll
narrative. Section files own their own copy, which keeps a content edit to a
single file.

## Conventions

- **No em dashes** in any user-visible copy. Use a period, comma or colon.
- **No eyebrow labels.** Sections open with a ledger index (`01 / Capabilities`)
  through `SectionHead`, never a coloured pill.
- Numbers shown to visitors are defined once. `Proof.tsx` is the source of
  truth. Do not restate a figure in another section with a different value.
- Every interactive element needs a hover, a focus ring and a 44px minimum
  touch target outside inline body links.
- Animate transform and opacity only.

## Before launch

1. Set `VITE_ENQUIRY_ENDPOINT` to the CRM or form endpoint. Until it is set,
   the enquiry form validates and then reports a send failure by design,
   rather than silently dropping a lead.
2. Replace `public/favicon.svg` with the real brand mark and add
   `apple-touch-icon.png`.
3. Add `public/og-cover.png` at 1200x630.
4. Generate `public/sitemap.xml` once the inner pages exist.
5. Confirm every figure in `Proof.tsx` with the client.
