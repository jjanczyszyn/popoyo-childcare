const rows = [
  ["Villa Babysitting", "$18/hr", "3 hrs"],
  ["Surf Session Care", "$55/block", "2.5 hrs"],
  ["Date Night Nanny", "$85", "4 hrs"],
  ["Infant Care", "$24/hr", "4 hrs"],
  ["Pool & Beach Helper", "$22/hr", "3 hrs"],
  ["Full-Day Family Nanny", "$145/day", "8 hrs"],
  ["Retreat Childcare", "$140/block", "3 hrs"],
  ["Wedding & Event Care", "$240/event", "4 hrs"],
  ["Travel & Excursion Helper", "$95/half-day", "4 hrs"],
  ["Overnight Care", "$180/night", "11 hrs"],
];

const addons = [
  ["Craft & Activity Kit (basic)", "$20"],
  ["Craft & Activity Kit (premium)", "$40"],
  ["Spanish Play Session", "+$10 / booking"],
  ["Child Meal Help", "+$10 / booking"],
  ["Bedtime Routine Support", "+$10 / booking"],
  ["Last-Minute Booking Fee", "+$20"],
  ["Holiday / High-Demand Fee", "+25% to +100%"],
  ["Travel Fee", "$0 – $25"],
];

export default function PricingTable() {
  return (
    <section id="pricing" className="py-24 bg-ivory">
      <div className="container-prose">
        <div className="max-w-2xl">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-espresso">
            Transparent rates, manually confirmed.
          </h2>
          <p className="mt-5 text-espresso/75 leading-relaxed">
            All prices in USD. Minimums apply. Final price is confirmed by a coordinator
            after reviewing your request — every booking is matched, not auto-assigned.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-2xl border border-espresso/10 bg-ivory overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-sand/60 text-espresso">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Service</th>
                  <th className="text-right font-medium px-5 py-3">Starting price</th>
                  <th className="text-right font-medium px-5 py-3">Minimum</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, price, min]) => (
                  <tr key={name} className="border-t border-espresso/10">
                    <td className="px-5 py-3 text-espresso">{name}</td>
                    <td className="px-5 py-3 text-right text-espresso/85 font-medium">{price}</td>
                    <td className="px-5 py-3 text-right text-espresso/65">{min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="rounded-2xl border border-espresso/10 bg-sand/40 p-6">
            <h3 className="text-lg text-espresso">Add-ons & fees</h3>
            <ul className="mt-4 space-y-2 text-sm text-espresso/80">
              {addons.map(([name, price]) => (
                <li key={name} className="flex justify-between gap-4 border-b border-espresso/5 pb-2">
                  <span>{name}</span>
                  <span className="text-espresso/65">{price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs italic text-espresso/65">
              Holiday surcharge applies to Christmas, New Year's, Semana Santa, major
              holidays, weddings, and peak retreat weekends.
            </p>
          </aside>
        </div>

        <div className="mt-8 rounded-xl border border-clay/30 bg-clay/5 p-5 text-sm text-espresso/80 max-w-prose">
          <strong className="text-espresso">A note on pricing.</strong> Popoyo Childcare
          is a premium mobile childcare concierge — vetted nannies, manual matching, and
          coordination support. Local domestic-help rates do not apply. Pricing supports
          fair pay above informal rates, transport, vetting, and reliability.
        </div>
      </div>
    </section>
  );
}
