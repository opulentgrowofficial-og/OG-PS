import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, ArrowUpRight } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Capabilities",
    href: "/capabilities",
    children: [
      { label: "Global Development Centre", href: "/capabilities/global-development-centre" },
      { label: "Partner Acceleration Hub", href: "/capabilities/partner-acceleration-hub" },
      { label: "Turnkey project ownership", href: "/capabilities/turnkey-project-ownership" },
      { label: "Enterprise modernisation", href: "/capabilities/enterprise-modernisation" },
      { label: "Integration acceleration", href: "/capabilities/integration-acceleration" },
      { label: "Rapid deployment packages", href: "/capabilities/rapid-deployment" },
      { label: "Team extension", href: "/capabilities/team-extension" },
      { label: "Managed services", href: "/capabilities/managed-services" },
      { label: "Ledger Care", href: "/capabilities/ledger-care" },
    ],
  },
  {
    label: "Platforms",
    href: "/platforms",
    children: [
      { label: "Business Central", href: "/platforms/business-central" },
      { label: "Finance & Operations", href: "/platforms/finance-and-operations" },
      { label: "Customer Engagement", href: "/platforms/customer-engagement" },
      { label: "Power Platform", href: "/platforms/power-platform" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

interface NavbarProps {
  onOpenForm: () => void;
}

export default function Navbar({ onOpenForm }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the overlay, and give the sheet initial focus.
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bone"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-500 ease-premium ${
          scrolled
            ? "border-rule bg-bone/92 backdrop-blur-md"
            : "border-transparent bg-bone"
        }`}
      >
        <div className="shell flex h-18 items-center justify-between gap-8 lg:h-20">
          <a
            href="/"
            className="group -my-2 flex min-h-[44px] items-center gap-2.5 py-2"
            aria-label="PropelSaga, home"
          >
            <span className="font-display text-[1.375rem] font-normal tracking-[-0.02em] text-ink">
              PropelSaga
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-rule sm:block" />
            <span className="ledger-label hidden sm:block">Dynamics 365</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-[0.875rem] font-medium text-ink-soft transition-colors duration-300 ease-premium hover:text-ink"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      aria-hidden
                      className={`h-3 w-3 transition-transform duration-300 ease-premium ${
                        hovered === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>

                {item.children && hovered === item.label && (
                  <div className="absolute left-0 top-full w-[19rem] border border-rule bg-surface p-2 shadow-lift">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-[0.875rem] text-ink-soft transition-colors duration-200 ease-premium hover:bg-bone-deep hover:text-ink"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenForm}
              className="hidden rounded-sm bg-ink px-5 py-2.5 text-[0.875rem] font-semibold text-bone transition-colors duration-300 ease-premium hover:bg-oxide lg:inline-flex"
            >
              Start a conversation
            </button>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span aria-hidden className="flex w-6 flex-col gap-[5px]">
                <span className="h-px w-full bg-ink" />
                <span className="h-px w-full bg-ink" />
                <span className="h-px w-2/3 bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay: large display links, staggered in, submenus collapsed */}
      <div
        className={`fixed inset-0 z-[60] bg-ink transition-opacity duration-500 ease-premium lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="shell flex h-18 flex-shrink-0 items-center justify-between">
            <span className="font-display text-[1.375rem] text-bone">PropelSaga</span>
            <button
              ref={closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-bone"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav
            className="shell flex-1 overflow-y-auto pb-10 pt-4"
            aria-label="Mobile navigation"
          >
            <ul className="border-t border-white/10">
              {navigation.map((item, i) => {
                const expanded = openGroup === item.label;
                return (
                  <li
                    key={item.label}
                    className="border-b border-white/10"
                    style={{
                      transition: "opacity .5s var(--ease-premium), transform .5s var(--ease-premium)",
                      transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                      opacity: open ? 1 : 0,
                      transform: open ? "none" : "translateY(14px)",
                    }}
                  >
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setOpenGroup(expanded ? null : item.label)}
                          aria-expanded={expanded}
                          className="flex w-full items-center justify-between py-5 text-left"
                        >
                          <span className="font-display text-[1.75rem] font-light text-bone">
                            {item.label}
                          </span>
                          <ChevronDown
                            aria-hidden
                            className={`h-5 w-5 text-white/55 transition-transform duration-300 ease-premium ${
                              expanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {expanded && (
                          <ul className="pb-5">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-2.5 text-[0.9375rem] text-white/55 transition-colors duration-200 hover:text-bone"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-5 font-display text-[1.75rem] font-light text-bone"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <button
              onClick={() => {
                setOpen(false);
                onOpenForm();
              }}
              className="mt-10 flex w-full items-center justify-between rounded-sm bg-oxide px-6 py-4 text-left text-[0.9375rem] font-semibold text-bone"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </button>

            <a
              href="mailto:info@propelsaga.com"
              className="mt-6 block text-[0.9375rem] text-white/55 transition-colors hover:text-bone"
            >
              info@propelsaga.com
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
