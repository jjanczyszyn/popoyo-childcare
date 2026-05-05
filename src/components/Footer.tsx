export default function Footer() {
  return (
    <footer className="bg-ivory border-t border-espresso/10">
      <div className="container-prose py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        <div>
          <p className="font-serif text-xl text-espresso">Popoyo Childcare</p>
          <p className="mt-3 text-espresso/70 leading-relaxed">
            Trusted in-home childcare for families visiting Popoyo, Nicaragua.
          </p>
          <p className="mt-3 text-espresso/55">Popoyo · Guasacate · Tola</p>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-3 space-y-1.5 text-espresso/80">
            <li>
              <a className="hover:text-clay" href="https://wa.me/50589750052" target="_blank" rel="noreferrer">
                WhatsApp · +505 8975 0052
              </a>
            </li>
            <li>+505 7718 5403 (local)</li>
            <li>+1 646 934 0781 (international)</li>
            <li>
              <a
                className="hover:text-clay"
                href="https://share.google/IXOC6DlEv7Zk9d18W"
                target="_blank"
                rel="noreferrer"
              >
                Find us on Google Maps →
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Service area</p>
          <ul className="mt-3 space-y-1.5 text-espresso/80">
            <li>Popoyo</li>
            <li>Guasacate</li>
            <li>Playa Santana</li>
            <li>Hacienda Iguana</li>
            <li>Las Salinas</li>
            <li>Rancho Santana</li>
            <li>Tola</li>
            <li className="text-espresso/55">Astillero, Magnific Rock by request</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Sections</p>
          <ul className="mt-3 space-y-1.5 text-espresso/80">
            <li><a href="#services" className="hover:text-clay">Services</a></li>
            <li><a href="#pricing" className="hover:text-clay">Pricing</a></li>
            <li><a href="#how" className="hover:text-clay">How it works</a></li>
            <li><a href="#book" className="hover:text-clay">Book</a></li>
            <li><a href="#policies" className="hover:text-clay">Payment & cancellation</a></li>
            <li><a href="#partners" className="hover:text-clay">Partners</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-espresso/10 py-5">
        <div className="container-prose flex flex-col sm:flex-row gap-2 sm:justify-between text-xs text-espresso/55">
          <p>© {new Date().getFullYear()} Popoyo Childcare</p>
          <p>Made with care in Nicaragua. Times in America/Managua.</p>
        </div>
      </div>
    </footer>
  );
}
