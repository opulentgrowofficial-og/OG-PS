import { useReveal } from "@/hooks/useReveal";

const phases = [
  {
    index: "01",
    name: "Master data",
    claim: "We do not migrate the mess. We rebuild the foundation.",
    body: "The worst D365 failures are decided before a single module is configured, in fragmented data carried over from NAV, AX, SAP and a decade of spreadsheets. We run a four cycle extract, cleanse, transform and validate protocol, then restructure the financial foundation onto modern dimensional tagging so group reporting works on day one rather than in year two.",
    reading: "Validated against source before cutover",
  },
  {
    index: "02",
    name: "Logic and build",
    claim: "Configure first. Extend safely. Never touch the core.",
    body: "Hard coded customisation is how a partner creates technical debt and calls it flexibility. It breaks the moment Microsoft ships a mandatory release wave. We hold to a composable, extension only framework: anything outside standard D365 behaviour is isolated in Azure or the Power Platform, where it can be tested independently and survives every update.",
    reading: "Extension only, release wave safe",
  },
  {
    index: "03",
    name: "Adoption and hypercare",
    claim: "Software does not return anything. Users who trust it do.",
    body: "Return on an ERP arrives when finance and operations stop keeping a shadow spreadsheet. A generic PDF manual does not get you there. We build role based UAT that mirrors your real procure to pay and order to cash cycles, then our architects sit in your Teams channels through the first month end close and triage in the open.",
    reading: "Embedded through first close",
  },
];

export default function Method() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="method"
      className="border-b border-rule bg-ink py-20 sm:py-24 lg:py-30"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Pinned on desktop, an ordinary heading on mobile */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="reveal border-t border-white/15 pt-4">
                <span className="tabular text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white/45">
                  03 / Method
                </span>
              </div>

              <h2 className="reveal reveal-d1 mt-6 max-w-[14ch] font-display text-[2.125rem] font-light leading-[1.06] text-bone sm:text-5xl lg:text-[3.5rem]">
                The implementation reality check.
              </h2>

              <p className="reveal reveal-d2 mt-6 max-w-[42ch] text-[1.0625rem] leading-[1.7] text-white/55">
                Three phases, in the order that decides whether a programme
                holds. Nothing here is proprietary. It is simply the sequence
                most partners compress when a date is at risk.
              </p>

              <a
                href="/about"
                className="reveal reveal-d3 mt-8 inline-flex min-h-[44px] items-center border-b border-white/25 pb-2 text-[0.9375rem] font-medium text-bone transition-colors duration-300 ease-premium hover:border-oxide hover:text-oxide"
              >
                How we are set up
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ol className="border-t border-white/15">
              {phases.map((phase) => (
                <li
                  key={phase.index}
                  className="reveal border-b border-white/15 py-10 sm:py-12 lg:py-14"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="tabular text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-oxide">
                      Phase {phase.index}
                    </span>
                    <span className="ledger-label text-white/40">{phase.name}</span>
                  </div>

                  <h3 className="mt-5 max-w-[22ch] font-display text-[1.625rem] font-light leading-[1.15] text-bone sm:text-[2rem] lg:text-[2.25rem]">
                    {phase.claim}
                  </h3>

                  <p className="measure mt-5 text-[0.9375rem] leading-[1.75] text-white/55 sm:text-base">
                    {phase.body}
                  </p>

                  <p className="mt-6 flex items-center gap-3 text-[0.8125rem] text-white/45">
                    <span aria-hidden className="h-px w-8 bg-oxide" />
                    {phase.reading}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
