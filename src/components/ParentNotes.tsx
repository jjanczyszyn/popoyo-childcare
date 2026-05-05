const ratios = [
  ["Infants under 18 months", "1 nanny per 1–2 infants"],
  ["Toddlers 18 months – 3 years", "1 nanny per 2 children"],
  ["Ages 4 – 7", "1 nanny per 3 children"],
  ["Ages 8+", "1 nanny per 4 children"],
  ["Mixed-age groups", "Coordinator decides based on youngest child"],
  ["Water-adjacent care", "Stricter ratios required"],
  ["Events", "At least 2 nannies recommended"],
];

export default function ParentNotes() {
  return (
    <section className="py-20 bg-sand/40 border-y border-espresso/5">
      <div className="container-prose grid lg:grid-cols-2 gap-12">
        <div>
          <p className="eyebrow">Child-to-nanny ratios</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-espresso">
            Staffing built around your kids, not a default rule.
          </h2>
          <p className="mt-5 text-espresso/75 leading-relaxed max-w-prose">
            Final staffing is determined by Popoyo Childcare based on children's ages,
            environment, schedule, and safety needs. The numbers below are starting
            points, not promises — water-adjacent care, infants, and events shift them.
          </p>
        </div>

        <div className="rounded-2xl bg-ivory border border-espresso/10 overflow-hidden">
          <ul className="divide-y divide-espresso/10">
            {ratios.map(([k, v]) => (
              <li key={k} className="grid grid-cols-2 gap-4 px-5 py-3.5 text-sm">
                <span className="text-espresso/85">{k}</span>
                <span className="text-espresso/65 text-right">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
