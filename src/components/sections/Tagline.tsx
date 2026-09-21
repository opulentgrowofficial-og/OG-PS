import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useReveal";

const LINE =
  "Seventy percent of ERP programmes miss their date. Almost none of them fail because of the software.";

/**
 * The tagline moment. Each word lifts from muted to full ink as the
 * section crosses the viewport, in reading order, scrubbed to scroll
 * position through rAF rather than a scroll listener doing layout work.
 */
export default function Tagline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  const words = LINE.split(" ");

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    let frame = 0;
    let ticking = false;

    const measure = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top hits 85% of the viewport,
      // 1 by the time it has travelled to 35%.
      const raw = (vh * 0.85 - rect.top) / (vh * 0.5);
      setProgress(Math.min(Math.max(raw, 0), 1));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="grain relative overflow-hidden border-b border-rule bg-bone-deep py-24 sm:py-30 lg:py-38"
      aria-label="Why programmes fail"
    >
      <div className="shell relative z-10">
        <p
          className="max-w-[17ch] font-display text-[2.25rem] font-light leading-[1.1] tracking-[-0.015em] sm:max-w-[20ch] sm:text-[3.25rem] lg:text-[4rem]"
          aria-label={LINE}
        >
          {words.map((word, i) => {
            // Each word gets its own slice of the scroll, plus a short ramp
            // so neighbours overlap instead of snapping one by one.
            const start = i / (words.length + 4);
            const lit = Math.min(Math.max((progress - start) * 6, 0), 1);
            return (
              <span key={`${word}-${i}`} aria-hidden>
                <span
                  style={{
                    color: `hsl(var(--ink) / ${0.22 + lit * 0.78})`,
                    transition: "color 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {word}
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </p>

        <p className="measure mt-10 border-t border-rule pt-6 text-[1.0625rem] leading-[1.7] text-ink-soft">
          They fail on data nobody cleaned, customisation nobody governed, and
          a partner who priced the discovery and guessed the rest. Those are
          the three things we engineer against.
        </p>
      </div>
    </section>
  );
}
