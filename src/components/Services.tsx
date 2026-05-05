type Service = {
  name: string;
  useCase: string;
  description: string;
  pricing: string[];
  label: string;
  note?: string;
};

const services: Service[] = [
  {
    name: "1. Villa Babysitting",
    useCase: "Daytime care while parents rest, work, or take a spa appointment.",
    description:
      "A trusted nanny comes to your villa, hotel, or Airbnb for calm, attentive care. Perfect for a few hours of quiet time, remote work, spa treatments, or low-key daytime support.",
    pricing: [
      "1 child · $18/hr",
      "2 children · $22/hr",
      "3 children · $27/hr",
      "4 children · $32/hr",
      "3-hour minimum",
      "More than 4 children: custom quote or extra nanny",
    ],
    label: "Best for daytime care at your villa.",
  },
  {
    name: "2. Surf Session Care",
    useCase: "Surf mornings and tide-window care.",
    description:
      "Designed for surf mornings and tide-window care. A nanny keeps children engaged nearby while parents paddle out, take a lesson, or enjoy time in the water.",
    pricing: [
      "2.5-hour surf block · $55 for 1–2 children",
      "Additional child: +$10",
      "Extra time: $18/hr",
      "Pool/beach by parent-approved safety notes",
      "Ocean swimming not included unless approved & quoted",
    ],
    label: "Best for surf windows and quick parent freedom.",
  },
  {
    name: "3. Date Night Nanny",
    useCase: "Dinner, drinks, events, or a late evening out.",
    description:
      "Evening care for dinner, celebrations, sunset drinks, or adult time. The nanny helps with play, dinner routine, bedtime, and quiet supervision while parents are out.",
    pricing: [
      "4-hour minimum · $85 for 1–2 children",
      "Extra hour: $22/hr",
      "Additional child: +$12 per booking",
      "Late-night fee after 10 PM: +$10/hr",
      "Transport fee may apply after dark",
    ],
    label: "Best for dinner, birthdays, and late nights.",
  },
  {
    name: "4. Infant Care",
    useCase: "Babies and very young toddlers needing specialized care.",
    description:
      "Gentle, attentive care for babies and young toddlers. Best for parents who need rest, a massage, a surf session, or a date while their baby's feeding, nap, diapering, and comfort routines are followed closely.",
    pricing: [
      "3–18 months · $24/hr",
      "4-hour minimum",
      "Twins / 2 under 2: custom quote or second caregiver",
      "Parent provides feeding instructions, supplies, sleep prefs",
    ],
    label: "Best for babies and very young toddlers.",
    note: "Newborn care under 3 months is by request only and requires a specialized caregiver.",
  },
  {
    name: "5. Pool & Beach Helper",
    useCase: "Extra hands when parents are present.",
    description:
      "A second set of hands for pool days, beach hangs, villa lounging, or family gatherings. This is not lifeguard service — it's attentive support so parents are not carrying the whole logistics load alone.",
    pricing: [
      "$22/hr for 1–2 children",
      "Additional child: +$6/hr",
      "3-hour minimum",
      "Ocean care by approval only · nanny is not a lifeguard",
    ],
    label: "Best when parents are nearby but need backup.",
  },
  {
    name: "6. Retreat Childcare",
    useCase: "Workshops, yoga, coaching, ceremonies, or meals.",
    description:
      "Childcare support for retreats, workshops, yoga mornings, coaching sessions, and group experiences. We create a soft structure with play, art, story time, movement, snacks, and rest.",
    pricing: [
      "Half-day (3 hr): from $140 for up to 5 children",
      "Full-day (6 hr): from $260 for up to 5 children",
      "Additional child: +$18 half / +$30 full",
      "Additional nanny: +$90 half / +$160 full",
      "Supplies fee: $20–$60",
    ],
    label: "Best for retreat leaders and group family stays.",
    note: "Custom quote required for children under 3, high counts, or water-adjacent settings.",
  },
  {
    name: "7. Wedding & Event Kids Care",
    useCase: "Weddings, birthday dinners, villa events, group celebrations.",
    description:
      "Calm, organized childcare for weddings, birthday dinners, villa events, and private celebrations. The team can create a kids' corner, quiet room, activity table, bedtime support, or rotating supervision plan.",
    pricing: [
      "From $240 · 2 nannies · 4 hr · up to 8 kids",
      "Extra hour: $55/hr for 2 nannies",
      "Additional nanny: +$100 for 4 hr",
      "Supplies fee: $30–$100",
    ],
    label: "Best for weddings, dinners, and group celebrations.",
    note: "Custom quote required for over 8 children, babies, swimming, transport, or late-night care.",
  },
  {
    name: "8. Full-Day Family Nanny",
    useCase: "Continuity and ease for a full day.",
    description:
      "A full-day nanny for families who want continuity and ease. Ideal for longer villa stays, remote work days, surf-heavy days, or parents who want a real reset.",
    pricing: [
      "8-hour day: $145 for 1–2 children",
      "3 children: $175",
      "4 children: $205",
      "Extra hour: $20/hr",
      "Meal break for the nanny is included",
    ],
    label: "Best for a full parent reset day.",
  },
  {
    name: "9. Travel & Excursion Helper",
    useCase: "Restaurants, family beach days, kid-friendly outings.",
    description:
      "A nanny joins your family for an outing to help with transitions, snacks, bathroom trips, attention, and tired-child moments. Especially helpful when parents are navigating a new place.",
    pricing: [
      "Half day · up to 4 hr: $95",
      "Full day · up to 8 hr: $180",
      "Parents cover transport, meals, entry/tour fees",
      "Off-property care requires written approval & itinerary",
      "Car seats provided by family when needed",
    ],
    label: "Best for outings, restaurants, and family logistics.",
  },
  {
    name: "10. Overnight Care",
    useCase: "Late events, weddings, ceremonies, overnight support.",
    description:
      "Overnight care for families who need a trusted adult present while children sleep. Includes bedtime support and quiet overnight supervision.",
    pricing: [
      "8 PM – 7 AM: from $180 for 1–2 children",
      "Awake care after midnight: +$25/hr",
      "Additional child: +$20",
      "Infant overnight: custom quote",
      "Sleeping arrangement provided by parent",
    ],
    label: "Best for weddings, late nights, and overnight peace of mind.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-sand/50 border-y border-espresso/5">
      <div className="container-prose">
        <div className="max-w-2xl">
          <p className="eyebrow">Service menu</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-espresso">
            Care, matched to the moment.
          </h2>
          <p className="mt-5 text-espresso/75 leading-relaxed">
            Pricing is shown in USD. Minimum bookings apply. Final pricing and nanny match
            are confirmed manually after we review your request.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <article
              key={s.name}
              className="rounded-2xl bg-ivory border border-espresso/10 p-7 flex flex-col"
            >
              <p className="eyebrow">{s.useCase}</p>
              <h3 className="mt-2 text-2xl text-espresso">{s.name}</h3>
              <p className="mt-3 text-sm text-espresso/75 leading-relaxed">
                {s.description}
              </p>
              <ul className="mt-5 space-y-1.5 text-sm text-espresso/85">
                {s.pricing.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-clayDeep">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              {s.note && (
                <p className="mt-4 text-xs italic text-espresso/65 border-l-2 border-clay/40 pl-3">
                  {s.note}
                </p>
              )}
              <p className="mt-6 text-xs uppercase tracking-wider text-clayDeep">
                {s.label}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-espresso/65 max-w-prose">
          Final staffing is determined by Popoyo Childcare based on children's ages,
          environment, schedule, and safety needs. Travel fees may apply depending on
          exact villa, hotel, road conditions, time of day, and nanny availability.
        </p>
      </div>
    </section>
  );
}
