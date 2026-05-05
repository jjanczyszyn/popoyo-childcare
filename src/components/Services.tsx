import { SERVICES, ServiceSlug } from "../lib/pricing";

const order: ServiceSlug[] = ["daytime", "datenight", "surf", "fullday", "infant", "event"];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-sand/40 border-y border-espresso/5">
      <div className="container-prose">
        <div className="max-w-xl">
          <p className="eyebrow">Services</p>
          <h2 className="mt-3 text-3xl text-espresso">Six ways to book.</h2>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {order.map((slug) => {
            const s = SERVICES[slug];
            return (
              <a
                href="#book"
                key={slug}
                className="rounded-2xl bg-ivory border border-espresso/10 p-6 hover:border-clay/40 transition"
              >
                <p className="font-serif text-xl text-espresso">{s.name}</p>
                <p className="mt-1 text-sm text-espresso/65">{s.short}</p>
                <p className="mt-5 font-serif text-2xl text-clayDeep">{s.startingFrom}</p>
                <p className="mt-1 text-xs text-espresso/55">
                  {s.minHours} hr min
                </p>
              </a>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-espresso/55">
          USD. Final price confirmed by Karen.
        </p>
      </div>
    </section>
  );
}
