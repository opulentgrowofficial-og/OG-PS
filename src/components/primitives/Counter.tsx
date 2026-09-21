import { useState, useCallback } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "@/hooks/useReveal";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up once, on first view. Tabular figures so the width never
 * jitters while the number climbs.
 */
export default function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1600,
  className = "",
}: CounterProps) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  const start = useCallback(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(to * ease(p)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, duration, reduced]);

  const ref = useInViewOnce<HTMLSpanElement>(start, 0.5);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
