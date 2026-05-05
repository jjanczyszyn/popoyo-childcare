export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-clay/15 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-sage/15 blur-3xl" />
      </div>

      <div className="container-prose text-center max-w-3xl mx-auto">
        <p className="eyebrow">Popoyo · Nicaragua</p>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-espresso">
          In-home childcare for your stay in Popoyo.
        </h1>
        <p className="mt-6 text-lg text-espresso/70">
          Vetted nannies come to your villa, hotel, or retreat.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#book" className="btn-primary">Book a nanny</a>
          <a href="#services" className="btn-secondary">See services</a>
        </div>
      </div>
    </section>
  );
}
