import { useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  computePrice,
  PriceBreakdown,
  ServiceSlug,
  SERVICES,
  TRAVEL_AREAS,
  TravelArea,
} from "../lib/pricing";

const WHATSAPP_DIGITS = "50589750052";
const CONVEX_ENABLED = Boolean(import.meta.env.VITE_CONVEX_URL);

export default function BookingForm() {
  const [service, setService] = useState<ServiceSlug>("daytime");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [hours, setHours] = useState<number>(SERVICES.daytime.minHours);
  const [kids, setKids] = useState(1);
  const [ages, setAges] = useState("");

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  const [property, setProperty] = useState("");
  const [area, setArea] = useState<TravelArea>("popoyo");
  const [location, setLocation] = useState("");
  const [poolBeach, setPoolBeach] = useState(false);
  const [notes, setNotes] = useState("");

  const submitMutation = useMutation(api.bookings.submit);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [code, setCode] = useState<string | null>(null);

  const breakdown: PriceBreakdown = useMemo(
    () => computePrice({ service, children: kids, hours }),
    [service, kids, hours],
  );

  function pickService(s: ServiceSlug) {
    setService(s);
    setHours(SERVICES[s].minHours);
  }

  function buildMessage(bookingCode?: string) {
    const lines = [
      bookingCode
        ? `Hi Karen, I just submitted booking ${bookingCode}.`
        : `Hi Karen, I'd like to book childcare.`,
      ``,
      `Service: ${SERVICES[service].name}`,
      `Date: ${date}  Time: ${startTime}  Hours: ${hours}`,
      `Children: ${kids}${ages ? ` (ages ${ages})` : ""}`,
      `Where: ${property}, ${TRAVEL_AREAS.find((a) => a.slug === area)?.label}`,
      `Map / address: ${location}`,
      poolBeach ? `Pool or beach involved.` : "",
      ``,
      `Name: ${name}`,
      `WhatsApp: ${whatsapp}`,
      email ? `Email: ${email}` : "",
      ``,
      breakdown.custom
        ? `Estimate: custom quote.`
        : `Estimate: $${breakdown.total} (50% deposit $${breakdown.deposit}).`,
      notes ? `Notes: ${notes}` : "",
      ``,
      `Thanks!`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !whatsapp || !date || !property || !location) {
      setState("error");
      return;
    }

    let bookingCode: string | undefined;

    if (CONVEX_ENABLED) {
      try {
        setState("saving");
        const childrenArr =
          ages.trim().length > 0
            ? ages.split(/[, ]+/).filter(Boolean).map((age) => ({
                nameOrNickname: "",
                age,
              }))
            : Array.from({ length: kids }, () => ({ nameOrNickname: "", age: "" }));

        const res = await submitMutation({
          serviceSlug: service,
          date,
          startTime,
          hours,
          flexibleTiming: false,
          isRecurring: "no" as const,
          isEventOrRetreat: service === "event",
          parentsOnSite: false,
          childrenLeaveProperty: false,
          poolOrBeach: poolBeach,
          parentName: name,
          parentWhatsapp: whatsapp,
          parentEmail: email,
          preferredLanguage: "either" as const,
          propertyName: property,
          area,
          locationDetail: location,
          children: childrenArr,
          emergencyContact: "",
          permitWhatsappContact: true,
          permitOffProperty: false,
          permitPool: poolBeach,
          permitBeach: poolBeach,
          permitOceanSwim: false,
          medications: false,
          addOns: [],
          estimateTotalUsd: breakdown.total,
          estimateDepositUsd: breakdown.deposit,
          estimateRemainingUsd: breakdown.remaining,
          estimateBreakdown: JSON.stringify(breakdown),
          notes: notes || undefined,
        });
        bookingCode = res.code;
        setCode(bookingCode ?? null);
        setState("saved");
      } catch (err) {
        console.error(err);
        setState("error");
      }
    }

    const text = encodeURIComponent(buildMessage(bookingCode));
    window.open(`https://wa.me/${WHATSAPP_DIGITS}?text=${text}`, "_blank");
  }

  return (
    <section id="book" className="py-20 bg-sand/30 border-y border-espresso/5">
      <div className="container-prose">
        <div className="max-w-xl">
          <p className="eyebrow">Book</p>
          <h2 className="mt-3 text-3xl text-espresso">Send a request.</h2>
          <p className="mt-3 text-sm text-espresso/65">
            Karen replies on WhatsApp with the price and the nanny.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 grid lg:grid-cols-3 gap-6 items-start"
        >
          <div className="lg:col-span-2 rounded-2xl bg-ivory border border-espresso/10 p-6 space-y-6">
            {/* Service */}
            <div>
              <Label>Service</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(SERVICES) as ServiceSlug[]).map((s) => {
                  const active = service === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => pickService(s)}
                      className={`rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                        active
                          ? "border-clay bg-clay/5 text-espresso"
                          : "border-espresso/15 text-espresso/75 hover:border-espresso/30"
                      }`}
                    >
                      <div className="font-medium">{SERVICES[s].name}</div>
                      <div className="text-xs text-espresso/55 mt-0.5">{SERVICES[s].startingFrom}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Field label="Date" full>
                <input
                  type="date"
                  className="input-base"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Field>
              <Field label="Time">
                <input
                  type="time"
                  className="input-base"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </Field>
              <Field label={`Hours (min ${SERVICES[service].minHours})`}>
                <input
                  type="number"
                  min={SERVICES[service].minHours}
                  step={0.5}
                  className="input-base"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value) || 0)}
                />
              </Field>
              <Field label="Kids">
                <input
                  type="number"
                  min={1}
                  className="input-base"
                  value={kids}
                  onChange={(e) => setKids(Math.max(1, Number(e.target.value) || 1))}
                />
              </Field>
              <Field label="Ages">
                <input
                  className="input-base"
                  placeholder="5, 3, 1"
                  value={ages}
                  onChange={(e) => setAges(e.target.value)}
                />
              </Field>
            </div>

            {/* Contact */}
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Your name">
                <input
                  className="input-base"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>
              <Field label="WhatsApp">
                <input
                  className="input-base"
                  placeholder="+1 ..."
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                />
              </Field>
              <Field label="Email (optional)">
                <input
                  type="email"
                  className="input-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
            </div>

            {/* Location */}
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Villa / hotel">
                <input
                  className="input-base"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  required
                />
              </Field>
              <Field label="Area">
                <select
                  className="input-base"
                  value={area}
                  onChange={(e) => setArea(e.target.value as TravelArea)}
                >
                  {TRAVEL_AREAS.map((a) => (
                    <option key={a.slug} value={a.slug}>{a.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Map link or address">
                <input
                  className="input-base"
                  placeholder="Google Maps link"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Field>
            </div>

            <label className="flex items-center gap-3 text-sm text-espresso/80 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-espresso/30 text-clay focus:ring-clay/30"
                checked={poolBeach}
                onChange={(e) => setPoolBeach(e.target.checked)}
              />
              Pool or beach involved
            </label>

            <Field label="Anything else (optional)">
              <textarea
                className="input-base min-h-[80px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Field>
          </div>

          {/* Estimate */}
          <aside className="lg:sticky lg:top-24 self-start rounded-2xl bg-ivory border border-espresso/10 p-6">
            <p className="eyebrow">Estimate</p>
            <p className="mt-2 font-serif text-2xl text-espresso">
              {SERVICES[service].name}
            </p>

            {breakdown.custom ? (
              <p className="mt-4 text-sm text-espresso/70">
                Custom quote — Karen replies with the price after seeing your details.
              </p>
            ) : (
              <>
                <p className="mt-1 text-sm text-espresso/65">{breakdown.service.label}</p>
                <div className="mt-5 pt-4 border-t border-espresso/10 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span>Estimated total</span>
                    <span className="font-medium">${breakdown.total}</span>
                  </div>
                  <div className="flex justify-between text-espresso/65">
                    <span>50% deposit</span>
                    <span>${breakdown.deposit}</span>
                  </div>
                </div>
              </>
            )}

            <p className="mt-4 text-xs text-espresso/55">
              Estimate only. Final price confirmed by Karen.
            </p>

            <button type="submit" className="mt-5 w-full btn-primary">
              {CONVEX_ENABLED ? "Send & open WhatsApp" : "Open WhatsApp"}
            </button>
            <a
              href="https://wa.me/50589750052"
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-full btn-secondary"
            >
              Or message Karen
            </a>

            {state === "saving" && <p className="mt-3 text-xs text-espresso/55">Saving…</p>}
            {state === "saved" && code && (
              <p className="mt-3 text-xs text-sageDeep">Saved as <strong>{code}</strong>.</p>
            )}
            {state === "error" && (
              <p className="mt-3 text-xs text-clayDeep">
                Please fill name, WhatsApp, date, villa, and map link.
              </p>
            )}
          </aside>
        </form>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="label-base">{children}</span>;
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "col-span-2 sm:col-span-1" : ""}`}>
      <Label>{label}</Label>
      {children}
    </label>
  );
}
