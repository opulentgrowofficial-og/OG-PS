import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReveal } from "@/hooks/useReveal";
import SectionHead from "@/components/primitives/SectionHead";

/** Also the source for the FAQPage structured data in index.html. */
export const faqs = [
  {
    q: "Which Dynamics 365 modules do you work in?",
    a: "Business Central, Finance & Operations, Customer Engagement and the Power Platform, plus the Azure integration services around them. Our team holds over 350 active Microsoft certifications across those areas. We do not take work outside the Dynamics 365 estate, which is what keeps the bench specialised.",
  },
  {
    q: "How do you handle migration from a legacy system?",
    a: "A four cycle protocol: extract, cleanse, transform, validate. We run parallel validation against the source system and produce a reconciliation pack your auditors will accept. For regulated industries we offer a parallel running period. Migration is never a single pass. We iterate until your finance team signs off every balance.",
  },
  {
    q: "Can you supply consultants to our own partner practice?",
    a: "Yes. That is the Partner Acceleration Hub. We maintain a bench of certified functional consultants, developers and architects who can be deployed onto your client projects within two to four weeks, working under your brand on a white label agreement. We handle recruitment, certification and performance management.",
  },
  {
    q: "How do you price an engagement?",
    a: "Fixed price for defined scope such as implementations and migrations. Time and materials where the scope is genuinely evolving, such as team extension. Monthly retainer for managed services and Ledger Care. Every engagement begins with a statement of work that lists what is in scope and what is not, agreed before the build is priced.",
  },
  {
    q: "What happens if the scope changes mid programme?",
    a: "Change is priced and agreed before it enters a sprint, never discovered in an invoice afterwards. Phase 1 fit gap analysis exists specifically to make change rare. When it does happen, you see the cost and the schedule impact before deciding, and you can decline.",
  },
  {
    q: "How do you maintain quality across time zones?",
    a: "Three mechanisms. A standard delivery framework every consultant follows regardless of location. Delivery centres structured to hold four to six hours of daily overlap with your team. Continuous quality assurance, with code review, configuration audit and automated testing inside every sprint rather than at the end.",
  },
  {
    q: "Do you support Copilot in Dynamics 365?",
    a: "Yes, and we recommend planning for it during implementation rather than afterwards. Copilot in Business Central and Finance & Operations can carry real load in reporting, cash flow forecasting and inventory planning, but only on clean data and well defined processes. Retrofitting the data architecture after go live costs considerably more than building for it from the start.",
  },
  {
    q: "What does support look like after go live?",
    a: "Four to six weeks of embedded hypercare through your first month end close, then managed services in one of three tiers. Every tier includes release wave management: we evaluate, test and deploy Microsoft's twice yearly updates against your configuration so you adopt new capability without risking stability.",
  },
];

export default function Questions() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="faq" className="border-b border-rule bg-bone py-20 sm:py-24 lg:py-30">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHead
                index="07 / Questions"
                title={
                  <>
                    What buyers
                    <br />
                    actually ask.
                  </>
                }
                lede="Taken from real procurement conversations. If yours is not here, it is a good first question for the call."
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="reveal border-t border-rule">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`q-${i}`}
                  className="border-b border-rule"
                >
                  <AccordionTrigger className="gap-6 py-6 text-left text-[1.0625rem] font-normal leading-snug text-ink hover:text-oxide sm:text-[1.1875rem] [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-ink-mute">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="measure pb-7 text-[0.9375rem] leading-[1.75] text-ink-soft">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
