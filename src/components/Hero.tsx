export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* soft sun backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-clay/15 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-sage/15 blur-3xl" />
      </div>

      <div className="container-prose grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <p className="eyebrow">Popoyo · Guasacate · Tola</p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-espresso">
            Trusted in-home childcare for families visiting Popoyo.
          </h1>
          <p className="mt-6 text-lg text-espresso/75 max-w-prose leading-relaxed">
            Vetted nannies come to your villa, hotel, or retreat space so parents can surf,
            rest, work, go out, or enjoy a spa appointment while children are cared for nearby.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#book" className="btn-primary">Request a nanny</a>
            <a href="#services" className="btn-secondary">View services</a>
          </div>

          <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-espresso/70">
            {[
              "Vetted caregivers",
              "English / Spanish",
              "Villas · hotels · retreats",
              "Babies, toddlers, kids",
              "Daytime · date night",
              "Event support",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-espresso/10 shadow-lg shadow-clay/10 bg-sand">
            <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <defs>
                <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#F2D8C2" />
                  <stop offset="60%" stopColor="#E8DDC9" />
                  <stop offset="100%" stopColor="#7B96A6" />
                </linearGradient>
                <linearGradient id="sand" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#E8DDC9" />
                  <stop offset="100%" stopColor="#C58F73" />
                </linearGradient>
              </defs>
              <rect width="400" height="500" fill="url(#sky)" />
              {/* sun */}
              <circle cx="290" cy="170" r="60" fill="#F4C9A6" opacity="0.85" />
              {/* horizon water */}
              <rect y="290" width="400" height="80" fill="#7B96A6" opacity="0.7" />
              <path d="M0 300 Q 100 295 200 305 T 400 300 V370 H0 Z" fill="#5C7585" opacity="0.55" />
              {/* sand */}
              <rect y="370" width="400" height="130" fill="url(#sand)" />
              {/* palm silhouette */}
              <g fill="#3A2A1F" opacity="0.85">
                <rect x="62" y="200" width="6" height="200" rx="3" />
                <path d="M65 200 C 30 180, 20 150, 25 130 C 45 145, 55 170, 65 200 Z" />
                <path d="M65 200 C 100 180, 130 165, 145 145 C 130 175, 100 195, 65 200 Z" />
                <path d="M65 200 C 50 170, 55 140, 80 110 C 80 145, 80 180, 65 200 Z" />
              </g>
              {/* gentle silhouette of two figures (parent + child) */}
              <g fill="#3A2A1F" opacity="0.55">
                <ellipse cx="240" cy="430" rx="22" ry="6" />
                <path d="M232 430 q-2 -40 8 -55 q5 -10 8 0 q10 25 8 55 z" />
                <circle cx="240" cy="370" r="9" />
                <ellipse cx="278" cy="440" rx="14" ry="4" />
                <path d="M272 440 q0 -22 6 -32 q3 -6 6 0 q6 14 6 32 z" />
                <circle cx="278" cy="402" r="6" />
              </g>
            </svg>
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-ivory/85 backdrop-blur px-4 py-3 text-xs text-espresso/80">
              <p className="font-medium text-espresso">Concierge-style family support</p>
              <p className="opacity-75">Manually matched. Manually confirmed. No anonymous booking.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
