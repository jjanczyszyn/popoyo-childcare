import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how", label: "How it works" },
  { href: "#book", label: "Book" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled
          ? "bg-ivory/90 backdrop-blur border-b border-espresso/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-prose flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-serif text-xl text-espresso">Popoyo Childcare</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-espresso/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-clay transition">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#book" className="hidden md:inline-flex btn-primary text-xs">
          Request a nanny
        </a>
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-espresso"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d={open ? "M6 6l12 12M18 6l-12 12" : "M4 7h16M4 12h16M4 17h16"} strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-espresso/10 bg-ivory">
          <div className="container-prose py-3 flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-espresso/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="btn-primary text-xs mt-1 self-start"
            >
              Request a nanny
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
