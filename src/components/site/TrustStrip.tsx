import { motion } from "framer-motion";
import { Star, Wrench, LayoutGrid, HeartHandshake } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export default function TrustStrip() {
  const items = [
    {
      icon: Star,
      title: `${BUSINESS_CONFIG.rating} / 5`,
      sub: `${BUSINESS_CONFIG.reviewCount} Google Reviews`,
    },
    { icon: Wrench, title: "Fitted In-House", sub: "Installed by our own team" },
    { icon: LayoutGrid, title: "Eight Categories", sub: "Interiors to alloys" },
    { icon: HeartHandshake, title: "Honest Guidance", sub: "We help you choose what fits" },
  ];
  return (
    <section className="relative border-y border-border-light bg-off-white">
      <div className="grain-dark absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-4 border-border-light py-7 lg:border-l lg:px-7 lg:py-10 lg:first:border-l-0"
          >
            <it.icon className="h-7 w-7 shrink-0 text-orange" />
            <div>
              <p className="font-display text-xl text-text-dark">{it.title}</p>
              <p className="text-xs text-text-muted-dark">{it.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}