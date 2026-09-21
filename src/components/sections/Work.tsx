import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import SectionHead from "@/components/primitives/SectionHead";

/**
 * Typographic case index rather than a card grid with stock photography.
 * Placeholder photography on a real case study misrepresents the work,
 * and a metadata-led index reads as a portfolio rather than a blog roll.
 * Swap in client-approved imagery once the case studies are cleared.
 */
const cases = [
  {
    index: "01",
    title: "Twelve entities, two continents, one chart of accounts",
    sector: "Manufacturing",
    scope: "NAV 2016 to Business Central",
    duration: "16 weeks",
    outcome: "Consolidated group reporting live at cutover",
    href: "/work/manufacturing-nav-to-business-central",
  },
  {
    index: "02",
    title: "A boutique partner practice, from five consultants to forty five",
    sector: "Microsoft partner",
    scope: "Partner Acceleration Hub",
    duration: "6 months",
    outcome: "Delivery capacity scaled without a quality drop",
    href: "/work/partner-practice-scale-up",
  },
  {
    index: "03",
    title: "Three countries, three tax regimes, one platform",
    sector: "Logistics",
    scope: "Finance & Operations rollout",
    duration: "11 months",
    outcome: "Multi currency and local compliance on a single instance",
    href: "/work/middle-east-logistics-fo",
  },
];

export default function Work() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="work" className="border-b border-rule bg-bone py-20 sm:py-24 lg:py-30">
      <div className="shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHead
            index="06 / Selected work"
            title={
              <>
                What the work
                <br />
                looks like.
              </>
            }
            className="flex-1"
          />

          <a
            href="/work"
            className="reveal reveal-d2 group inline-flex min-h-[44px] flex-shrink-0 items-center gap-2 border-b border-ink/25 pb-2 text-[0.9375rem] font-medium text-ink transition-colors duration-300 ease-premium hover:border-oxide hover:text-oxide"
          >
            All case studies
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <ul className="reveal mt-14 border-t border-rule lg:mt-16">
          {cases.map((item) => (
            <li key={item.index} className="border-b border-rule">
              <a href={item.href} className="group block py-8 sm:py-10">
                <div className="grid gap-5 lg:grid-cols-12 lg:items-baseline lg:gap-8">
                  <span className="tabular text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-mute lg:col-span-1">
                    {item.index}
                  </span>

                  <h3 className="font-display text-[1.5rem] font-light leading-[1.2] text-ink transition-colors duration-300 ease-premium group-hover:text-oxide sm:text-[2rem] lg:col-span-6 lg:text-[2.25rem]">
                    {item.title}
                  </h3>

                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4 lg:col-span-4 lg:grid-cols-2">
                    {[
                      ["Sector", item.sector],
                      ["Scope", item.scope],
                      ["Duration", item.duration],
                      ["Outcome", item.outcome],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="ledger-label">{k}</dt>
                        <dd className="mt-1.5 text-[0.875rem] leading-snug text-ink-soft">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <span className="hidden justify-end lg:col-span-1 lg:flex">
                    <ArrowUpRight
                      aria-hidden
                      className="h-5 w-5 text-ink-mute transition-[transform,color] duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-oxide"
                    />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
