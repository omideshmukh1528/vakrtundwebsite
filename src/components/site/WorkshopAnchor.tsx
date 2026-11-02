import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { IMAGES } from "@/config/images";

const hotspots = [
  { label: "Interiors", href: "#accessories", x: "18%", y: "62%" },
  { label: "Electronics", href: "#products", x: "46%", y: "52%" },
  { label: "Lighting", href: "#accessories", x: "72%", y: "66%" },
  { label: "Styling", href: "#work", x: "88%", y: "44%" },
];

export default function WorkshopAnchor() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[78vh] min-h-[520px] overflow-hidden bg-charcoal">
      <motion.img
        style={{ y, scale: 1.15 }}
        src={IMAGES.shop}
        alt="The Vakratund Car Accessories shopfront in Somatane, Talegaon Dabhade"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/85 via-graphite/45 to-graphite" />

      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-sm tracking-widest text-orange"
        >
          INSIDE VAKRATUND
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] metallic-text sm:text-6xl lg:text-7xl"
        >
          This is where the transformation happens.
        </motion.h2>
        <p className="mt-4 max-w-xl text-sm text-text-muted sm:text-base">
          Sankalp Shrushti, Parandwadi Road, Somatane — open seven days a week.
        </p>

        <div className="relative mt-10 hidden h-40 w-full max-w-4xl md:block">
          {hotspots.map((h, i) => (
            <motion.a
              key={h.label}
              href={h.href}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: h.x, top: h.y }}
            >
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-40" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-orange ring-4 ring-orange/20" />
              </span>
              <span className="glass absolute top-6 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-text-light transition-colors group-hover:border-orange group-hover:text-orange">
                {h.label}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 md:hidden">
          {hotspots.map((h) => (
            <a
              key={h.label}
              href={h.href}
              className="glass rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-text-light"
            >
              {h.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}