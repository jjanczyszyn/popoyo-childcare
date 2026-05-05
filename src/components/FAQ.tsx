import { useState } from "react";

const faqs = [
  {
    q: "Do you come to our villa or Airbnb?",
    a: "Yes. Nannies come to villas, hotels, Airbnbs, retreat spaces, and event locations around the Popoyo area.",
  },
  {
    q: "Can I book same day?",
    a: "Sometimes. Same-day bookings depend on availability and may include a last-minute fee.",
  },
  {
    q: "Do the nannies speak English?",
    a: "English-speaking and bilingual nannies can be requested. Availability depends on schedule and caregiver match.",
  },
  {
    q: "Can you care for babies?",
    a: "Yes, by request. Infant care has a higher rate and may require a specialized caregiver. Newborn care under 3 months is by request only.",
  },
  {
    q: "Can the nanny watch kids at the beach or pool?",
    a: "Yes, but with clear boundaries. Pool and beach support is available, but nannies are not lifeguards. Ocean swimming requires explicit parent approval and may require additional staffing.",
  },
  {
    q: "Can the nanny take my child off property?",
    a: "Only with written parent approval and a clear plan. Transport, car seats, meals, and entry fees are the family's responsibility.",
  },
  {
    q: "How many children can one nanny watch?",
    a: "It depends on age, environment, and needs. Younger children and water-adjacent settings require stricter ratios. Final staffing is confirmed manually.",
  },
  {
    q: "Can I book childcare for a retreat?",
    a: "Yes. Retreat childcare is available for half-day, full-day, and custom schedules.",
  },
  {
    q: "Can I book childcare for a wedding or private event?",
    a: "Yes. Event childcare can include a kids' room, activity table, bedtime support, or rotating supervision.",
  },
  {
    q: "What should I prepare?",
    a: "Please prepare snacks or meals, diapers/wipes if needed, pajamas for bedtime, comfort items, sunscreen, bug spray, emergency contacts, and any specific routines.",
  },
  {
    q: "Is a deposit required?",
    a: "Yes. A 50% deposit is required to confirm your booking.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations more than 72 hours in advance can be refunded or transferred. Later cancellations may lose the deposit or incur the booking minimum.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 bg-ivory">
      <div className="container-prose">
        <div className="max-w-2xl">
          <p className="eyebrow">Questions parents ask</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-espresso">
            Honest answers, no fine print.
          </h2>
        </div>
        <ul className="mt-10 divide-y divide-espresso/10 border-y border-espresso/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg text-espresso font-serif">{f.q}</span>
                  <span
                    className={`mt-1 text-clayDeep text-xl leading-none transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-6 pr-12 text-espresso/75 leading-relaxed">{f.a}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
