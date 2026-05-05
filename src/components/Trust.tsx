const cards = [
  {
    title: "Vetted Nannies",
    body: "Each caregiver is screened through references, identity verification, experience review, and an in-person interview before joining the roster.",
  },
  {
    title: "Family-Fit Matching",
    body: "We match based on ages, energy level, schedule, language, infant experience, and whether the care is for a quiet evening, active daytime play, retreat support, or event care.",
  },
  {
    title: "Clear Safety Boundaries",
    body: "Pool and beach support is available, but nannies are not lifeguards. Ocean swimming, transportation, and off-property outings require explicit parent approval.",
  },
  {
    title: "Bilingual Support",
    body: "English / Spanish care can be requested. Availability depends on schedule and caregiver match.",
  },
  {
    title: "Manual Confirmation",
    body: "Booking requests are reviewed by a real coordinator before confirmation. Safer and more reliable than instant anonymous booking.",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="py-24 bg-ivory">
      <div className="container-prose">
        <div className="max-w-2xl">
          <p className="eyebrow">Trust & safety</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-espresso">
            Care you can actually relax into.
          </h2>
          <p className="mt-5 text-espresso/75 leading-relaxed">
            Traveling with children is beautiful, but it can also be logistically intense.
            Popoyo Childcare exists so parents do not have to rely on random referrals,
            last-minute group chats, or unclear arrangements. Every booking is matched
            manually with the right caregiver based on your child's age, needs, language
            preferences, location, and schedule.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div key={c.title} className="card">
              <h3 className="text-xl text-espresso">{c.title}</h3>
              <p className="mt-3 text-sm text-espresso/75 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
