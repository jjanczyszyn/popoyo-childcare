// Minimal pricing engine. 6 services, no add-ons.
// Final price is always confirmed manually by Karen — this is just an estimate.

export type ServiceSlug =
  | "daytime"
  | "datenight"
  | "surf"
  | "fullday"
  | "infant"
  | "event";

export interface PricingInput {
  service: ServiceSlug;
  children: number;
  hours: number;
}

export interface PriceLine {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  service: PriceLine;
  total: number;
  deposit: number;
  remaining: number;
  custom: boolean; // true for "request a quote" services
}

export const SERVICES: Record<
  ServiceSlug,
  {
    name: string;
    short: string;
    minHours: number;
    startingFrom: string;
  }
> = {
  daytime:   { name: "Daytime Care",      short: "Villa, pool, or beach.",       minHours: 3,  startingFrom: "$22/hr" },
  datenight: { name: "Date Night",        short: "Dinner, drinks, late nights.", minHours: 4,  startingFrom: "$85"     },
  surf:      { name: "Surf Block",        short: "2.5 hr while you paddle out.", minHours: 2.5, startingFrom: "$55"    },
  fullday:   { name: "Full Day",          short: "8 hours, full reset.",         minHours: 8,  startingFrom: "$145"    },
  infant:    { name: "Infant Care",       short: "Babies and toddlers under 2.", minHours: 4,  startingFrom: "$24/hr"  },
  event:     { name: "Events & Retreats", short: "Weddings, retreats, groups.",  minHours: 4,  startingFrom: "From $140" },
};

export function computePrice(input: PricingInput): PriceBreakdown {
  const meta = SERVICES[input.service];
  const hours = Math.max(input.hours || meta.minHours, meta.minHours);
  const kids = Math.max(1, input.children);

  if (input.service === "event") {
    return {
      service: { label: "Events & Retreats — custom quote", amount: 0 },
      total: 0,
      deposit: 0,
      remaining: 0,
      custom: true,
    };
  }

  let amount = 0;
  let label = "";

  switch (input.service) {
    case "daytime": {
      const rate = 22 + Math.max(0, kids - 2) * 6;
      amount = rate * hours;
      label = `${meta.name} · ${kids} child${kids === 1 ? "" : "ren"} × ${hours} hr`;
      break;
    }
    case "datenight": {
      const extraHours = Math.max(0, hours - 4);
      const extraKids = Math.max(0, kids - 2);
      amount = 85 + extraHours * 22 + extraKids * 12;
      label = `${meta.name} · ${hours} hr · ${kids} child${kids === 1 ? "" : "ren"}`;
      break;
    }
    case "surf": {
      const extraHours = Math.max(0, hours - 2.5);
      const extraKids = Math.max(0, kids - 2);
      amount = 55 + extraKids * 10 + Math.round(extraHours * 18);
      label = `${meta.name} · 2.5 hr block`;
      break;
    }
    case "fullday": {
      const day = kids <= 2 ? 145 : kids === 3 ? 175 : 205;
      const extraHours = Math.max(0, hours - 8);
      amount = day + extraHours * 20;
      label = `${meta.name} · ${kids} child${kids === 1 ? "" : "ren"}`;
      break;
    }
    case "infant": {
      amount = 24 * hours;
      label = `${meta.name} · ${hours} hr`;
      break;
    }
  }

  amount = Math.round(amount);
  const deposit = Math.round(amount * 0.5);
  return {
    service: { label, amount },
    total: amount,
    deposit,
    remaining: amount - deposit,
    custom: false,
  };
}

export const TRAVEL_AREAS = [
  { slug: "popoyo", label: "Popoyo" },
  { slug: "guasacate", label: "Guasacate" },
  { slug: "santana", label: "Playa Santana" },
  { slug: "iguana", label: "Hacienda Iguana" },
  { slug: "salinas", label: "Las Salinas" },
  { slug: "rancho", label: "Rancho Santana" },
  { slug: "tola", label: "Tola" },
  { slug: "other", label: "Other" },
] as const;

export type TravelArea = typeof TRAVEL_AREAS[number]["slug"];
