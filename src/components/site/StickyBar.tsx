import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export default function StickyBar({ onQuote }: { onQuote: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: "spring", damping: 24 }}
          className="glass fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-graphite/85 px-4 py-3 lg:hidden"
        >
          <div className="flex items-center gap-2">
            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-sm font-semibold text-text-light"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-sm font-semibold text-text-light"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <button
              onClick={onQuote}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-orange py-3 text-sm font-semibold text-white"
            >
              <Sparkles className="h-4 w-4" /> Quote
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}