import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useReveal, useMediaQuery, usePrefersReducedMotion } from "@/hooks/useReveal";

export interface Engagement {
  id: string;
  index: string;
  /** The buyer's sentence, in their words. */
  problem: string;
  discipline: string;
  offer: string;
  answer: string;
  module: string;
  scope: string[];
  evidence: string;
}

export const engagements: Engagement[] = [
  {
    id: "rescue",
    index: "01",
    problem: "Our D365 implementation is over budget and has stopped moving.",
    discipline: "Project rescue",
    offer: "Turnkey D365 recovery",
    answer:
      "Senior architects take ownership inside two weeks. You get an honest implementation audit, a re-baselined plan you can take to your board, and a named partner accountable for the go-live date. No reassignment of blame, no second discovery phase billed as delivery.",
    module: "Finance & Operations",
    scope: [
      "Independent implementation audit",
      "Re-baselined scope and timeline",
      "Named senior architect on the account",
      "Weekly reporting written for the board",
    ],
    evidence: "Most recovered programmes reach go-live inside 60 days of handover.",
  },
  {
    id: "capacity",
    index: "02",
    problem: "We cannot hire skilled D365 people fast enough.",
    discipline: "Delivery capacity",
    offer: "Global Development Centre",
    answer:
      "A standing bench of certified D365 practitioners, matched on skill, timezone and working culture, then embedded into your team with a documented handover. You add capacity without adding a recruitment cycle.",
    module: "Business Central",
    scope: [
      "Pre-vetted functional and technical consultants",
      "Embedded inside ten working days",
      "Overlapping hours with your team",
      "Continuity commitments, not rotating staff",
    ],
    evidence: "Consultants stay on the same account for the length of the programme.",
  },
  {
    id: "legacy",
    index: "03",
    problem: "Legacy systems are holding our migration hostage.",
    discipline: "Modernisation",
    offer: "Enterprise modernisation",
    answer:
      "We move organisations off NAV, GP, AX and bespoke ERPs on a four cycle migration protocol: extract, cleanse, transform, validate. Parallel running and a reconciliation pack your auditors will accept, so the cutover is a non event.",
    module: "Finance & Operations",
    scope: [
      "Legacy estate assessment",
      "Four cycle data migration and cleansing",
      "Custom integration connectors",
      "Reconciliation pack for audit sign off",
    ],
    evidence: "Migrations run in parallel until your finance team signs off every balance.",
  },
  {
    id: "support",
    index: "04",
    problem: "Our D365 environment is badly maintained and keeps breaking.",
    discipline: "Managed support",
    offer: "Managed services and Ledger Care",
    answer:
      "Continuous monitoring, proactive patching and ledger reconciliation under a written service level. Your team stops firefighting release waves and gets back to the work the system was bought for.",
    module: "Business Central",
    scope: [
      "Continuous environment monitoring",
      "Release wave testing before deployment",
      "Ledger reconciliation support",
      "Response times written into the agreement",
    ],
    evidence: "Every Microsoft release wave is tested against your configuration before it lands.",
  },
  {
    id: "integration",
    index: "05",
    problem: "Nothing talks to anything. Every department has its own truth.",
    discipline: "Integration",
    offer: "Integration acceleration",
    answer:
      "API first architecture on Azure Logic Apps, Service Bus and purpose built connectors. One reconciled data set across ERP, CRM, commerce and warehouse, with the integration tests to prove it holds.",
    module: "Power Platform and Azure",
    scope: [
      "Azure Logic Apps and Service Bus design",
      "API first integration architecture",
      "Real time synchronisation",
      "Full integration test coverage",
    ],
    evidence: "Integration suites ship with automated tests, not a handover document.",
  },
];

interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  const ref = useReveal<HTMLElement>();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();

  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  // Desktop only: cycle through engagements until the visitor takes over.
  // On mobile the panel is an accordion, so auto-advance would fight the thumb.
  useEffect(() => {
    if (!isDesktop || touched || reduced) return;
    const t = setInterval(() => {
      setActive((i) => (i + 1) % engagements.length);
    }, 6000);
    return () => clearInterval(t);
  }, [isDesktop, touched, reduced]);

  const choose = useCallback(
    (i: number) => {
      setTouched(true);
      setActive((current) => (current === i && !isDesktop ? -1 : i));
    },
    [isDesktop]
  );

  return (
    <section
      ref={ref}
      className="relative grain overflow-hidden border-b border-rule bg-bone pt-14 pb-20 sm:pt-20 lg:pt-28 lg:pb-30"
      aria-labelledby="hero-heading"
    >
      <div className="shell relative z-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---- Left: the promise ---- */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="reveal ledger-label mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span>Microsoft Dynamics 365</span>
              <span aria-hidden className="h-px w-6 bg-rule" />
              <span>Delivery partner since 2018</span>
            </p>

            <h1
              id="hero-heading"
              className="font-display text-[2.75rem] font-light leading-[1.02] tracking-[-0.02em] text-ink sm:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]"
            >
              <span className="line-mask">
                <span>The partner</span>
              </span>
              <span className="line-mask">
                <span>you call when</span>
              </span>
              <span className="line-mask">
                <span className="text-oxide">D365 has gone</span>
              </span>
              <span className="line-mask">
                <span className="text-oxide">sideways.</span>
              </span>
            </h1>

            <p className="reveal reveal-d3 measure mt-8 text-[1.0625rem] leading-[1.7] text-ink-soft sm:text-lg">
              Implementation, migration and managed services for Business Central,
              Finance &amp; Operations and the Power Platform. Senior practitioners
              only, on a scope agreed before anyone writes code.
            </p>

            <div className="reveal reveal-d4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={onOpenForm}
                className="group inline-flex items-center justify-center gap-2.5 rounded-sm bg-ink px-7 py-4 text-[0.9375rem] font-semibold text-bone transition-colors duration-300 ease-premium hover:bg-oxide active:translate-y-px sm:py-3.5"
              >
                Book a 30 minute assessment
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-ink/20 px-7 py-4 text-[0.9375rem] font-semibold text-ink transition-colors duration-300 ease-premium hover:border-ink hover:bg-ink hover:text-bone active:translate-y-px sm:py-3.5"
              >
                See what we do
              </a>
            </div>

            <dl className="reveal reveal-d4 mt-12 grid grid-cols-3 border-t border-rule pt-6">
              {[
                ["50+", "Implementations"],
                ["4", "Continents"],
                ["98%", "On time delivery"],
              ].map(([figure, label]) => (
                <div key={label}>
                  <dd className="tabular font-display text-[1.75rem] font-light leading-none text-ink sm:text-[2rem]">
                    {figure}
                  </dd>
                  <dt className="ledger-label mt-2 block">{label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* ---- Right: the engagement ledger ---- */}
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="reveal reveal-d1 ledger-label mb-5 border-t border-rule pt-4">
              Where most conversations start
            </p>

            <ul className="reveal reveal-d2 border-t border-rule">
              {engagements.map((item, i) => {
                const open = active === i;
                return (
                  <li key={item.id} className="border-b border-rule">
                    <h3>
                      <button
                        onClick={() => choose(i)}
                        aria-expanded={open}
                        aria-controls={`engagement-${item.id}`}
                        className="group flex w-full items-start gap-4 py-5 text-left transition-colors duration-300 ease-premium lg:py-4"
                      >
                        <span
                          className={`tabular mt-0.5 text-[0.6875rem] font-medium tracking-[0.18em] transition-colors duration-300 ${
                            open ? "text-oxide" : "text-ink-mute"
                          }`}
                        >
                          {item.index}
                        </span>
                        <span
                          className={`flex-1 text-[0.9375rem] font-medium leading-snug transition-colors duration-300 sm:text-base ${
                            open ? "text-ink" : "text-ink-soft group-hover:text-ink"
                          }`}
                        >
                          {item.problem}
                        </span>
                        <Plus
                          aria-hidden
                          className={`mt-0.5 h-4 w-4 flex-shrink-0 transition-transform duration-300 ease-premium lg:hidden ${
                            open ? "rotate-45 text-oxide" : "text-ink-mute"
                          }`}
                        />
                      </button>
                    </h3>

                    {/* Mobile: the answer opens in place, directly under the
                        question that was tapped. Desktop gets the panel below. */}
                    <div
                      id={`engagement-${item.id}`}
                      hidden={!open}
                      className="lg:hidden"
                    >
                      <AnswerCard item={item} compact />
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Desktop panel */}
            {active >= 0 && (
              <div className="reveal reveal-d3 mt-8 hidden lg:block">
                <AnswerCard item={engagements[active]} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnswerCard({ item, compact = false }: { item: Engagement; compact?: boolean }) {
  return (
    <article
      className={`border border-rule bg-surface ${compact ? "mb-5 p-6" : "p-8 xl:p-10"}`}
    >
      <p className="ledger-label flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-oxide">{item.discipline}</span>
        <span aria-hidden className="h-px w-5 bg-rule" />
        <span>{item.module}</span>
      </p>

      <h4
        className={`mt-4 font-display font-light leading-tight text-ink ${
          compact ? "text-[1.5rem]" : "text-[1.75rem] xl:text-[2rem]"
        }`}
      >
        {item.offer}
      </h4>

      <p className="measure mt-4 text-[0.9375rem] leading-[1.7] text-ink-soft">
        {item.answer}
      </p>

      <ul className={`mt-6 grid gap-y-3 ${compact ? "" : "sm:grid-cols-2 sm:gap-x-8"}`}>
        {item.scope.map((line) => (
          <li key={line} className="flex items-start gap-3">
            <Check className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-oxide" aria-hidden />
            <span className="text-[0.875rem] leading-snug text-ink">{line}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-rule pt-4 text-[0.875rem] leading-relaxed text-ink-soft">
        {item.evidence}
      </p>
    </article>
  );
}
