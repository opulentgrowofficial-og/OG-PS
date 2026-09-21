import { Linkedin, Youtube } from "lucide-react";

const columns = [
  {
    heading: "Capabilities",
    links: [
      ["Global Development Centre", "/capabilities/global-development-centre"],
      ["Partner Acceleration Hub", "/capabilities/partner-acceleration-hub"],
      ["Turnkey project ownership", "/capabilities/turnkey-project-ownership"],
      ["Enterprise modernisation", "/capabilities/enterprise-modernisation"],
      ["Integration acceleration", "/capabilities/integration-acceleration"],
      ["Managed services", "/capabilities/managed-services"],
    ],
  },
  {
    heading: "Platforms",
    links: [
      ["Business Central", "/platforms/business-central"],
      ["Finance & Operations", "/platforms/finance-and-operations"],
      ["Customer Engagement", "/platforms/customer-engagement"],
      ["Power Platform", "/platforms/power-platform"],
    ],
  },
  {
    heading: "Company",
    links: [
      ["About", "/about"],
      ["Selected work", "/work"],
      ["Insights", "/insights"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-bone pt-20 sm:pt-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-display text-[1.375rem] font-normal tracking-[-0.02em] text-ink">
              PropelSaga
            </p>
            <p className="measure mt-4 text-[0.9375rem] leading-[1.7] text-ink-soft">
              A Microsoft Dynamics 365 delivery partner. Implementation,
              migration and managed services for Business Central, Finance
              &amp; Operations and the Power Platform.
            </p>

            <a
              href="mailto:info@propelsaga.com"
              className="mt-6 inline-flex min-h-[44px] items-center border-b border-ink/25 text-[0.9375rem] text-ink transition-colors duration-300 ease-premium hover:border-oxide hover:text-oxide"
            >
              info@propelsaga.com
            </a>

            <div className="mt-8 flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/propelsaga"
                aria-label="PropelSaga on LinkedIn"
                className="-m-3 flex h-11 w-11 items-center justify-center text-ink-mute transition-colors duration-300 hover:text-ink"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="https://www.youtube.com/@propelsaga"
                aria-label="PropelSaga on YouTube"
                className="-m-3 flex h-11 w-11 items-center justify-center text-ink-mute transition-colors duration-300 hover:text-ink"
              >
                <Youtube className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6 lg:gap-8">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="ledger-label border-t border-rule pt-4">{col.heading}</h2>
                <ul className="mt-3">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="-my-1 flex min-h-[44px] items-center text-[0.875rem] text-ink-soft transition-colors duration-300 ease-premium hover:text-oxide"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Oversized wordmark: the largest type on the page, as the closing note */}
        <div
          aria-hidden
          className="mt-20 select-none overflow-hidden border-t border-rule pt-8 sm:mt-24"
        >
          <p className="whitespace-nowrap font-display text-[16vw] font-light leading-[0.85] tracking-[-0.04em] text-ink/[0.07] lg:text-[13vw]">
            Your saga of success
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-rule py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular text-[0.8125rem] text-ink-mute">
            &copy; {new Date().getFullYear()} PropelSaga. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              ["Privacy", "/privacy"],
              ["Terms", "/terms"],
              ["Cookies", "/cookies"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="-my-2 inline-block py-2 text-[0.8125rem] text-ink-mute transition-colors duration-300 hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
