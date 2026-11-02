import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { IMAGES } from "@/config/images";
import { BUSINESS_CONFIG } from "@/config/business";

export default function Hero({ onQuote }: { onQuote: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const carY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-graphite pt-28 pb-16 sm:pt-32 lg:min-h-[92vh] lg:pt-36 lg:pb-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_15%,#23262b_0%,#141619_45%,#0e1012_100%)]" />
      <div className="grain absolute inset-0 opacity-70" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-orange/25 blur-[110px]" />
      <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-amber/10 blur-[130px]" />
      {!reduce && (
        <div className="light-streak absolute left-0 top-[28%] h-px w-1/3 bg-gradient-to-r from-transparent via-orange to-transparent" />
      )}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <motion.div style={{ y: textY }} className="z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pr-5 pl-1.5"
          >
            <img
              src={IMAGES.logo}
              alt="Vakratund Car Accessories logo"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="text-xs tracking-[0.2em] text-text-muted uppercase">
              Somatane · Talegaon
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="font-display text-[3.25rem] leading-[0.88] sm:text-7xl lg:text-[5.5rem]"
          >
            <span className="metallic-text">FROM FACTORY-FRESH</span>
            <br />
            <span className="accent-text">TO DISTINCTLY YOURS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Interiors, electronics, lighting and styling — crafted around your car at our Somatane
            workshop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#work"
              className="group flex items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 font-semibold tracking-wide text-white uppercase shadow-glow transition-colors hover:bg-orange-dark"
            >
              Explore the Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={onQuote}
              className="rounded-full border border-white/20 px-8 py-4 font-semibold tracking-wide text-text-light uppercase transition-colors hover:border-orange hover:text-orange"
            >
              Get a Quote
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-text-muted"
          >
            <span className="flex items-center gap-2">
              <span className="font-display text-2xl text-orange">{BUSINESS_CONFIG.rating}</span>
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-orange text-orange" />
                ))}
              </span>
            </span>
            <span>{BUSINESS_CONFIG.reviewCount} Google Reviews</span>
            <span className="h-4 w-px bg-white/15" />
            <span>{BUSINESS_CONFIG.openingHours}</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: carY }} className="relative order-1 lg:order-2">
          <motion.div
            style={{ scale: carScale }}
            initial={{ opacity: 0, x: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 shadow-elevated sm:aspect-[16/11]"
          >
            <img
              src={IMAGES.heroCar}
              alt="A Fortuner built at Vakratund Car Accessories"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-transparent to-transparent" />
            <div className="glass absolute bottom-4 left-4 rounded-2xl border border-white/15 bg-black/35 px-4 py-2.5">
              <p className="font-display text-sm tracking-widest text-orange">BUILT AT VAKRATUND</p>
              <p className="text-xs text-white/70">Fortuner · Customized build</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}