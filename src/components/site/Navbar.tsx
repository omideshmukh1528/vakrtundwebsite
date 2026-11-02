import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { IMAGES } from "@/config/images";

const links = [
  { label: "Story", href: "#story" },
  { label: "Accessories", href: "#accessories" },
  { label: "Products", href: "#products" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onQuote }: { onQuote: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#story");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const current = links.find((l) => {
        const el = document.querySelector(l.href);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 140 && r.bottom > 140;
      });
      if (current) setActive(current.href);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.15, type: "spring", damping: 20 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/10 bg-graphite/70 py-0"
            : "border-b border-transparent bg-transparent py-2"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex shrink-0 items-center gap-3">
            <img
              src={IMAGES.logo}
              alt="Vakratund Car Accessories logo"
              className="h-10 w-10 rounded-full object-cover ring-1 ring-white/20"
            />
            <span className="hidden font-display text-xl leading-none tracking-wide text-text-light sm:block">
              VAKRATUND
              <span className="block text-[10px] tracking-[0.24em] text-text-muted">
                CAR ACCESSORIES
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-sm transition-colors hover:text-orange ${
                  active === l.href ? "text-orange" : "text-text-muted"
                }`}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-orange"
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="hidden items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-light xl:flex"
            >
              <Phone className="h-4 w-4" /> {BUSINESS_CONFIG.phone}
            </a>
            <button
              onClick={onQuote}
              className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-orange-dark"
            >
              Get a Quote
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-full p-2 text-text-light lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="glass absolute inset-0 bg-graphite/95" onClick={() => setOpen(false)} />
            <motion.div
              className="relative flex h-full flex-col p-6"
              initial={{ x: 40 }}
              animate={{ x: 0 }}
              exit={{ x: 40 }}
              transition={{ type: "spring", damping: 26 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-text-light">VAKRATUND</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 text-text-light"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-10 flex flex-col gap-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-text-light transition-colors hover:text-orange"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  onQuote();
                }}
                className="mt-auto rounded-full bg-orange px-6 py-3.5 text-center font-semibold text-white"
              >
                Get a Quote
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}