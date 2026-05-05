const useCases = [
  "Villa guest childcare",
  "Retreat session childcare",
  "Surf camp parent support",
  "Wedding kids' room",
  "Date night nanny referrals",
  "Spa + childcare packages",
  "Multi-day family nanny plans",
];

export default function Partners() {
  return (
    <section id="partners" className="py-24 bg-espresso text-ivory">
      <div className="container-prose grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="eyebrow text-clay">Partners</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-ivory leading-tight">
            Childcare support for villas, retreats, and events.
          </h2>
          <p className="mt-5 text-ivory/75 leading-relaxed max-w-prose">
            Partner with Popoyo Childcare to offer your guests a smoother family
            experience. We support villa managers, retreat leaders, wedding planners,
            surf camps, and boutique hotels with on-call nanny care, kids' corners, and
            customized childcare plans.
          </p>
          <a
            href="https://wa.me/50589750052?text=Hi%20Karen%2C%20I%27m%20interested%20in%20a%20Popoyo%20Childcare%20partnership."
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex btn-primary"
          >
            Partner with us
          </a>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3">
          {useCases.map((u) => (
            <li
              key={u}
              className="rounded-xl border border-ivory/10 bg-ivory/5 px-4 py-3 text-sm text-ivory/85"
            >
              {u}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
