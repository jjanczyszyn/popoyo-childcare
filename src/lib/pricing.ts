// Pricing engine for Popoyo Childcare. Pure, dependency-free, mirrored on the
// Convex side via convex/lib/pricing.ts. Numbers come from the spec and are
// the source of truth for the homepage estimate. Final price is always
// confirmed manually by the coordinator.

export type ServiceSlug =
  | "villa"
  | "surf"
  | "datenight"
  | "infant"
  | "pool"
  | "retreat"
  | "wedding"
  | "fullday"
  | "excursion"
  | "overnight";

export type AddOnSlug =
  | "craftBasic"
  | "craftPremium"
  | "spanish"
  | "meal"
  | "bedtime"
  | "lastMinute";

export interface PricingInput {
  service: ServiceSlug;
  children: number;       // 1+
  hours: number;          // 0+
  startHour: number;      // 0–23, local
  hasInfantUnder18mo: boolean;
  travelArea:
    | "popoyo"
    | "guasacate"
    | "santana"
    | "iguana"
    | "salinas"
    | "rancho"
    | "tola"
    | "other";
  isHoliday: boolean;
  isSameDay: boolean;
  addOns: AddOnSlug[];
  // for retreat/wedding "blocks":
  retreatHalfDay?: boolean; // false = full day
  weddingHours?: number;    // total event hours (>=4)
}

export interface PriceLine {
  label: string;
  amount: number;
  note?: string;
}

export interface PriceBreakdown {
  service: PriceLine;
  addOns: PriceLine[];
  modifiers: PriceLine[]; // late-night, holiday, last-minute, travel
  total: number;
  deposit: number;
  remaining: number;
  notes: string[];
}

export const SERVICES: Record<
  ServiceSlug,
  {
    name: string;
    description: string;
    minHours: number;
    label: string;
    startingFrom: string;
  }
> = {
  villa: {
    name: "Villa Babysitting",
    description:
      "A trusted nanny comes to your villa, hotel, or Airbnb for calm, attentive care.",
    minHours: 3,
    label: "Best for daytime care at your villa.",
    startingFrom: "$18/hr",
  },
  surf: {
    name: "Surf Session Care",
    description:
      "Designed for surf mornings and tide-window care. A nanny keeps children engaged nearby while parents paddle out.",
    minHours: 2.5,
    label: "Best for surf windows and quick parent freedom.",
    startingFrom: "$55/block",
  },
  datenight: {
    name: "Date Night Nanny",
    description:
      "Evening care for dinner, celebrations, sunset drinks, or adult time.",
    minHours: 4,
    label: "Best for dinner, birthdays, and late nights.",
    startingFrom: "$85",
  },
  infant: {
    name: "Infant Care",
    description:
      "Gentle, attentive care for babies and young toddlers (3–18 months).",
    minHours: 4,
    label: "Best for babies and very young toddlers.",
    startingFrom: "$24/hr",
  },
  pool: {
    name: "Pool & Beach Helper",
    description:
      "A second set of hands for pool days, beach hangs, villa lounging, or family gatherings.",
    minHours: 3,
    label: "Best when parents are nearby but need backup.",
    startingFrom: "$22/hr",
  },
  retreat: {
    name: "Retreat Childcare",
    description:
      "Childcare support for retreats, workshops, yoga mornings, coaching sessions, and group experiences.",
    minHours: 3,
    label: "Best for retreat leaders and group family stays.",
    startingFrom: "$140/block",
  },
  wedding: {
    name: "Wedding & Event Kids Care",
    description:
      "Calm, organized childcare for weddings, birthday dinners, villa events, and private celebrations.",
    minHours: 4,
    label: "Best for weddings, dinners, and group celebrations.",
    startingFrom: "$240/event",
  },
  fullday: {
    name: "Full-Day Family Nanny",
    description:
      "A full-day nanny for families who want continuity and ease.",
    minHours: 8,
    label: "Best for a full parent reset day.",
    startingFrom: "$145/day",
  },
  excursion: {
    name: "Travel & Excursion Helper",
    description:
      "A nanny joins your family for outings — restaurants, beach days, kid-friendly activities.",
    minHours: 4,
    label: "Best for outings, restaurants, and family logistics.",
    startingFrom: "$95/half-day",
  },
  overnight: {
    name: "Overnight Care",
    description:
      "Overnight care including bedtime support and quiet overnight supervision.",
    minHours: 11,
    label: "Best for weddings, late nights, and overnight peace of mind.",
    startingFrom: "$180/night",
  },
};

