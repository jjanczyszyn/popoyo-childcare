const bullets = [
  "Nannies do not administer medication unless explicitly agreed in writing.",
  "Nannies do not drive children unless specifically arranged and approved.",
  "Parents must provide car seats when transport is involved.",
  "Ocean swimming is not included by default.",
  "Pool supervision is support care, not lifeguard service.",
  "Sick-child care is by request only.",
  "Nannies may decline unsafe conditions.",
  "A parent or guardian must be reachable by WhatsApp during the booking.",
];

export default function SafetyNotes() {
  return (
    <section id="safety" className="py-20 bg-ivory">
      <div className="container-prose grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">Important safety notes</p>
          <h2 className="mt-3 text-3xl text-espresso leading-tight">
            Honest about what care includes — and what it doesn't.
          </h2>
          <p className="mt-5 text-espresso/75 leading-relaxed">
            Popoyo Childcare provides attentive childcare and family support, but our
            nannies are not lifeguards, medical professionals, drivers, or emergency
            responders. Pool, beach, outing, and transport-related care must be
            discussed and approved in advance. Parents are responsible for providing
            accurate health, allergy, emergency, and access information before care
            begins.
          </p>
        </div>
        <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex gap-3 rounded-xl border border-espresso/10 bg-sand/30 p-4 text-sm text-espresso/85 leading-relaxed"
            >
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-clayDeep flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
