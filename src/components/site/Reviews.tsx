import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { BUSINESS_CONFIG, REVIEWS } from "@/config/business";
import { SectionHeading } from "./SectionHeading";

export default function Reviews() {
  const row = [...REVIEWS, ...REVIEWS];
  return (
    <section id="reviews" className="relative overflow-hidden bg-graphite py-24 sm:py-32">
      <div className="grain absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Word of mouth"
          title="What Somatane says"
          sub={`${BUSINESS_CONFIG.rating} out of 5 across ${BUSINESS_CONFIG.reviewCount} Google reviews.`}
        />
      </div>

      <div className="group relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-graphite to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-graphite to-transparent" />
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        >
          {row.map((r, i) => (
            <figure
              key={r.name + i}
              className="flex w-[300px] shrink-0 flex-col rounded-[22px] border border-border-dark bg-charcoal p-6 sm:w-[360px]"
            >
              <Quote className="h-6 w-6 text-orange/60" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-light">
                {r.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-sm font-semibold text-text-light">{r.name}</p>
                  <p className="text-xs text-text-muted">{r.time}</p>
                </div>
                <span className="flex">
                  {[...Array(r.rating)].map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-orange text-orange" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}