export const ADDONS: Record<AddOnSlug, { name: string; price: number; perHour?: false }> = {
  craftBasic: { name: "Craft & Activity Kit (basic)", price: 20 },
  craftPremium: { name: "Craft & Activity Kit (premium)", price: 40 },
  spanish: { name: "Spanish Play Session", price: 10 },
  meal: { name: "Child Meal Help", price: 10 },
  bedtime: { name: "Bedtime Routine Support", price: 10 },
  lastMinute: { name: "Last-Minute Booking Fee", price: 20 },
};

const TRAVEL_FEES: Record<PricingInput["travelArea"], number> = {
  popoyo: 0,
  guasacate: 0,
  santana: 5,
  iguana: 10,
  salinas: 15,
  rancho: 15,
  tola: 20,
  other: 25,
};

function clampMin(hours: number, min: number): number {
  return Math.max(hours, min);
}

function villaHourly(children: number): number {
  switch (children) {
    case 1: return 18;
    case 2: return 22;
    case 3: return 27;
    case 4: return 32;
    default: return 32 + (children - 4) * 8; // rough scale; "custom quote" recommended
  }
}

export function computePrice(input: PricingInput): PriceBreakdown {
  const notes: string[] = [];
  const modifiers: PriceLine[] = [];
  const addOns: PriceLine[] = [];

  const meta = SERVICES[input.service];
  const billedHours = clampMin(input.hours || meta.minHours, meta.minHours);
  let serviceLine: PriceLine;

  switch (input.service) {
    case "villa": {
      const rate = villaHourly(Math.max(1, input.children));
      const subtotal = rate * billedHours;
      serviceLine = {
        label: `${meta.name} · ${input.children} child${input.children === 1 ? "" : "ren"} × ${billedHours} hr`,
        amount: subtotal,
        note: `$${rate}/hr`,
      };
      if (input.children > 4) {
        notes.push("More than 4 children — a custom quote or additional nanny is required.");
      }
      break;
    }
    case "surf": {
      // base block is 2.5 hr for $55, +$10 per child over 2, +$18/hr extra time
      const extraChildren = Math.max(0, input.children - 2);
      const base = 55 + extraChildren * 10;
      const extraHours = Math.max(0, billedHours - 2.5);
      const subtotal = base + Math.round(extraHours * 18);
      serviceLine = {
        label: `${meta.name} · 2.5 hr block${extraChildren ? ` · +${extraChildren} child` : ""}${
          extraHours ? ` · +${extraHours.toFixed(1)} hr` : ""
        }`,
        amount: subtotal,
      };
      break;
    }
    case "datenight": {
      // $85 for 1–2 kids, +$22/hr after 4, +$12 per booking per extra child
      const minBlock = 85;
      const extraHours = Math.max(0, billedHours - 4);
      const extraChildren = Math.max(0, input.children - 2);
      const subtotal = minBlock + extraHours * 22 + extraChildren * 12;
      serviceLine = {
        label: `${meta.name} · ${billedHours} hr · ${input.children} child${input.children === 1 ? "" : "ren"}`,
        amount: subtotal,
      };
      // late-night surcharge (after 10pm)
      const endHour = (input.startHour + billedHours) % 24;
      const lateHours = lateNightOverlap(input.startHour, billedHours);
      if (lateHours > 0) {
        modifiers.push({
          label: `Late-night surcharge (after 10 PM)`,
          amount: Math.round(lateHours * 10),
          note: `${lateHours.toFixed(1)} hr × $10/hr`,
        });
        notes.push("Transport fee may apply after dark.");
      }
      void endHour;
      break;
    }
    case "infant": {
      const rate = 24;
      const subtotal = rate * billedHours;
      serviceLine = {
        label: `${meta.name} · ${input.children} infant${input.children === 1 ? "" : "s"} × ${billedHours} hr`,
        amount: subtotal,
        note: `$${rate}/hr`,
      };
      if (input.children >= 2) {
        notes.push("Twins or two children under age 2 may require a second caregiver — custom quote.");
      }
      break;
    }
    case "pool": {
      const baseRate = 22;
      const extraChildren = Math.max(0, input.children - 2);
      const rate = baseRate + extraChildren * 6;
      const subtotal = rate * billedHours;
      serviceLine = {
        label: `${meta.name} · ${input.children} child${input.children === 1 ? "" : "ren"} × ${billedHours} hr`,
        amount: subtotal,
        note: `$${rate}/hr`,
      };
      break;
    }
    case "retreat": {
      const half = input.retreatHalfDay !== false;
      const base = half ? 140 : 260;
      const overflowChildren = Math.max(0, input.children - 5);
      const extraChild = overflowChildren * (half ? 18 : 30);
      const subtotal = base + extraChild;
      serviceLine = {
        label: `${meta.name} · ${half ? "half-day (3 hr)" : "full-day (6 hr)"} · up to ${
          5 + overflowChildren
        } children`,
        amount: subtotal,
      };
      if (overflowChildren >= 4) {
        notes.push("Larger groups recommend an additional nanny (+$90 half / +$160 full).");
      }
      notes.push("Supplies fee ($20–$60) may apply depending on activities.");
      break;
    }
    case "wedding": {
      const eventHours = Math.max(4, input.weddingHours ?? 4);
      const base = 240; // 2 nannies, 4 hours, up to 8 kids
      const extraHours = Math.max(0, eventHours - 4);
      const subtotal = base + extraHours * 55;
      serviceLine = {
        label: `${meta.name} · ${eventHours} hr · 2 nannies · up to 8 kids`,
        amount: subtotal,
      };
      if (input.children > 8) {
        notes.push("Over 8 children — custom quote required.");
      }
      notes.push("Supplies fee ($30–$100) may apply depending on setup.");
      break;
    }
    case "fullday": {
      const dayBase = input.children <= 2 ? 145 : input.children === 3 ? 175 : 205;
      const extraHours = Math.max(0, billedHours - 8);
      const subtotal = dayBase + extraHours * 20;
      serviceLine = {
        label: `${meta.name} · ${billedHours} hr · ${input.children} child${input.children === 1 ? "" : "ren"}`,
        amount: subtotal,
      };
      notes.push("A meal break must be included for the nanny on full-day bookings.");
      break;
    }
    case "excursion": {
      const halfDay = billedHours <= 4;
      const subtotal = halfDay ? 95 : 180;
      serviceLine = {
        label: `${meta.name} · ${halfDay ? "half day (≤4 hr)" : "full day (≤8 hr)"}`,
        amount: subtotal,
      };
      notes.push("Parents cover nanny transport, meals, entry/tour fees. Car seats provided by family.");
      break;
    }
    case "overnight": {
      const base = 180; // 8pm–7am for 1–2 kids
      const extraChildren = Math.max(0, input.children - 2);
      const subtotal = base + extraChildren * 20;
      serviceLine = {
        label: `${meta.name} · 8 PM – 7 AM · ${input.children} child${input.children === 1 ? "" : "ren"}`,
        amount: subtotal,
      };
      notes.push(
        "Awake care after midnight is +$25/hr if the child is awake for extended periods.",
      );
      break;
    }
  }

  // Add-ons
  for (const slug of input.addOns) {
    const a = ADDONS[slug];
    if (!a) continue;
    addOns.push({ label: a.name, amount: a.price });
  }

  // Last-minute fee
  if (input.isSameDay && !input.addOns.includes("lastMinute")) {
    modifiers.push({ label: "Same-day booking fee", amount: 20 });
  }

  // Holiday surcharge (low end of range)
  if (input.isHoliday) {
    const surcharge = Math.round(serviceLine.amount * 0.25);
    modifiers.push({
      label: "Holiday / high-demand surcharge (+25%)",
      amount: surcharge,
      note: "Range is +25% to +100% depending on demand.",
    });
  }

  // Travel fee
  const travel = TRAVEL_FEES[input.travelArea];
  if (travel > 0) {
    modifiers.push({ label: "Travel fee estimate", amount: travel });
  }

  // Infant flag note
  if (input.hasInfantUnder18mo && input.service !== "infant") {
    notes.push(
      "An infant under 18 months is involved — final pricing/staffing may shift to Infant Care rates.",
    );
  }

  const total =
    serviceLine.amount +
    addOns.reduce((s, l) => s + l.amount, 0) +
    modifiers.reduce((s, l) => s + l.amount, 0);

  const deposit = Math.round((total * 50) / 100);
  const remaining = total - deposit;

  return {
    service: serviceLine,
    addOns,
    modifiers,
    total,
    deposit,
    remaining,
    notes,
  };
}

// Hours between (startHour) and (startHour + duration) that fall after 22:00.
// Wraps midnight. Used for date-night late-night surcharge.
function lateNightOverlap(startHour: number, duration: number): number {
  let late = 0;
  for (let i = 0; i < duration * 4; i++) {
    const t = (startHour + i / 4) % 24;
    // 22:00 to 06:00 counts
    if (t >= 22 || t < 6) late += 0.25;
  }
  return late;
}

export const TRAVEL_AREAS: { slug: PricingInput["travelArea"]; label: string }[] = [
  { slug: "popoyo", label: "Popoyo" },
  { slug: "guasacate", label: "Guasacate" },
  { slug: "santana", label: "Playa Santana" },
  { slug: "iguana", label: "Hacienda Iguana" },
  { slug: "salinas", label: "Las Salinas" },
  { slug: "rancho", label: "Rancho Santana" },
  { slug: "tola", label: "Tola" },
  { slug: "other", label: "Other / outside core area" },
];
