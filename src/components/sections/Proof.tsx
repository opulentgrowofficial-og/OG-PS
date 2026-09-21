import { useReveal } from "@/hooks/useReveal";
import Counter from "@/components/primitives/Counter";
import SectionHead from "@/components/primitives/SectionHead";

/**
 * Four figures, not six. Each one is a claim the sales team can defend
 * in a reference call. Numbers are set in one place so no two sections
 * of the site can ever disagree about them.
 */
const figures = [
  { to: 50, suffix: "+", label: "D365 implementations delivered", note: "Across manufacturing, distribution, professional services and retail" },
  { to: 98, suffix: "%", label: "Delivered on the committed date", note: "Measured at go live, across the last three years of engagements" },
  { to: 350, suffix: "+", label: "Active Microsoft certifications", note: "Business Central, Finance & Operations, Customer Engagement, Azure" },
  { to: 4, suffix: "", label: "Continents with active delivery", note: "Overlapping hours with teams in the Americas, EMEA and APAC" },
];

const platforms = [
  "Dynamics 365 Business Central",
  "Dynamics 365 Finance & Operations",
  "Dynamics 365 Customer Engagement",
  "Power Platform",
  "Azure Integration Services",
  "Copilot for Dynamics 365",
];

export default function Proof() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="border-b border-rule bg-bone py-20 sm:py-24 lg:py-30">
      <div className="shell">
        <SectionHead
          index="04 / Record"
          align="wide"
          title={
            <>
              Four numbers we
              <br />
              will put on a call.
            </>
          }
          lede="Any one of these can be checked with a reference client. We publish the four we can substantiate rather than the twelve that would fill the row."
          className="max-w-3xl"
        />

        <dl className="reveal mt-14 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {figures.map((f) => (
            <div key={f.label} className="bg-surface p-7 sm:p-8">
              <dd className="font-display text-[3rem] font-light leading-none text-ink sm:text-[3.5rem]">
                <Counter to={f.to} suffix={f.suffix} />
              </dd>
              <dt className="mt-5 text-[0.9375rem] font-medium leading-snug text-ink">
                {f.label}
              </dt>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-mute">
                {f.note}
              </p>
            </div>
          ))}
        </dl>

        {/* Platform marquee: one slow loop, duplicated content so the
            translate distance matches the track exactly and never gaps. */}
        <div className="reveal mt-14 border-y border-rule py-6 lg:mt-16">
          <p className="ledger-label mb-5">Platforms we work in</p>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <ul className="flex w-max animate-marquee gap-10 sm:gap-14" aria-hidden>
              {[...platforms, ...platforms].map((p, i) => (
                <li
                  key={`${p}-${i}`}
                  className="whitespace-nowrap font-display text-[1.125rem] font-light text-ink-soft sm:text-[1.375rem]"
                >
                  {p}
                </li>
              ))}
            </ul>
            <p className="sr-only">{platforms.join(", ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
