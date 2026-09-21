# Working notes: model and effort for the rest of this project

Internal. This is about how to run the remaining work efficiently, not
about the client.

---

## Which model for which task

The mistake that costs most on a project like this is using a heavyweight
model for mechanical work and a light one for judgement work. The split is
not about difficulty, it is about whether the task has one correct answer.

| Work | Model | Effort | Why |
| --- | --- | --- | --- |
| Design direction, palette, typography, brand decisions | **Opus 5** | high | Taste is the whole deliverable. There is no test that tells you the palette is wrong, so you are paying for judgement |
| Copywriting and positioning | **Opus 5** | high | The "40% cheaper" rewrite is the example. It needed the commercial argument reframed, not the sentence rephrased |
| Auditing an existing build | **Opus 5** | high | Finding the three-conflicting-numbers problem needed reading four files and noticing they disagreed. A cheaper model finds the styling issues and misses that |
| Building the remaining 21 pages from an approved system | **Sonnet 5** | medium | The design system is locked. Each page is pattern application, and the tokens make wrong answers obvious |
| Blog migration, 301 map, sitemap generation | **Sonnet 5** | low | Mechanical, verifiable, high volume |
| Content entry into existing components | **Haiku 4.5** | low | No judgement involved |
| Accessibility and responsive audits | **Sonnet 5** | medium | Measurement, not taste. Write the script once and rerun it |
| Final pre-launch review | **Opus 5** | high | Last chance to catch the thing that is technically fine and commercially wrong |

**Fast mode** is worth turning on for the page-building phase. It is the
same Opus model with faster output, so nothing is given up on quality, and
that phase is mostly long-output generation where latency is the cost.

## How to run the page build

Do not ask for all 21 pages at once. Batch them by template, because a
batch that shares a template shares its mistakes, and fixing one fixes all:

1. **Legal pages first** (privacy, terms, cookies). Simple template,
   gets a real page pattern established, and unblocks the launch checklist.
2. **The five platform pages.** One template, five contents.
3. **The ten capability pages.** One template, ten contents. This is the
   biggest batch and the most commercially valuable.
4. **About and Careers.** Both bespoke, both need client material.
5. **Insights index plus article template**, then migrate the posts.
6. **Work index plus case study template**, once the client clears content.

Ask for the template and one instance first. Approve that, then generate
the rest against it. Generating ten pages before approving the pattern
means ten pages to redo.

## What to keep in front of the model

The design system is the constraint that prevents drift. Every session that
touches UI should have:

- `src/index.css` (the tokens)
- `docs/DESIGN-DIRECTION.md` (the reasoning)
- The "paste this into Lovable" block in `docs/LOVABLE-TRANSFER.md`
- One existing section file as the reference pattern

Without these, output regresses toward the generic centre within about two
prompts. That is not a model failure, it is missing context.

## Verification that actually catches things

The visual check is not sufficient on its own, and the preview pane failed
repeatedly during this build while the page was in fact correct. Run the
measurements instead, and treat the screenshot as corroboration:

- `document.documentElement.scrollWidth` equals `clientWidth` at 360px
- Every button and standalone link at 44px minimum height
- No rendered `font-size` below 11px
- Composite every text colour over its resolved background before checking
  contrast. Reading the declared colour misses every `text-white/45`, which
  is how eight failures survived the first pass here

Keep `npm run typecheck` and `npm run build` in the loop. Both caught real
breakage during this rebuild.

## The one thing to watch commercially

The client's positioning problem is not solved, only deferred. "40% cheaper
than Big 4" has been reframed as governed scope and senior-only delivery,
which is stronger. But their pricing page, their proposals and their sales
conversations probably still lead with the discount. If the site says one
thing and the first call says another, the site loses.

Worth raising with them directly rather than leaving as a copy decision.
