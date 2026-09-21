# PropelSaga rebuild: internal audit

**Audience:** our team only. Do not send this to the client.
**Date:** 21 September 2026
**Scope:** homepage rebuild from the Lovable base. Copywriting quality was
explicitly out of scope, so this covers structure, credibility, technical
debt and the things that will bite us later.

---

## 1. The thing that has to be fixed before anything else

### 1.1 Three sections quoted three different sets of numbers

This is the most serious finding in the old build and it is not a design
problem, it is a credibility problem. On a single page:

| Claim | Hero | KPI tabs | Stats bar |
| --- | --- | --- | --- |
| Projects | 108+ | 50+ | 50+ |
| Years | 7+ | not shown | 15+ |
| Client retention | 92% | 95% | not shown |
| On time delivery | not shown | 98% | 98% |

A procurement team that screenshots two sections and puts them side by side
has a reason to discount everything else on the page. Worse, a competitor
or a disgruntled ex-client can do the same publicly.

**What we did:** every visitor-facing figure now comes from one array in
`src/components/sections/Proof.tsx`. Four figures, not twelve. The hero
repeats three of them verbatim rather than inventing its own.

**What we still need:** the client has to confirm each one in writing. We
are publishing them under their name, not ours.

### 1.2 Two claims that do not survive arithmetic

- **"200+ certified consultants" against "50+ projects" and "30+ global
  clients."** That is four consultants per project ever delivered, on a
  permanent bench. A D365 buyer will do this division in their head. Either
  the bench number includes an extended partner network, in which case say
  so, or it is aspirational, in which case it has to go.
- **"15+ years Microsoft D365 focus"** while the hero says 7+ years and the
  company's own first blog post is dated December 2024. Dynamics 365 itself
  only launched in 2016. If 15 years means combined team experience or
  pre-D365 NAV/AX experience, it needs that qualifier or it reads as false.

We removed both from the build. They need a decision, not a rewrite.

### 1.3 The form did not capture anything

`BottomCTA.tsx` ended at `console.log("Form submitted:", formData)`. Every
lead from the old build was lost at the browser. This is the single most
expensive defect in the codebase and it is invisible in a design review.

**What we did:** the form now validates properly and POSTs to
`VITE_ENQUIRY_ENDPOINT`. If that variable is unset it reports a visible send
failure and offers the email address, rather than showing a success screen
for a lead that went nowhere. Failing loudly is deliberate.

---

## 2. Why mobile failed

### 2.1 The hero, specifically

The old hero was a two column grid: pain points in column one, the solution
card in column two. On desktop that reads fine. On mobile the grid stacks,
so the flow became:

> badges → headline → "click a pain point below" → 5 pain buttons →
> two CTA buttons → *then* the solution card, roughly 1,200px further down

Tapping a pain point changed content the visitor could not see. The
instruction "click a pain point below to see how PropelSaga solves it" was
literally false on a phone, which is where most of the traffic is. On top of
that a 4 second auto-rotate kept changing the selection under the user's
thumb, and the rotation had no pause on interaction.

**What we did:** on mobile the panel is an accordion. Tapping a problem
opens its answer in place, directly underneath. Auto-advance is desktop only
and stops permanently the moment the visitor picks something. Desktop keeps
the split layout with the panel below the list.

### 2.2 The 500vh sticky section

`ElevateSection` pinned three full-screen panels inside a `h-[500vh]`
wrapper. Each panel was `h-screen` with `pt-28` and a long body paragraph.
On a 375x812 phone the third panel's content overflowed its own container
and was clipped with no scroll, so part of the methodology was unreadable on
mobile. It also meant five viewport heights of scrolling for three
paragraphs.

**What we did:** replaced with a sticky-side layout. The heading column
pins on desktop, the phases scroll past it, and on mobile it degrades to an
ordinary stacked list with nothing clipped. Same idea, a fifth of the scroll
cost, no mobile failure mode.

### 2.3 The mobile stats marquee was broken

`animate-slide-left` moved a doubled list from `translateX(100%)` to
`translateX(-100%)`. For a seamless loop the translate distance has to equal
exactly half the duplicated track, which `100%` of the container is not. The
result was a visible gap and a jump every cycle.

**What we did:** the marquee now moves `0` to `-50%` on a `w-max` flex track
with the content duplicated once, which is the only arrangement that loops
without a seam. It is also masked at both edges and mirrored in a
screen-reader-only list.

### 2.4 Smaller mobile defects, all fixed

- Four blurred 500px orbs animating behind the hero. `filter: blur(80px)` on
  an animating element is one of the more reliable ways to drop a mid-range
  Android phone below 30fps. Removed entirely.
- The opening curtain animation ran on every visit and delayed first paint
  for about 1.9 seconds. On a repeat visit from a search result this is pure
  cost. Removed.
- Body copy was set at 18px globally, which is oversized on a 360px screen
  and forced more wrapping than it saved.
