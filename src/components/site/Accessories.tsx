import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/config/images";
import { SectionHeading } from "./SectionHeading";

const categories = [
  { name: "Interiors", desc: "Seat covers, floor mats, steering wraps", img: IMAGES.seatCovers },
  { name: "Electronics", desc: "Android screens, wiring, locking", img: IMAGES.androidScreens },
  { name: "Lighting", desc: "Projectors, LED, ambient", img: IMAGES.lighting },
  { name: "Audio", desc: "Speakers, amplifiers, tuning", img: IMAGES.audio },
  { name: "Styling", desc: "Steering, exterior detailing", img: IMAGES.steering },
  { name: "Security", desc: "Central locking, safety add-ons", img: IMAGES.wiring },
  { name: "Wheels", desc: "Alloys, tyres, fitment", img: IMAGES.wheels },
  { name: "Car Care", desc: "Cleaning, detailing, protection", img: IMAGES.arrivalCar },
];

export default function Accessories() {
  return (
    <section id="accessories" className="relative bg-warm-light py-24 sm:py-32">
      <div className="grain-dark absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Discover"
          title="Explore accessories"
          sub="Eight categories. One workshop. Everything your car needs to stop looking like every other one on the road."
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#products"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-[22px] border border-border-light shadow-soft"
            >
              <img
                src={cat.img}
                alt={`${cat.name} work at Vakratund`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(80%_60%_at_50%_100%,rgba(232,115,42,0.35),transparent)]" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-2xl text-white transition-transform duration-300 group-hover:-translate-y-1 sm:text-3xl">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-white/70">{cat.desc}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors group-hover:border-orange group-hover:bg-orange">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}