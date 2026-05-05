const packages = [
  { name: "The Surf Window", price: "$55", body: "2.5 hours of care for 1–2 children while parents surf." },
  { name: "The Date Night", price: "$85", body: "4 hours of evening care for 1–2 children." },
  { name: "The Full Parent Reset", price: "$145", body: "8 hours of care for 1–2 children." },
  { name: "The Retreat Kids Circle", price: "From $140", body: "3-hour structured childcare block for up to 5 children." },
  { name: "The Wedding Kids Corner", price: "From $240", body: "2 nannies, 4 hours, up to 8 children." },
];

export default function Packages() {
  return (
    <section className="py-20 bg-sand/30">
      <div className="container-prose">
        <div className="max-w-2xl">
          <p className="eyebrow">Suggested packages</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-espresso">
            Simple combinations parents ask for most.
          </h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {packages.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl bg-ivory border border-espresso/10 p-5 flex flex-col"
            >
              <p className="font-serif text-lg text-espresso">{p.name}</p>
              <p className="mt-2 text-2xl font-serif text-clayDeep">{p.price}</p>
              <p className="mt-3 text-sm text-espresso/75 leading-relaxed">{p.body}</p>
              <a
                href="#book"
                className="mt-auto pt-5 text-xs uppercase tracking-wider text-clayDeep hover:text-espresso"
              >
                Request →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
