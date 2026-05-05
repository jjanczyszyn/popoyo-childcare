export default function Policies() {
  return (
    <section id="policies" className="py-20 bg-sand/30">
      <div className="container-prose grid lg:grid-cols-2 gap-10">
        <div className="rounded-2xl bg-ivory border border-espresso/10 p-7">
          <p className="eyebrow">Payment</p>
          <h3 className="mt-2 text-2xl text-espresso">Deposit & balance</h3>
          <p className="mt-4 text-sm text-espresso/80 leading-relaxed">
            A 50% deposit is required to confirm your booking. The remaining balance is
            due at the end of the service. Gratuity is appreciated but never required.
          </p>
          <p className="mt-4 text-sm text-espresso/80 leading-relaxed">
            Accepted payment methods can include cash USD, cash córdobas, PayPal, Wise,
            Revolut, Venmo, Zelle (where available), and local bank transfer.
          </p>
          <p className="mt-4 text-xs italic text-espresso/65">
            Payment options may vary by booking and will be confirmed by WhatsApp.
          </p>
        </div>

        <div className="rounded-2xl bg-ivory border border-espresso/10 p-7">
          <p className="eyebrow">Cancellation</p>
          <h3 className="mt-2 text-2xl text-espresso">Calm but clear</h3>
          <ul className="mt-4 space-y-2 text-sm text-espresso/80 leading-relaxed">
            <li>· More than 72 hours before: deposit can be refunded or transferred.</li>
            <li>· 24–72 hours before: deposit can be transferred once, subject to availability.</li>
            <li>· Less than 24 hours: deposit is non-refundable.</li>
            <li>· Same-day cancellation: full minimum booking may be charged.</li>
            <li>· Holiday / event bookings: custom policy.</li>
            <li>· If a nanny arrives and cannot access the property, the booking minimum still applies.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
