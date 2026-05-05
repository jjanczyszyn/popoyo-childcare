const steps = [
  { n: "1", t: "Send a request", d: "Date, hours, kids, location." },
  { n: "2", t: "We confirm", d: "Karen replies on WhatsApp with price and nanny." },
  { n: "3", t: "50% deposit", d: "Holds the booking. Balance after the service." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 bg-ivory">
      <div className="container-prose">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 text-3xl text-espresso">Three steps.</h2>

        <ol className="mt-10 grid sm:grid-cols-3 gap-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl bg-sand/40 border border-espresso/10 p-6">
              <span className="font-serif text-3xl text-clayDeep">{s.n}</span>
              <p className="mt-2 font-serif text-xl text-espresso">{s.t}</p>
              <p className="mt-1 text-sm text-espresso/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
