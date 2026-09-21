# PropelSaga: design direction for approval

**Prepared for:** PropelSaga
**Date:** 21 September 2026
**Decisions needed:** colour theme, typography licence, sitemap sign off

---

## 1. What we are designing against

PropelSaga sells to two audiences who are both sceptical by the time they
reach the site.

**The enterprise buyer** is usually a CFO, COO or IT director who has either
been through a difficult ERP programme or has heard about one from a peer.
They are not looking to be impressed. They are looking for evidence that
this partner will not repeat what went wrong last time.

**The Microsoft partner principal** is buying delivery capacity and is
assessing whether putting your people in front of their client is a risk to
their own reputation.

Neither of them responds to energy. Both of them respond to restraint,
specificity and the impression that the firm has nothing to prove. That
single observation drives every decision below.

### The problem with the current category

Almost every Microsoft Dynamics partner site in the market uses the same
palette: navy blue, a teal or cyan accent, and a bright secondary. It comes
from Microsoft's own brand and it is now so common that it reads as a
category uniform rather than an identity. A buyer comparing four partners
sees four versions of the same site.

Moving away from that palette is the single highest leverage change
available, and it costs nothing.

---

## 2. Recommended theme: **Ledger**

The reference point is not other technology companies. It is the visual
language of established advisory and audit practices: warm paper, dense
ink, one restrained accent, and numbers set with the care of a financial
document. For a firm whose product is discipline around other people's
finance systems, this is the honest aesthetic.

| Role | Name | Hex | Where it appears |
| --- | --- | --- | --- |
| Dominant, ~60% | Bone | `#F4F1EA` | Page background. Warm off white, never pure white |
| Recessed | Bone Deep | `#E9E4DA` | Alternating sections, so rhythm comes from tone not from borders |
| Ink, ~30% | Ink | `#0E141B` | All body text, and the inverted dark sections |
| Body copy | Ink Soft | `#41495A` | Paragraphs |
| Metadata | Ink Mute | `#6E7681` | Labels, captions, index numbers |
| Accent, ≤10% | **Oxide** | `#A8462A` | Primary buttons, active states, section indices, key figures |
| Hairline | Rule | `#DCD7CC` | Every divider on the site |

**Why Oxide rather than a blue or a green.** It is warm, which stops the
page feeling clinical. It is desaturated, so it never reads as a consumer
brand. It is effectively unused across the Dynamics partner landscape, which
makes it ownable. And it holds its meaning at small sizes, so a single
letterspaced label in Oxide does the work that most sites need a coloured
box to do.

**Why the ink is navy rather than black.** At large sizes `#0E141B` reads as
a very deep navy, which preserves the Microsoft ecosystem association. At
text sizes it reads as black. You keep the association without joining the
uniform.

**Accessibility.** Ink on Bone measures 15.9:1. Oxide on Bone measures
5.4:1. Bone on Oxide measures 4.9:1. All clear WCAG AA, and the first clears
AAA comfortably.

---

## 3. Alternative theme A: **Brass** (the yellow direction)

You asked for a yellow option that does not read as cheap. The reason most
yellows look cheap is saturation and coverage: a bright yellow used as a
large fill reads as a warning label or a discount sticker.

The expensive version of yellow is **brass**: low chroma, slightly green in
the shadow, used almost exclusively on hairlines, small capitals, numerals
and hover states, never as a button fill.

| Role | Name | Hex |
| --- | --- | --- |
| Dominant | Ink Green | `#13211C` |
| Paper | Bone | `#F2EFE7` |
| Body on dark | Warm Grey | `#B8BDB5` |
| Accent, ≤8% | **Antique Brass** | `#C2984E` |
| Hairline on dark | Brass Hairline | `#C2984E` at 22% opacity |

This is a dark-dominant theme, which suits a firm that wants to feel
established and slightly formal. The rules that keep it from looking cheap
are not optional:

1. Brass never fills an area larger than a small button. Primary buttons are
   bone on ink green, with a brass hairline.
2. No gradient on brass, ever. A gradient is what turns brass into gold
   plastic.
3. Brass on Ink Green measures 6.8:1, so it is legible as text, but it
   should still be reserved for labels and figures.

Choose this one if you want the site to feel older and more institutional
than the firm actually is. That is a legitimate strategy in advisory work.

---

## 4. Alternative theme B: **Deep Field** (evolution, not replacement)

If a full repaint is more change than you want, this keeps your existing
navy and teal relationship but corrects what makes the current version feel
generic: the navy is too bright, the teal is too saturated, and there is a
third accent competing with both.

| Role | Name | Hex | Change from today |
| --- | --- | --- | --- |
| Dominant dark | Midnight | `#0B1A2B` | Deeper and less saturated than the current navy |
| Paper | Warm White | `#F6F4EF` | Warm rather than blue grey, which alone lifts the whole palette |
| Body | Slate | `#48535F` | |
| Accent, ≤10% | **Verdigris** | `#2F7D6E` | A deeper, greyer teal. Reads as considered rather than default |
| Hairline | `#DAD6CE` | | |

The amber that currently appears as a third colour is removed. One accent
is the rule, and it is the rule that does most of the work.

This is the safe option. It will look better than the current site and worse
than Ledger, because it is still recognisably the category uniform.

---

## 5. Typography

Two families. One for display, one for everything else. Numbers are set in
the body family using tabular figures, which keeps columns aligned and
avoids a third typeface.

### Recommended: licensed pairing

