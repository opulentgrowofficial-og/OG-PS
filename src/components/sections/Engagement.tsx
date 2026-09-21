import { useReveal } from "@/hooks/useReveal";
import SectionHead from "@/components/primitives/SectionHead";

const steps = [
  {
    index: "01",
    title: "A short form",
    body: "Four fields. Enough for us to route you to the right practice lead rather than a sales queue.",
    difference: "No qualification call before the qualification call.",
  },
  {
    index: "02",
    title: "One conversation",
    body: "Thirty minutes with someone who has delivered your module in your industry. Not an account manager taking notes.",
    difference: "You are talking to the person who would run the work.",
  },
  {
    index: "03",
    title: "A written plan",
    body: "Scope, sequence, dependencies and the dates we are prepared to commit to, in a document you can circulate internally.",
    difference: "Something you can take to a board, not a pricing sheet.",
  },
  {
    index: "04",
    title: "We work to your rhythm",
    body: "We join your stand ups, your board, your channels. Reporting fits your governance rather than replacing it.",
    difference: "An extension of your team, not a vendor interface.",
  },
  {
    index: "05",
    title: "Controlled delivery",
    body: "Fixed sprint cadence with a visible burn down. Change is priced and agreed before it enters a sprint, never after.",
    difference: "Nothing enters the build that has not been agreed.",
  },
  {
    index: "06",
    title: "Sign off before go live",
    body: "Role based UAT against your real cycles, a reconciliation pack for finance, and a documented go or no go.",
    difference: "Your finance team holds the decision, not the calendar.",
  },
  {
    index: "07",
    title: "We stay",
    body: "Four to six weeks of embedded hypercare through your first close, then managed services take the environment on.",
    difference: "Most partners leave here. This is where the value shows up.",
  },
];

export default function Engagement() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="process"
      className="border-b border-rule bg-bone-deep py-20 sm:py-24 lg:py-30"
    >
      <div className="shell">
        <SectionHead
          index="05 / Engagement"
          align="wide"
          title={
            <>
              From first form to
              <br />
              first close.
            </>
          }
          lede="Seven steps, and the reason each one exists. We publish the sequence because most of the risk in an ERP engagement sits in the handoffs, not the build."
          className="max-w-3xl"
        />

        {/* One vertical ledger at every width. Horizontal carousels hide
            content on mobile and need a gesture nobody is told about. */}
        <ol className="reveal mt-14 border-t border-rule lg:mt-16">
          {steps.map((step) => (
            <li
              key={step.index}
              className="group border-b border-rule py-8 transition-colors duration-500 ease-premium sm:py-9"
            >
              <div className="grid gap-4 sm:grid-cols-12 sm:gap-8">
                <div className="sm:col-span-3 lg:col-span-2">
                  <span className="tabular font-display text-[2.5rem] font-light leading-none text-ink/20 transition-colors duration-500 ease-premium group-hover:text-oxide sm:text-[3rem]">
                    {step.index}
                  </span>
                </div>

                <div className="sm:col-span-5 lg:col-span-5">
                  <h3 className="font-display text-[1.375rem] font-light leading-snug text-ink sm:text-[1.625rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-ink-soft">
                    {step.body}
                  </p>
                </div>

                <div className="sm:col-span-4 lg:col-span-5">
                  <p className="border-l-2 border-oxide/30 pl-4 text-[0.875rem] leading-relaxed text-ink-soft sm:mt-1">
                    {step.difference}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
