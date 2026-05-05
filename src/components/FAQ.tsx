import { useState } from "react";

const faqs = [
  { q: "Where do you come?", a: "Villas, hotels, Airbnbs, and retreats around Popoyo, Guasacate, and Tola." },
  { q: "Same-day booking?", a: "Sometimes. Depends on availability." },
  { q: "Babies?", a: "Yes, ages 3–18 months. Newborn care by request." },
  { q: "Pool or beach?", a: "Pool and beach support, yes. Nannies are not lifeguards. Ocean swimming requires parent approval." },
  { q: "Deposit?", a: "50% to confirm. Balance at the end of the booking." },
  { q: "Cancellation?", a: "Free more than 72 hours before. Less than 24 hours: deposit non-refundable." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 bg-ivory">
      <div className="container-prose">
        <p className="eyebrow">FAQ</p>
        <h2 className="mt-3 text-3xl text-espresso">Quick answers.</h2>

        <ul className="mt-8 divide-y divide-espresso/10 border-y border-espresso/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-4 text-left"
                >
                  <span className="text-base text-espresso font-serif">{f.q}</span>
                  <span className={`text-clayDeep text-xl leading-none transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && <p className="pb-5 pr-12 text-sm text-espresso/70">{f.a}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
