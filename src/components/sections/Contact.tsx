import { useState, useEffect, useRef, FormEvent } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

interface ContactProps {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
}

type Fields = {
  name: string;
  email: string;
  company: string;
  context: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact({ formOpen, setFormOpen }: ContactProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <>
      <section
        ref={ref}
        id="contact"
        className="grain relative overflow-hidden bg-ink py-24 sm:py-30 lg:py-38"
      >
        <div className="shell relative z-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="reveal border-t border-white/15 pt-4">
                <span className="tabular text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white/45">
                  08 / Start here
                </span>
              </div>

              <h2 className="reveal reveal-d1 mt-8 max-w-[13ch] font-display text-[2.5rem] font-light leading-[1.04] tracking-[-0.02em] text-bone sm:text-[3.5rem] lg:text-[4.5rem]">
                Tell us where it stands.
              </h2>

              <p className="reveal reveal-d2 measure mt-7 text-[1.0625rem] leading-[1.7] text-white/60">
                Thirty minutes with a practice lead who has delivered your
                module in your industry. You leave with a written view of what
                is in front of you, whether or not you work with us.
              </p>

              <div className="reveal reveal-d3 mt-10">
                <button
                  onClick={() => setFormOpen(true)}
                  className="group inline-flex items-center gap-2.5 rounded-sm bg-oxide px-8 py-4 text-[0.9375rem] font-semibold text-bone transition-colors duration-300 ease-premium hover:bg-bone hover:text-ink active:translate-y-px"
                >
                  Book an assessment
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <dl className="reveal reveal-d2 border-t border-white/15">
                {[
                  ["Direct", "info@propelsaga.com", "mailto:info@propelsaga.com"],
                  ["Response", "Within one business day", null],
                  ["Coverage", "Americas, EMEA and APAC hours", null],
                  ["No obligation", "No sales sequence follows the call", null],
                ].map(([label, value, href]) => (
                  <div key={label as string} className="border-b border-white/15 py-5">
                    <dt className="ledger-label text-white/40">{label}</dt>
                    <dd className="mt-2 text-[1rem] text-bone">
                      {href ? (
                        <a
                          href={href as string}
                          className="-my-2 inline-flex min-h-[44px] items-center transition-colors duration-300 hover:text-oxide"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <ContactDialog open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}

function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    company: "",
    context: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const firstField = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;

      // Keep tab focus inside the dialog while it is open.
      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "Please tell us your name.";
    if (!fields.email.trim()) next.email = "We need an email to reply to.";
    else if (!EMAIL.test(fields.email.trim()))
      next.email = "That address does not look complete.";
    if (!fields.company.trim()) next.company = "Please add your company.";
    if (fields.context.trim().length < 12)
      next.context = "A sentence or two is enough to route this correctly.";
    return next;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      const firstKey = Object.keys(found)[0];
      panel.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      // TODO: point at the CRM or form endpoint before launch.
      // Until then the submission is held client side and nothing is sent.
      const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;
      if (!endpoint) throw new Error("No enquiry endpoint configured");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const reset = () => {
    setFields({ name: "", email: "", company: "", context: "" });
    setErrors({});
    setStatus("idle");
  };

  if (!open) return null;

  const field =
    "w-full border-b border-rule bg-transparent py-3 text-[1rem] text-ink outline-none transition-colors duration-300 ease-premium placeholder:text-ink-mute/70 focus:border-oxide";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panel}
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto border border-rule bg-surface p-7 sm:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="ledger-label">Assessment request</p>
            <h2
              id="enquiry-title"
              className="mt-3 font-display text-[1.75rem] font-light leading-tight text-ink sm:text-[2rem]"
            >
              {status === "sent" ? "Received." : "Thirty minutes, no sequence."}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 flex h-10 w-10 flex-shrink-0 items-center justify-center text-ink-mute transition-colors hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {status === "sent" ? (
          <div className="mt-8">
            <p className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-oxide" aria-hidden />
              A practice lead will reply within one business day. Nothing else
              is triggered by this form.
            </p>
            <button
              onClick={() => {
                reset();
                onClose();
              }}
              className="mt-8 w-full rounded-sm bg-ink py-3.5 text-[0.9375rem] font-semibold text-bone transition-colors duration-300 hover:bg-oxide"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-8 space-y-6">
            {(
              [
                ["name", "Name", "text", "Priya Ramanathan"],
                ["email", "Work email", "email", "you@company.com"],
                ["company", "Company", "text", "Company name"],
              ] as const
            ).map(([key, label, type, placeholder]) => (
              <div key={key}>
                <label htmlFor={key} className="ledger-label mb-1 block">
                  {label}
                </label>
                <input
                  ref={key === "name" ? firstField : undefined}
                  id={key}
                  name={key}
                  type={type}
                  autoComplete={
                    key === "email" ? "email" : key === "name" ? "name" : "organization"
                  }
                  value={fields[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={placeholder}
                  aria-invalid={Boolean(errors[key])}
                  aria-describedby={errors[key] ? `${key}-error` : undefined}
                  className={field}
                />
                {errors[key] && (
                  <p id={`${key}-error`} className="mt-2 text-[0.8125rem] text-destructive">
                    {errors[key]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="context" className="ledger-label mb-1 block">
                Where does it stand
              </label>
              <textarea
                id="context"
                name="context"
                rows={3}
                value={fields.context}
                onChange={(e) => set("context", e.target.value)}
                placeholder="Module, current stage, and what is blocking you."
                aria-invalid={Boolean(errors.context)}
                aria-describedby={errors.context ? "context-error" : undefined}
                className={`${field} resize-none`}
              />
              {errors.context && (
                <p id="context-error" className="mt-2 text-[0.8125rem] text-destructive">
                  {errors.context}
                </p>
              )}
            </div>

            {status === "failed" && (
              <p role="alert" className="text-[0.8125rem] leading-relaxed text-destructive">
                We could not send that. Email info@propelsaga.com and we will
                pick it up from there.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-sm bg-ink py-4 text-[0.9375rem] font-semibold text-bone transition-colors duration-300 ease-premium hover:bg-oxide disabled:opacity-60"
            >
              {status === "sending" ? "Sending" : "Request the assessment"}
            </button>

            <p className="text-[0.75rem] leading-relaxed text-ink-mute">
              We use this only to respond to your enquiry. No list, no
              sequence. See our{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
                privacy notice
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