- Tap targets: footer links rendered at 17px tall. Now 44px minimum
  everywhere except inline links inside a paragraph, which are exempt.
- Emoji flags in the hero trust line. They render inconsistently across
  Windows and Android, and they are a well known AI-build tell.

**Verified:** at 360px and 375px the document has no horizontal scroll, no
rendered text below 11px, and no element extending past the viewport apart
from the marquee, which is intentionally clipped by its parent.

---

## 3. Structural and content gaps

### 3.1 The blog is missing, and it is their biggest SEO asset

The live WordPress site has fourteen indexed posts published between
December 2024 and September 2026, on exactly the queries a D365 buyer types:
Copilot use cases, BC versus F&O, AI costing, user adoption. The rebuild has
no `/insights` route at all.

If this ships as a single page and the WordPress install is retired, that
traffic is gone. The blog has to be migrated, not rebuilt from scratch, and
every URL needs a 301. This is a launch blocker, not a phase two item.

### 3.2 Junk pages from the old theme are indexed

`page-sitemap.xml` currently lists `/cosmetics/` and `/product-design/`.
These are demo pages from the WordPress theme that were never removed. They
are indexable, they carry no relevance to a D365 consultancy, and they are
exactly the kind of thing that erodes a small site's topical authority.
Return 410 rather than 301: there is no relevant destination.

### 3.3 The old OG image pointed at a third party bucket

`index.html` referenced a `storage.googleapis.com/gpt-engineer-file-uploads/...`
URL. Beyond leaking which tool built the site, it is an asset on
infrastructure the client does not control and cannot guarantee. Replaced
with a self-hosted path. The image itself still needs producing.

### 3.4 The title tag said "PropelS"

Truncated brand name in the `<title>` of the old build. Small, but it is the
first thing a search result shows.

### 3.5 No routes existed

`App.tsx` had exactly two routes: `/` and a catch-all. Every navigation
item, every footer link and every "Learn more" pointed at `href="#"`. A site
where forty links do nothing does not survive a client click-through. The
routes are now real paths, so the 404 is honest until the pages are built.

### 3.6 Missing entirely

No privacy policy, terms, or cookie notice in the build, while the client
serves UK and EU clients and the form collects personal data. No sitemap.
No structured data. No canonical. No skip link. All now present or
scaffolded except the legal copy, which needs their lawyer.

---

## 4. Design decisions worth defending in the review

**We moved off the navy and teal palette.** Every Microsoft D365 partner
site in the market is navy blue with a teal or cyan accent. It is the
default, which means it is invisible. The new direction is warm bone paper,
near-black ink with a navy undertone, and a single oxide accent. It keeps
the Microsoft ecosystem association through the ink rather than shouting it,
and it reads as an advisory firm rather than a reseller.

**We removed every eyebrow label**, on the client's instruction, including
in the hero. Sections now open with a ledger index (`01 / Capabilities`).
This became the signature device: the numbering threads the whole page and
gives an ERP firm a visual metaphor it can own.

**We dropped stock photography rather than replacing it.** The old build
used Unsplash images of generic offices next to specific case study claims.
Attaching a stock photo to "a $2B manufacturer" is a misrepresentation, and
Unsplash's licence also requires visible attribution that nobody ships. The
case studies are now a typographic index with real metadata. When the client
clears actual project imagery we can add it without touching the layout.

**Two typefaces, no exceptions.** Newsreader for display, Instrument Sans
for everything else including numerals, using tabular figures instead of a
third monospace family. The old build loaded Inter, Sora and JetBrains Mono,
which is three families and eleven weights for one page.

---

## 5. Technical debt cleared

- Removed `lovable-tagger`, `lovable-agent-playwright-config`, the `.lovable`
  directory, and the gpt-engineer asset URL. No trace of the build tool
  remains in the repository.
- Dropped 27 unused shadcn components and 21 unused dependencies, including
  `recharts`, `embla-carousel`, `react-day-picker`, `cmdk` and `vaul`. None
  of them were imported.
- Removed `framer-motion` entirely. It was doing fade-up-on-scroll, which is
  eleven lines of `IntersectionObserver`. Production JavaScript went from
  334KB to 280KB raw, 107KB to 90KB gzipped, on a page that got longer.
- One radius, one shadow, one border, two easing curves, all as tokens.

## 6. Known gaps in what we are handing over

Stated plainly so nobody discovers these in the client meeting:

1. Only the homepage exists. Every other route renders the 404.
2. The enquiry endpoint is unset, so the form deliberately fails.
3. The favicon is a placeholder typographic mark. We do not have their real
   logo files.
4. `og-cover.png` does not exist yet.
5. Case study content is representative of real engagements described in the
   old copy, but has not been verified with the client or the named clients.
6. No analytics or consent management is wired in.
7. Fonts are the free substitutes. If the client buys the licensed pairing
   it is a two line change in `index.css` plus the font files.
