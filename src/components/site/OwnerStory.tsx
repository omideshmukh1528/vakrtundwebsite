import { motion } from "framer-motion";
import { IMAGES } from "@/config/images";

export default function OwnerStory() {
  return (
    <section id="about" className="relative overflow-hidden bg-charcoal py-24 sm:py-32">
      <div className="grain absolute inset-0 opacity-50" />
      <div className="absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-orange/15 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/10 shadow-elevated">
            <img
              src={IMAGES.owner}
              alt="The owner of Vakratund Car Accessories"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 to-transparent" />
          </div>
          <div className="glass absolute -bottom-5 -right-4 rounded-2xl border border-orange/40 bg-graphite/90 px-5 py-4">
            <p className="font-display text-sm tracking-widest text-orange">SOMATANE</p>
            <p className="text-xs text-text-muted">Open 7 days a week</p>
          </div>
        </motion.div>

        <div>
          <motion.span
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-sm tracking-widest text-orange"
          >
            THE PEOPLE BEHIND IT
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-3 font-display text-4xl leading-[0.95] metallic-text sm:text-5xl lg:text-6xl"
          >
            A local shop that treats every car like its own.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 space-y-4 text-base leading-relaxed text-text-muted sm:text-lg"
          >
            <p>
              Vakratund began on Parandwadi Road with a simple idea — that a car accessory shop
              should give honest advice first and sell second. Customers arrive with a model in mind
              and leave with something that actually suits the way they drive.
            </p>
            <p>
              Everything is fitted in-house, from a set of floor mats to a full lighting build, so
              the person who advised you is the person who finishes the job.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              { k: "4.8", v: "Google rating" },
              { k: "8", v: "Categories" },
              { k: "7", v: "Days a week" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-4xl text-text-light">{s.k}</p>
                <p className="mt-1 text-xs text-text-muted">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}