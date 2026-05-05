export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory">
      <div className="container-prose py-12 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-serif text-lg text-ivory">Popoyo Childcare</p>
          <p className="mt-2 text-ivory/60">Popoyo · Guasacate · Tola</p>
        </div>
        <div>
          <p className="text-ivory/55 text-xs uppercase tracking-wider">Contact</p>
          <ul className="mt-2 space-y-1.5 text-ivory/85">
            <li>
              <a className="hover:text-clay" href="https://wa.me/50589750052" target="_blank" rel="noreferrer">
                WhatsApp · +505 8975 0052
              </a>
            </li>
            <li>
              <a className="hover:text-clay" href="https://share.google/IXOC6DlEv7Zk9d18W" target="_blank" rel="noreferrer">
                Find us on the map
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-ivory/55 text-xs uppercase tracking-wider">Notes</p>
          <ul className="mt-2 space-y-1.5 text-ivory/70 text-xs">
            <li>50% deposit · balance after service.</li>
            <li>Free cancel more than 72 hr before.</li>
            <li>Nannies are not lifeguards.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-4">
        <div className="container-prose text-xs text-ivory/45">
          © {new Date().getFullYear()} Popoyo Childcare
        </div>
      </div>
    </footer>
  );
}