| Role | Typeface | Foundry | Why |
| --- | --- | --- | --- |
| Display | **Tiempos Headline** | Klim Type Foundry | The reference serif for serious editorial and financial publishing. Tight, economical, and completely free of the decorative quality that makes most serifs read as traditional rather than authoritative |
| Body and UI | **Söhne** | Klim Type Foundry | The current standard workhorse grotesque. Neutral without being cold, and it holds up at 14px in a table, which most display-adjacent sans faces do not |

Both from one foundry, which means one licence negotiation, one invoice, and
two faces designed in the same tradition.

**Licensing:** Klim sells perpetual web licences priced by monthly page
views. For a site of this size expect roughly **USD 500 to 900 for the pair**
as a one time cost, no subscription. Purchased at klim.co.nz. You will want
Tiempos Headline in Light and Regular, and Söhne in Buch, Kräftig and
Halbfett. Buy only those weights.

**Alternative licensed pairing**, if you prefer a warmer display face:
**Canela Deck** (Commercial Type) with **Founders Grotesk** (Klim). Similar
total cost, slightly more expressive, slightly less neutral.

### What the site runs on today

The build is live now on free substitutes chosen specifically because they
share the proportions of the licensed pair, so swapping is a two line change
and nothing reflows badly:

- **Newsreader** in place of Tiempos Headline. Variable weight and optical
  sizing, genuinely close in colour and rhythm.
- **Instrument Sans** in place of Söhne.

If the budget is not available, shipping on these permanently is a
defensible decision. The difference is real but it is a refinement, not a
gap a client would notice.

### How type is used

- Display serif appears only in headings and key figures, at light weights
  (300 to 400) and large sizes. Never bold, never at body size.
- Body sans carries everything else including all metadata labels, set at
  11px uppercase with wide letterspacing.
- Headline leading is tight (1.02 to 1.15). Body leading is generous (1.65
  to 1.75). That contrast is most of what makes a page feel designed.
- No italics anywhere in the interface.

---

## 6. The signature device

Every section opens with a numbered index rather than a coloured label:

```
─────────────────────────────
01 / Capabilities

Nine services.
One discipline.
```

This runs the length of the page like the line items of a ledger. It gives
the site something specific to be remembered for, it suits a firm whose work
is financial systems, and it replaces the coloured eyebrow pills you asked
us to remove. Every list on the site, the capabilities, the process, the
case studies, uses the same numbering, so the page reads as one document
rather than a stack of blocks.

---

## 7. Proposed sitemap

**22 pages at launch**, in four phases. The homepage is built. Everything
else is scoped below.

### Phase 1: launch critical (9 pages)

| Page | Path | Purpose |
| --- | --- | --- |
| Home | `/` | Built |
| About | `/about` | The firm, the bench, how you are structured. The page a sceptical buyer checks second |
| Contact | `/contact` | Standalone page. Currently the form is a dialog only, which search cannot index |
| Insights index | `/insights` | The 14 existing blog posts, migrated with 301s from the WordPress URLs |
| Insight article | `/insights/[slug]` | Template. This is your strongest organic asset and it is currently absent from the rebuild |
| Careers | `/careers` | Exists on the live site. Also a credibility signal: a firm hiring senior D365 people looks like a firm that has senior D365 people |
| Privacy | `/privacy` | Required. You collect personal data from UK and EU visitors |
| Terms | `/terms` | |
| Cookies | `/cookies` | Required alongside a consent banner for EU and UK traffic |

### Phase 2: capabilities (10 pages)

| Page | Path |
| --- | --- |
| Capabilities index | `/capabilities` |
| Global Development Centre | `/capabilities/global-development-centre` |
| Partner Acceleration Hub | `/capabilities/partner-acceleration-hub` |
| Turnkey project ownership | `/capabilities/turnkey-project-ownership` |
| Enterprise modernisation | `/capabilities/enterprise-modernisation` |
| Integration acceleration | `/capabilities/integration-acceleration` |
| Rapid deployment packages | `/capabilities/rapid-deployment` |
| Team extension | `/capabilities/team-extension` |
| Managed services | `/capabilities/managed-services` |
| Ledger Care | `/capabilities/ledger-care` |

These are your commercial landing pages. Each one should target the query a
buyer actually types, which is usually the problem rather than the service
name.

### Phase 3: platforms (5 pages)

| Page | Path |
| --- | --- |
| Platforms index | `/platforms` |
| Business Central | `/platforms/business-central` |
| Finance & Operations | `/platforms/finance-and-operations` |
| Customer Engagement | `/platforms/customer-engagement` |
| Power Platform | `/platforms/power-platform` |

A dedicated Business Central page already ranks on the live site. That one
should be migrated first and with care.

### Phase 4: proof (2 page types)

| Page | Path |
| --- | --- |
| Work index | `/work` |
| Case study | `/work/[slug]` |

We recommend three full case studies at launch rather than nine thin ones.

### Two pages to remove, not redirect

`/cosmetics/` and `/product-design/` are currently live and indexed. They
are demo pages left behind by the old WordPress theme. They should return a
410, not a redirect, because there is no equivalent page to send that
traffic to.

---

## 8. What we need from you to proceed

1. **Choose a theme.** Ledger, Brass, or Deep Field. The site is built in
   Ledger and switching is roughly a day.
2. **Decide on the typography licence.** Buy the Klim pair, or confirm we
   ship on the free substitutes.
3. **Approve or correct the sitemap**, particularly the phasing.
4. **Confirm the figures** we are publishing. These are listed with the rest
   of the outstanding items in the accompanying information request.

The separate information request covers the content, assets and access we
need, and the things we could not determine from the current website.
