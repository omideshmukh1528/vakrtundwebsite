import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Search, Loader2 } from "lucide-react";
import {
  searchProducts,
  POPULAR_CATEGORIES,
  type ProductOption,
} from "@/lib/api/enquiries";
import { BUSINESS_CONFIG } from "@/config/business";

export type EnquiryPrefill = { productId?: string; productName?: string } | null;

export default function EnquiryModal({
  open,
  prefill,
  onClose,
}: {
  open: boolean;
  prefill: EnquiryPrefill;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ProductOption | null>(null);
  const [options, setOptions] = useState<ProductOption[]>([]);
  const [searching, setSearching] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    setError(null);
    if (prefill?.productName) {
      setSelected({
        id: prefill.productId ?? "",
        name: prefill.productName,
        category: "",
      });
      setQuery(prefill.productName);
    }
  }, [open, prefill]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setSearching(true);
      searchProducts(query)
        .then(setOptions)
        .catch(() => setOptions([]))
        .finally(() => setSearching(false));
    }, 200);
    return () => clearTimeout(t);
  }, [query, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[0-9+\s-]{8,15}$/.test(phone.trim())) {
      setError("Please enter a valid phone number so we can call you back.");
      return;
    }
    const productName = selected?.name || query.trim();
    const note = message.trim();
    const whatsappMessage = [
      "Hello Vakratund Car Accessories,",
      "",
      "*New Quote Request*",
      `*Name:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      `*Car model:* ${carModel.trim()}`,
      ...(productName ? [`*Accessory:* ${productName}`] : []),
      ...(note ? [`*Additional details:* ${note}`] : []),
      "",
      "Sent from the Vakratund website.",
    ].join("\n");

    window.open(
      `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setDone(true);
    setName("");
    setPhone("");
    setCarModel("");
    setMessage("");
  };

  const field =
    "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-text-light placeholder:text-text-muted focus:border-orange focus:outline-none";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
        >
          <div className="glass absolute inset-0 bg-graphite/80" onClick={onClose} />
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry form"
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[28px] border border-border-dark bg-charcoal p-6 sm:rounded-[28px] sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 rounded-full p-2 text-text-muted transition-colors hover:text-text-light"
            >
              <X className="h-5 w-5" />
            </button>

            {done ? (
              <div className="py-10 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange/15 text-orange">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-3xl metallic-text">Thanks — we've got it</h3>
                <p className="mt-3 text-sm text-text-muted">
                  WhatsApp has opened with your request ready to send. We'll call you back shortly to talk through the fitment.
                </p>
                <button
                  onClick={onClose}
                  className="mt-7 rounded-full bg-orange px-7 py-3 font-semibold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <span className="font-display text-sm tracking-widest text-orange">
                  GET A QUOTE
                </span>
                <h3 className="mt-2 font-display text-3xl leading-none metallic-text sm:text-4xl">
                  Tell us about your car
                </h3>

                <form onSubmit={submit} className="mt-6 space-y-4">
                  <input
                    className={field}
                    placeholder="Your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className={field}
                    placeholder="Phone number"
                    required
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    className={field}
                    placeholder="Car model (e.g. Thar, Creta, Swift)"
                    required
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                  />

                  <div>
                    <div className="relative">
                      <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-muted" />
                      <input
                        className={`${field} pl-11`}
                        placeholder="Search an accessory (optional)"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setSelected(null);
                        }}
                      />
                      {searching && (
                        <Loader2 className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 animate-spin text-text-muted" />
                      )}
                    </div>
                    {!selected && options.length > 0 && query.length > 0 && (
                      <ul className="mt-2 max-h-44 overflow-y-auto rounded-xl border border-white/10 bg-graphite">
                        {options.map((o) => (
                          <li key={o.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelected(o);
                                setQuery(o.name);
                              }}
                              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-text-light hover:bg-white/5"
                            >
                              {o.name}
                              <span className="text-xs text-text-muted">{o.category}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {POPULAR_CATEGORIES.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setQuery(c);
                            setSelected(null);
                          }}
                          className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-orange hover:text-orange"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    className={`${field} min-h-24 resize-none`}
                    placeholder="Anything else we should know? (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  {error && <p className="text-sm text-stock-out">{error}</p>}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-orange py-4 font-semibold tracking-wide text-white uppercase transition-colors hover:bg-orange-dark"
                  >
                    Send Enquiry on WhatsApp
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
