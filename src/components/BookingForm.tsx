import { useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  ADDONS,
  AddOnSlug,
  computePrice,
  PriceBreakdown,
  ServiceSlug,
  SERVICES,
  TRAVEL_AREAS,
} from "../lib/pricing";

const WHATSAPP_E164_DIGITS = "50589750052";
const OWNER = "Karen";
const CONVEX_ENABLED = Boolean(import.meta.env.VITE_CONVEX_URL);

type Child = {
  nameOrNickname: string;
  age: string;
  language: string;
  allergies: string;
  medicalNotes: string;
  specialNeeds: string;
  napSchedule: string;
  feedingNotes: string;
  comfortObjects: string;
  screenTimeRules: string;
  swimAbility: string;
  personalityNotes: string;
};

const emptyChild: Child = {
  nameOrNickname: "",
  age: "",
  language: "",
  allergies: "",
  medicalNotes: "",
  specialNeeds: "",
  napSchedule: "",
  feedingNotes: "",
  comfortObjects: "",
  screenTimeRules: "",
  swimAbility: "",
  personalityNotes: "",
};

export default function BookingForm() {
  // service / schedule
  const [service, setService] = useState<ServiceSlug>("villa");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [hours, setHours] = useState<number>(SERVICES.villa.minHours);
  const [flexibleTiming, setFlexibleTiming] = useState(false);
  const [isRecurring, setIsRecurring] = useState<"no" | "daily" | "weekly" | "custom">("no");
  const [isEventOrRetreat, setIsEventOrRetreat] = useState(false);
  const [parentsOnSite, setParentsOnSite] = useState(false);
  const [childrenLeaveProperty, setChildrenLeaveProperty] = useState(false);
  const [poolOrBeach, setPoolOrBeach] = useState(false);
  const [retreatHalfDay, setRetreatHalfDay] = useState(true);
  const [weddingHours, setWeddingHours] = useState(4);

  // parent
  const [parentName, setParentName] = useState("");
  const [parentWhatsapp, setParentWhatsapp] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<"english" | "spanish" | "either">("english");

  // location
  const [propertyName, setPropertyName] = useState("");
  const [area, setArea] = useState<typeof TRAVEL_AREAS[number]["slug"]>("popoyo");
  const [locationDetail, setLocationDetail] = useState("");
  const [accessNotes, setAccessNotes] = useState("");
  const [parkingNotes, setParkingNotes] = useState("");
  const [gateNotes, setGateNotes] = useState("");

  // children
  const [children, setChildren] = useState<Child[]>([{ ...emptyChild }]);

  // safety
  const [emergencyContact, setEmergencyContact] = useState("");
  const [localContact, setLocalContact] = useState("");
  const [doctorPreference, setDoctorPreference] = useState("");
  const [permitWhatsappContact, setPermitWhatsappContact] = useState(true);
  const [permitOffProperty, setPermitOffProperty] = useState(false);
  const [permitPool, setPermitPool] = useState(false);
  const [permitBeach, setPermitBeach] = useState(false);
  const [permitOceanSwim, setPermitOceanSwim] = useState(false);
  const [medications, setMedications] = useState(false);
  const [medicationInstructions, setMedicationInstructions] = useState("");

  // add-ons & misc
  const [addOns, setAddOns] = useState<AddOnSlug[]>([]);
  const [isHoliday, setIsHoliday] = useState(false);
  const [isSameDay, setIsSameDay] = useState(false);
  const [notes, setNotes] = useState("");

  const submitMutation = useMutation(api.bookings.submit);
  const [submitState, setSubmitState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const childCount = children.length;
  const hasInfant = children.some((c) => {
    const n = parseFloat(c.age);
    return !Number.isNaN(n) && n < 1.5;
  });

  const breakdown: PriceBreakdown = useMemo(() => {
    const startHourNum = parseInt(startTime.split(":")[0] ?? "9", 10) || 9;
    return computePrice({
      service,
      children: childCount,
      hours,
      startHour: startHourNum,
      hasInfantUnder18mo: hasInfant,
      travelArea: area,
      isHoliday,
      isSameDay,
      addOns,
      retreatHalfDay,
      weddingHours,
    });
  }, [service, childCount, hours, startTime, hasInfant, area, isHoliday, isSameDay, addOns, retreatHalfDay, weddingHours]);

  function setHoursForService(s: ServiceSlug) {
    setHours(SERVICES[s].minHours);
  }

  function updateChild(idx: number, patch: Partial<Child>) {
    setChildren((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  }
  function addChild() {
    setChildren((prev) => [...prev, { ...emptyChild }]);
  }
  function removeChild(idx: number) {
    setChildren((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)));
  }

  function toggleAddOn(slug: AddOnSlug) {
    setAddOns((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  function buildWhatsappMessage(code?: string) {
    const childLines = children
      .map((c, i) => {
        const parts = [
          `${i + 1}) ${c.nameOrNickname || "—"} (age ${c.age || "?"})`,
        ];
        if (c.allergies) parts.push(`allergies: ${c.allergies}`);
        if (c.medicalNotes) parts.push(`medical: ${c.medicalNotes}`);
        if (c.napSchedule) parts.push(`nap: ${c.napSchedule}`);
        return parts.join(" · ");
      })
      .join("\n");

    const addOnLine =
      addOns.length === 0 ? "none" : addOns.map((s) => ADDONS[s].name).join(", ");

    const lines = [
      code
        ? `Hi ${OWNER}, I just submitted booking ${code}.`
        : `Hi ${OWNER}, I'd like to request childcare.`,
      ``,
      `Service: ${SERVICES[service].name}`,
      `Date: ${date || "TBD"}  Start: ${startTime}  Hours: ${hours}${flexibleTiming ? " (flexible)" : ""}`,
      isRecurring !== "no" ? `Recurring: ${isRecurring}` : "",
      `Children: ${childCount}`,
      childLines,
      ``,
      `Property: ${propertyName} · ${TRAVEL_AREAS.find((a) => a.slug === area)?.label}`,
      `Location: ${locationDetail}`,
      accessNotes ? `Access: ${accessNotes}` : "",
      gateNotes ? `Gate: ${gateNotes}` : "",
      parkingNotes ? `Parking: ${parkingNotes}` : "",
      ``,
      `Parent: ${parentName} · ${parentWhatsapp}${parentEmail ? ` · ${parentEmail}` : ""}`,
      `Language: ${preferredLanguage}`,
      `Emergency contact: ${emergencyContact || "—"}`,
      ``,
      `On-site: ${parentsOnSite ? "yes" : "no"}  ·  Off-property: ${permitOffProperty ? "yes" : "no"}`,
      `Pool: ${permitPool ? "yes" : "no"}  Beach: ${permitBeach ? "yes" : "no"}  Ocean swim: ${permitOceanSwim ? "yes" : "no"}`,
      medications ? `Medications: ${medicationInstructions || "yes — see notes"}` : "",
      ``,
      `Add-ons: ${addOnLine}`,
      isHoliday ? "Holiday / high-demand date." : "",
      isSameDay ? "Same-day booking." : "",
      ``,
      `Estimated total: $${breakdown.total} (50% deposit $${breakdown.deposit})`,
      notes ? `Notes: ${notes}` : "",
      ``,
      "Waiting for your confirmation. Thank you!",
    ]
      .filter(Boolean)
      .join("\n");
    return lines;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!parentName || !parentWhatsapp || !date || !propertyName || !locationDetail) {
      setSubmitState("error");
      return;
    }

    let code: string | undefined;

    if (CONVEX_ENABLED) {
      try {
        setSubmitState("saving");
        const res = await submitMutation({
          serviceSlug: service,
          date,
          startTime,
          hours,
          flexibleTiming,
          isRecurring,
          isEventOrRetreat,
          parentsOnSite,
          childrenLeaveProperty,
          poolOrBeach,
          parentName,
          parentWhatsapp,
          parentEmail,
          preferredLanguage,
          propertyName,
          area,
          locationDetail,
          accessNotes: accessNotes || undefined,
          parkingNotes: parkingNotes || undefined,
          gateNotes: gateNotes || undefined,
          children: children.map((c) => ({
            nameOrNickname: c.nameOrNickname,
            age: c.age,
            language: c.language || undefined,
            allergies: c.allergies || undefined,
            medicalNotes: c.medicalNotes || undefined,
            specialNeeds: c.specialNeeds || undefined,
            napSchedule: c.napSchedule || undefined,
            feedingNotes: c.feedingNotes || undefined,
            comfortObjects: c.comfortObjects || undefined,
            screenTimeRules: c.screenTimeRules || undefined,
            swimAbility: c.swimAbility || undefined,
            personalityNotes: c.personalityNotes || undefined,
          })),
          emergencyContact,
          localContact: localContact || undefined,
          doctorPreference: doctorPreference || undefined,
          permitWhatsappContact,
          permitOffProperty,
          permitPool,
          permitBeach,
          permitOceanSwim,
          medications,
          medicationInstructions: medicationInstructions || undefined,
          addOns: addOns as string[],
          estimateTotalUsd: breakdown.total,
          estimateDepositUsd: breakdown.deposit,
          estimateRemainingUsd: breakdown.remaining,
          estimateBreakdown: JSON.stringify(breakdown),
          notes: notes || undefined,
        });
        code = res.code;
        setSubmittedCode(code ?? null);
        setSubmitState("saved");
      } catch (err) {
        console.error(err);
        setSubmitState("error");
      }
    }

    const text = encodeURIComponent(buildWhatsappMessage(code));
    window.open(`https://wa.me/${WHATSAPP_E164_DIGITS}?text=${text}`, "_blank");
  }

  return (
    <section id="book" className="py-24 bg-ivory">
      <div className="container-prose">
        <div className="max-w-2xl">
          <p className="eyebrow">Booking request</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-espresso">
            Request a nanny.
          </h2>
          <p className="mt-5 text-espresso/75 leading-relaxed">
            Share the details below and we'll review manually. Submitting opens WhatsApp
            with a formatted summary so you can confirm with Karen and we'll come back to
            you with a final price, deposit instructions, and matched nanny.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid lg:grid-cols-3 gap-8 items-start"
        >
          <div className="lg:col-span-2 space-y-10">
            {/* Service & schedule */}
            <Fieldset title="Service & schedule">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Service type">
                  <select
                    className="input-base"
                    value={service}
                    onChange={(e) => {
                      const v = e.target.value as ServiceSlug;
                      setService(v);
                      setHoursForService(v);
                    }}
                  >
                    {(Object.keys(SERVICES) as ServiceSlug[]).map((s) => (
                      <option key={s} value={s}>
                        {SERVICES[s].name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Date">
                  <input
                    type="date"
                    className="input-base"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Start time">
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
                    className="input-base"
                    min={SERVICES[service].minHours}
                    step={0.5}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value) || 0)}
                  />
                </Field>
                {service === "retreat" && (
                  <Field label="Retreat block">
                    <select
                      className="input-base"
                      value={retreatHalfDay ? "half" : "full"}
                      onChange={(e) => setRetreatHalfDay(e.target.value === "half")}
                    >
                      <option value="half">Half day · 3 hr</option>
                      <option value="full">Full day · 6 hr</option>
                    </select>
                  </Field>
                )}
                {service === "wedding" && (
                  <Field label="Event hours">
                    <input
                      type="number"
                      className="input-base"
                      min={4}
                      step={0.5}
                      value={weddingHours}
                      onChange={(e) => setWeddingHours(Number(e.target.value) || 4)}
                    />
                  </Field>
                )}
                <Field label="Recurring?">
                  <select
                    className="input-base"
                    value={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.value as any)}
                  >
                    <option value="no">No</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom</option>
                  </select>
                </Field>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <Check label="Timing is flexible" checked={flexibleTiming} onChange={setFlexibleTiming} />
                <Check label="This is for an event or retreat" checked={isEventOrRetreat} onChange={setIsEventOrRetreat} />
                <Check label="Parents will be on-site" checked={parentsOnSite} onChange={setParentsOnSite} />
                <Check label="Children will leave the property" checked={childrenLeaveProperty} onChange={setChildrenLeaveProperty} />
                <Check label="Pool or beach is involved" checked={poolOrBeach} onChange={setPoolOrBeach} />
                <Check label="Same-day booking" checked={isSameDay} onChange={setIsSameDay} />
                <Check label="Holiday / high-demand date" checked={isHoliday} onChange={setIsHoliday} />
              </div>
            </Fieldset>

            {/* Parent */}
            <Fieldset title="Parent details">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Parent name">
                  <input
                    className="input-base"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    required
                  />
                </Field>
                <Field label="WhatsApp number">
                  <input
                    className="input-base"
                    placeholder="+1 ..."
                    value={parentWhatsapp}
                    onChange={(e) => setParentWhatsapp(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Email">
                  <input
                    className="input-base"
                    type="email"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                  />
                </Field>
                <Field label="Preferred language">
                  <select
                    className="input-base"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value as any)}
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="either">Either</option>
                  </select>
                </Field>
              </div>
            </Fieldset>

            {/* Location */}
            <Fieldset title="Location">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Villa / hotel / Airbnb name">
                  <input
                    className="input-base"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Area">
                  <select
                    className="input-base"
                    value={area}
                    onChange={(e) => setArea(e.target.value as any)}
                  >
                    {TRAVEL_AREAS.map((a) => (
                      <option key={a.slug} value={a.slug}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Exact location or Google Maps pin/link" className="mt-4">
                <input
                  className="input-base"
                  placeholder="Accommodation name, Google Maps pin/link"
                  value={locationDetail}
                  onChange={(e) => setLocationDetail(e.target.value)}
                  required
                />
              </Field>
              <div className="mt-4 grid sm:grid-cols-3 gap-4">
                <Field label="Gate / security">
                  <input className="input-base" value={gateNotes} onChange={(e) => setGateNotes(e.target.value)} />
                </Field>
                <Field label="Parking">
                  <input className="input-base" value={parkingNotes} onChange={(e) => setParkingNotes(e.target.value)} />
                </Field>
                <Field label="Road / access notes">
                  <input className="input-base" value={accessNotes} onChange={(e) => setAccessNotes(e.target.value)} />
                </Field>
              </div>
            </Fieldset>

            {/* Children */}
            <Fieldset
              title="Children"
              right={
                <button type="button" onClick={addChild} className="btn-ghost text-xs">
                  + Add child
                </button>
              }
            >
              <div className="space-y-6">
                {children.map((c, i) => (
                  <div key={i} className="rounded-xl border border-espresso/10 bg-sand/20 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-medium text-espresso">Child {i + 1}</p>
                      {children.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChild(i)}
                          className="text-xs text-espresso/50 hover:text-clayDeep"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Name or nickname">
                        <input
                          className="input-base"
                          value={c.nameOrNickname}
                          onChange={(e) => updateChild(i, { nameOrNickname: e.target.value })}
                        />
                      </Field>
                      <Field label="Age">
                        <input
                          className="input-base"
                          placeholder="e.g. 4 or 14 mo"
                          value={c.age}
                          onChange={(e) => updateChild(i, { age: e.target.value })}
                        />
                      </Field>
                      <Field label="Language">
                        <input className="input-base" value={c.language} onChange={(e) => updateChild(i, { language: e.target.value })} />
                      </Field>
                      <Field label="Swim ability">
                        <input className="input-base" value={c.swimAbility} onChange={(e) => updateChild(i, { swimAbility: e.target.value })} />
                      </Field>
                      <Field label="Allergies">
                        <input className="input-base" value={c.allergies} onChange={(e) => updateChild(i, { allergies: e.target.value })} />
                      </Field>
                      <Field label="Medical notes">
                        <input className="input-base" value={c.medicalNotes} onChange={(e) => updateChild(i, { medicalNotes: e.target.value })} />
                      </Field>
                      <Field label="Special needs / sensory">
                        <input className="input-base" value={c.specialNeeds} onChange={(e) => updateChild(i, { specialNeeds: e.target.value })} />
                      </Field>
                      <Field label="Nap schedule">
                        <input className="input-base" value={c.napSchedule} onChange={(e) => updateChild(i, { napSchedule: e.target.value })} />
                      </Field>
                      <Field label="Feeding notes">
                        <input className="input-base" value={c.feedingNotes} onChange={(e) => updateChild(i, { feedingNotes: e.target.value })} />
                      </Field>
                      <Field label="Comfort objects">
                        <input className="input-base" value={c.comfortObjects} onChange={(e) => updateChild(i, { comfortObjects: e.target.value })} />
                      </Field>
                      <Field label="Screen-time rules">
                        <input className="input-base" value={c.screenTimeRules} onChange={(e) => updateChild(i, { screenTimeRules: e.target.value })} />
                      </Field>
                      <Field label="Personality notes">
                        <input className="input-base" value={c.personalityNotes} onChange={(e) => updateChild(i, { personalityNotes: e.target.value })} />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </Fieldset>

            {/* Safety */}
            <Fieldset title="Safety details">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Emergency contact">
                  <input
                    className="input-base"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Local parent contact during booking">
                  <input className="input-base" value={localContact} onChange={(e) => setLocalContact(e.target.value)} />
                </Field>
                <Field label="Doctor / clinic preference">
                  <input className="input-base" value={doctorPreference} onChange={(e) => setDoctorPreference(e.target.value)} />
                </Field>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <Check label="Permit WhatsApp contact during booking" checked={permitWhatsappContact} onChange={setPermitWhatsappContact} />
                <Check label="Permit taking child off property" checked={permitOffProperty} onChange={setPermitOffProperty} />
                <Check label="Permit pool play" checked={permitPool} onChange={setPermitPool} />
                <Check label="Permit beach play" checked={permitBeach} onChange={setPermitBeach} />
                <Check label="Permit ocean swimming (off by default)" checked={permitOceanSwim} onChange={setPermitOceanSwim} />
                <Check label="Medications needed" checked={medications} onChange={setMedications} />
              </div>
              {medications && (
                <Field label="Medication instructions (written)" className="mt-4">
                  <textarea
                    className="input-base min-h-[80px]"
                    value={medicationInstructions}
                    onChange={(e) => setMedicationInstructions(e.target.value)}
                  />
                </Field>
              )}
            </Fieldset>

            {/* Add-ons */}
            <Fieldset title="Add-ons">
              <div className="grid sm:grid-cols-2 gap-3">
                {(Object.keys(ADDONS) as AddOnSlug[]).map((slug) => (
                  <Check
                    key={slug}
                    label={`${ADDONS[slug].name} · $${ADDONS[slug].price}`}
                    checked={addOns.includes(slug)}
                    onChange={() => toggleAddOn(slug)}
                  />
                ))}
              </div>
            </Fieldset>

            {/* Notes */}
            <Fieldset title="Anything else">
              <textarea
                className="input-base min-h-[120px]"
                placeholder="Special routines, dietary needs, what would make this booking feel calm…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Fieldset>
          </div>

          {/* Estimate sidebar */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border border-espresso/10 bg-sand/30 p-6">
              <p className="eyebrow">Estimated price</p>
              <h3 className="mt-1 text-2xl text-espresso">
                {SERVICES[service].name}
              </h3>

              <div className="mt-5 space-y-2.5 text-sm">
                <Line label={breakdown.service.label} amount={breakdown.service.amount} note={breakdown.service.note} />
                {breakdown.addOns.map((a, i) => (
                  <Line key={i} label={a.label} amount={a.amount} />
                ))}
                {breakdown.modifiers.map((m, i) => (
                  <Line key={i} label={m.label} amount={m.amount} note={m.note} />
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-espresso/10 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span>Estimated total</span>
                  <span className="font-medium">${breakdown.total}</span>
                </div>
                <div className="flex justify-between text-espresso/75">
                  <span>50% deposit</span>
                  <span>${breakdown.deposit}</span>
                </div>
                <div className="flex justify-between text-espresso/75">
                  <span>Remaining at end of service</span>
                  <span>${breakdown.remaining}</span>
                </div>
              </div>

              {breakdown.notes.length > 0 && (
                <ul className="mt-5 space-y-1.5 text-xs text-espresso/65">
                  {breakdown.notes.map((n) => (
                    <li key={n}>· {n}</li>
                  ))}
                </ul>
              )}

              <p className="mt-5 text-xs italic text-espresso/65">
                This is an estimate. Final pricing and nanny match are confirmed manually
                after we review your request.
              </p>

              <button type="submit" className="mt-6 w-full btn-primary">
                {CONVEX_ENABLED ? "Send & open WhatsApp" : "Open WhatsApp"}
              </button>
              <a
                href="https://wa.me/50589750052"
                target="_blank"
                rel="noreferrer"
                className="mt-3 w-full btn-secondary"
              >
                Or just message Karen directly
              </a>

              {submitState === "saving" && (
                <p className="mt-3 text-xs text-espresso/60">Saving your request…</p>
              )}
              {submitState === "saved" && submittedCode && (
                <p className="mt-3 text-xs text-sageDeep">
                  Saved as <strong>{submittedCode}</strong>. WhatsApp opening…
                </p>
              )}
              {submitState === "error" && (
                <p className="mt-3 text-xs text-clayDeep">
                  Please fill in name, WhatsApp, date, property, and location, then try again.
                </p>
              )}
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

function Fieldset({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-espresso/10 bg-ivory p-6">
      <div className="flex items-center justify-between mb-5">
        <legend className="font-serif text-xl text-espresso">{title}</legend>
        {right}
      </div>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="label-base">{label}</span>
      {children}
    </label>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 text-sm text-espresso/85 cursor-pointer">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-espresso/30 text-clay focus:ring-clay/30"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function Line({
  label,
  amount,
  note,
}: {
  label: string;
  amount: number;
  note?: string;
}) {
  return (
    <div className="flex justify-between gap-3">
      <div className="flex-1">
        <p className="text-espresso/85">{label}</p>
        {note && <p className="text-xs text-espresso/55">{note}</p>}
      </div>
      <p className="text-espresso/85 tabular-nums">${amount}</p>
    </div>
  );
}
