import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#how", label: "How" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled ? "bg-ivory/90 backdrop-blur border-b border-espresso/10" : "bg-transparent"
      }`}
    >
      <div className="container-prose flex items-center justify-between py-4">
        <a href="#top" className="font-serif text-lg text-espresso">
          Popoyo Childcare
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-espresso/75">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-clay transition">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#book" className="btn-primary text-xs">Book</a>
      </div>
    </header>
  );
}
