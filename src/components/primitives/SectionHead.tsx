import { ReactNode } from "react";

interface SectionHeadProps {
  /** Ledger index, e.g. "02". The signature device, not an eyebrow label. */
  index: string;
  title: ReactNode;
  lede?: ReactNode;
  /** `ink` inverts for dark sections. */
  tone?: "bone" | "ink";
  align?: "left" | "wide";
  className?: string;
}

/**
 * Every section opens the same way: a hairline rule, a ledger index,
 * a serif heading, an optional lede. No eyebrow pills anywhere on the site.
 */
export default function SectionHead({
  index,
  title,
  lede,
  tone = "bone",
  align = "left",
  className = "",
}: SectionHeadProps) {
  const onInk = tone === "ink";

  return (
    <header className={className}>
      <div
        className={`reveal flex items-center gap-4 border-t pt-4 ${
          onInk ? "border-white/15" : "border-rule"
        }`}
      >
        <span
          className={`tabular text-[0.6875rem] uppercase tracking-[0.18em] font-medium ${
            onInk ? "text-white/55" : "text-ink-mute"
          }`}
        >
          {index}
        </span>
      </div>

      <h2
        className={`reveal reveal-d1 mt-6 font-display font-light ${
          align === "wide" ? "max-w-[20ch]" : "max-w-[16ch]"
        } text-[2.125rem] leading-[1.06] sm:text-5xl lg:text-[3.75rem] ${
          onInk ? "text-bone" : "text-ink"
        }`}
      >
        {title}
      </h2>

      {lede ? (
        <p
          className={`reveal reveal-d2 measure mt-6 text-[1.0625rem] leading-[1.65] ${
            onInk ? "text-white/70" : "text-ink-soft"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
