import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const suggestions = [
  ["Capabilities", "/capabilities"],
  ["Selected work", "/work"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
];

export default function NotFound() {
  const [, setFormOpen] = useState(false);

  return (
    <>
      <Navbar onOpenForm={() => setFormOpen(true)} />
      <main id="main" className="grain relative bg-bone">
        <div className="shell flex min-h-[70vh] flex-col justify-center py-24">
          <p className="tabular text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-mute">
            Error 404
          </p>

          <h1 className="mt-6 max-w-[16ch] font-display text-[2.5rem] font-light leading-[1.05] text-ink sm:text-[3.5rem] lg:text-[4.5rem]">
            This page is not in the ledger.
          </h1>

          <p className="measure mt-6 text-[1.0625rem] leading-[1.7] text-ink-soft">
            The address may have changed, or the page may have moved during the
            site rebuild. These are the places people usually want.
          </p>

          <ul className="mt-10 border-t border-rule sm:max-w-md">
            {suggestions.map(([label, href]) => (
              <li key={label} className="border-b border-rule">
                <a
                  href={href}
                  className="block py-4 font-display text-[1.25rem] font-light text-ink transition-colors duration-300 ease-premium hover:text-oxide"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/"
            className="group mt-10 inline-flex items-center gap-2 self-start border-b border-ink/25 pb-1 text-[0.9375rem] font-medium text-ink transition-colors duration-300 ease-premium hover:border-oxide hover:text-oxide"
          >
            <ArrowLeft
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:-translate-x-0.5"
            />
            Back to the homepage
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
