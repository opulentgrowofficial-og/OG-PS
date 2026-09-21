import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import SectionHead from "@/components/primitives/SectionHead";
import Counter from "@/components/primitives/Counter";
import { Slider } from "@/components/ui/slider";

const blocks = [
  {
    index: "01",
    industry: "The bait and switch",
    industryBody:
      "You are sold by a partner and delivered by a graduate. The senior names in the pitch deck move to the next bid the week the contract is signed, and your architecture is written by someone learning your industry on your budget.",
    ours: "Only senior practitioners touch the build",
    oursBody:
      "There are no juniors on our bench. The architect who maps your processes in week one is the architect who signs off your go live. Minimum seven years in the Microsoft ecosystem, on every engagement, on every module.",
    visual: "certifications" as const,
  },
  {
    index: "02",
    // Reframed: the point is governed scope and senior-only delivery,
    // not being the cheap option.
    industry: "The change request economy",
    industryBody:
      "Vague scoping is a commercial strategy. The estimate wins the deal, the change requests earn the margin, and a programme approved at 200k arrives at UAT having spent 450k.",
    ours: "The scope is agreed before the build is priced",
    oursBody:
      "Every process is mapped in a Phase 1 fit gap analysis, then written into the statement of work before anyone opens Visual Studio. You are not funding a discovery phase disguised as delivery, and you are not paying a pyramid of juniors to learn your business. Most clients find that roughly a third of a conventional programme budget moves out of overhead and back into scope.",
    visual: "allocation" as const,
  },
  {
    index: "03",
    industry: "The go live disappearance",
    industryBody:
      "The system launches, the invoice clears, the team vanishes. Your finance staff meet their first month end close alone, with a PDF manual and a support address that answers in four days.",
    ours: "Hypercare is written into the engagement",
    oursBody:
      "Four to six weeks of embedded hypercare, in your Teams channels, through your first close. After stabilisation the managed services team takes the environment on, so every Microsoft release wave is tested against your configuration before it reaches you.",
    visual: "timeline" as const,
  },
];

const milestones = [
  { week: "01", label: "Kickoff" },
  { week: "12", label: "UAT" },
  { week: "18", label: "Go live" },
  { week: "24", label: "Hypercare complete" },
];

export default function Divergence() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="approach"
      className="border-b border-rule bg-bone py-20 sm:py-24 lg:py-30"
    >
      <div className="shell">
        <SectionHead
          index="02 / Approach"
          align="wide"
          title={
            <>
              Three ways this
              <br />
              usually goes wrong.
            </>
          }
          lede="Every one of these is something a client described to us before they became a client. The right hand column is what we do instead, written plainly enough to hold us to it."
          className="max-w-3xl"
        />

        <div className="mt-16 space-y-6 lg:mt-20 lg:space-y-8">
          {blocks.map((block) => (
            <article
              key={block.index}
              className="reveal grid gap-px overflow-hidden border border-rule bg-rule lg:grid-cols-12"
            >
              {/* Problem, on ink */}
              <div className="bg-ink p-7 sm:p-9 lg:col-span-5 lg:p-10">
                <p className="ledger-label text-white/55">
                  {block.index} · Industry standard
                </p>
                <h3 className="mt-5 font-display text-[1.5rem] font-light leading-tight text-bone sm:text-[1.875rem]">
                  {block.industry}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-white/55">
                  {block.industryBody}
                </p>
              </div>

              {/* Answer, on paper */}
              <div className="bg-surface p-7 sm:p-9 lg:col-span-7 lg:p-10">
                <p className="ledger-label text-oxide">How we work</p>
                <h3 className="mt-5 font-display text-[1.5rem] font-light leading-tight text-ink sm:text-[1.875rem]">
                  {block.ours}
                </h3>
                <p className="measure mt-4 text-[0.9375rem] leading-[1.7] text-ink-soft">
                  {block.oursBody}
                </p>

                <div className="mt-8">
                  {block.visual === "certifications" && <CertificationFigure />}
                  {block.visual === "allocation" && <AllocationFigure />}
                  {block.visual === "timeline" && <TimelineFigure />}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationFigure() {
  return (
    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4 border-t border-rule pt-6">
      <div>
        <Counter
          to={350}
          suffix="+"
          className="font-display text-[2.5rem] font-light leading-none text-ink"
        />
        <p className="ledger-label mt-2">Active Microsoft certifications</p>
      </div>
      <div>
        <span className="tabular font-display text-[2.5rem] font-light leading-none text-ink">
          7+
        </span>
        <p className="ledger-label mt-2">Minimum years per consultant</p>
      </div>
    </div>
  );
}

/**
 * Reframed from a savings calculator into a budget allocation view.
 * Same arithmetic, different argument: where the money goes, not how
 * little it costs.
 */
function AllocationFigure() {
  const [budget, setBudget] = useState(400);
  const toScope = Math.round(budget * 0.34);

  return (
    <div className="border-t border-rule pt-6">
      <div className="flex items-baseline justify-between">
        <label htmlFor="budget" className="ledger-label">
          Programme budget
        </label>
        <span className="tabular font-display text-[1.375rem] font-light text-ink">
          ${budget}k
        </span>
      </div>

      <Slider
        id="budget"
        value={[budget]}
        onValueChange={(v) => setBudget(v[0])}
        min={200}
        max={1000}
        step={50}
        aria-label="Programme budget in thousands of dollars"
        className="mt-5"
      />

      <div className="mt-6 grid grid-cols-2 gap-px border border-rule bg-rule">
        <div className="bg-bone-deep p-4">
          <p className="ledger-label">Conventional split</p>
          <p className="tabular mt-2 font-display text-[1.5rem] font-light leading-none text-ink-mute">
            ${budget}k
          </p>
          <p className="mt-2 text-[0.75rem] leading-snug text-ink-mute">
            Overhead, rework and change orders absorbed
          </p>
        </div>
        <div className="bg-surface p-4">
          <p className="ledger-label text-oxide">Redirected into scope</p>
          <p className="tabular mt-2 font-display text-[1.5rem] font-light leading-none text-ink">
            ${toScope}k
          </p>
          <p className="mt-2 text-[0.75rem] leading-snug text-ink-soft">
            Additional delivered functionality at the same spend
          </p>
        </div>
      </div>

      <p className="mt-4 text-[0.75rem] leading-relaxed text-ink-mute">
        Indicative, based on engagements of comparable scope. Your figure is
        set during Phase 1, not estimated here.
      </p>
    </div>
  );
}

function TimelineFigure() {
  return (
    <div className="border-t border-rule pt-6">
      <ol className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
        {milestones.map((m, i) => (
          <li key={m.week} className="border-t-2 border-rule pt-3">
            <span
              className={`tabular block font-display text-[1.25rem] font-light leading-none ${
                i === milestones.length - 1 ? "text-oxide" : "text-ink"
              }`}
            >
              Wk {m.week}
            </span>
            <span className="ledger-label mt-2 block">{m.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
