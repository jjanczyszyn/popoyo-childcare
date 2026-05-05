const steps = [
  {
    n: "1",
    title: "Tell us what you need",
    body: "Share your date, location, children's ages, schedule, and whether you need daytime care, date night, surf support, event care, or retreat childcare.",
  },
  {
    n: "2",
    title: "We match the right nanny",
    body: "We review the details manually and match you with a caregiver based on age experience, language, availability, and the type of care needed.",
  },
  {
    n: "3",
    title: "Confirm with a deposit",
    body: "Once the nanny and price are confirmed, a 50% deposit holds your booking.",
  },
  {
    n: "4",
    title: "Your nanny arrives",
    body: "Your nanny comes to your villa, hotel, or retreat space with a calm presence, clear communication, and age-appropriate care.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-ivory">
      <div className="container-prose">
        <div className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-espresso">
            Simple, personal, and confirmed by a real human.
          </h2>
        </div>
        <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl bg-sand/40 border border-espresso/10 p-6">
              <span className="font-serif text-3xl text-clayDeep">{s.n}</span>
              <h3 className="mt-3 text-lg text-espresso">{s.title}</h3>
              <p className="mt-2 text-sm text-espresso/75 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
