import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import SectionHead from "@/components/primitives/SectionHead";

const capabilities = [
  {
    index: "01",
    title: "Global Development Centre",
    href: "/capabilities/global-development-centre",
    summary:
      "Dedicated D365 delivery teams that work your hours and stay on your account. Capacity without a recruitment cycle.",
    meta: "Business Central · F&O · Power Platform",
  },
  {
    index: "02",
    title: "Partner Acceleration Hub",
    href: "/capabilities/partner-acceleration-hub",
    summary:
      "White label delivery for Microsoft partners scaling a practice. Your brand on the work, our bench behind it, quality your clients will not question.",
    meta: "For Microsoft partners and ISVs",
  },
  {
    index: "03",
    title: "Turnkey project ownership",
    href: "/capabilities/turnkey-project-ownership",
    summary:
      "Hand over the scope and we own discovery, build, testing, training and go live. One accountable partner, one agreed date.",
    meta: "Fixed scope engagements",
  },
  {
    index: "04",
    title: "Enterprise modernisation",
    href: "/capabilities/enterprise-modernisation",
    summary:
      "NAV, GP, AX and bespoke ERP migrations onto Business Central or Finance & Operations, with reconciliation your auditors accept.",
    meta: "Four cycle migration protocol",
  },
  {
    index: "05",
    title: "Integration acceleration",
    href: "/capabilities/integration-acceleration",
    summary:
      "API first architecture across ERP, CRM, commerce and warehouse, built on Azure Logic Apps and Service Bus with full test coverage.",
    meta: "Azure · Power Platform",
  },
  {
    index: "06",
    title: "Managed services and Ledger Care",
    href: "/capabilities/managed-services",
    summary:
      "Continuous monitoring, release wave testing and ledger reconciliation under a written service level, so month end stops being an event.",
    meta: "Three service tiers",
  },
];

export default function Capabilities() {
  const ref = useReveal<HTMLElement>();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="capabilities"
      className="border-b border-rule bg-bone py-20 sm:py-24 lg:py-30"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              index="01 / Capabilities"
              title={
                <>
                  Nine services.
                  <br />
                  One discipline.
                </>
              }
              lede="Everything we sell sits inside the Microsoft Dynamics 365 estate. We are not a generalist consultancy with a D365 team. It is the only thing we do, which is why the bench is senior and the estimates hold."
            />

            <a
              href="/capabilities"
              className="reveal reveal-d3 group mt-8 inline-flex min-h-[44px] items-center gap-2 border-b border-ink/25 pb-2 text-[0.9375rem] font-medium text-ink transition-colors duration-300 ease-premium hover:border-oxide hover:text-oxide"
            >
              All capabilities
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Numbered editorial rows, not a grid of identical cards */}
          <ul className="reveal reveal-d1 border-t border-rule lg:col-span-7">
            {capabilities.map((item) => (
              <li key={item.index} className="border-b border-rule">
                <a
                  href={item.href}
                  onMouseEnter={() => setHovered(item.index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(item.index)}
                  onBlur={() => setHovered(null)}
                  className="group block py-7 transition-colors duration-500 ease-premium sm:py-8"
                >
                  <div className="flex items-start gap-5 sm:gap-8">
                    <span
                      className={`tabular mt-1.5 text-[0.6875rem] font-medium tracking-[0.18em] transition-colors duration-300 ${
                        hovered === item.index ? "text-oxide" : "text-ink-mute"
                      }`}
                    >
                      {item.index}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-[1.375rem] font-light leading-snug text-ink transition-colors duration-300 ease-premium group-hover:text-oxide sm:text-[1.625rem]">
                        {item.title}
                      </h3>
                      <p className="measure mt-2.5 text-[0.9375rem] leading-[1.65] text-ink-soft">
                        {item.summary}
                      </p>
                      <p className="ledger-label mt-4">{item.meta}</p>
                    </div>

                    <ArrowUpRight
                      aria-hidden
                      className={`mt-1.5 h-4 w-4 flex-shrink-0 transition-[transform,color] duration-300 ease-premium ${
                        hovered === item.index
                          ? "translate-x-0.5 -translate-y-0.5 text-oxide"
                          : "text-ink-mute"
                      }`}
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
