import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { IMAGES } from "@/config/images";
import { SectionHeading } from "./SectionHeading";

type Stage = {
  num: string;
  label: string;
  text: string;
  image: string;
  caption: string;
  tone: "dark" | "light";
};

const stages: Stage[] = [
  {
    num: "01",
    label: "Arrival",
    text: "Every car arrives as a blank canvas.",
    image: IMAGES.arrivalCar,
    caption: "A Swift in the bay at Somatane, minutes before work begins.",
    tone: "dark",
  },
  {
    num: "02",
    label: "Interior",
    text: "Start where every drive is felt.",
    image: IMAGES.seatCovers,
    caption: "Seat cover fitting on a new Mahindra XUV300 — a real Vakratund job.",
    tone: "light",
  },
  {
    num: "03",
    label: "Technology",
    text: "Technology that belongs inside the drive.",
    image: IMAGES.androidScreens,
    caption: "Front-end stripped for a clean, properly routed electrical install.",
    tone: "dark",
  },
  {
    num: "04",
    label: "Lighting & Style",
    text: "Details change the way the car is seen.",
    image: IMAGES.lighting,
    caption: "Signature lighting, read the way you actually see it — after dark.",
    tone: "dark",
  },
  {
    num: "05",
    label: "Now It's Yours",
    text: "Now it feels like yours.",
    image: IMAGES.finalCar,
    caption: "Halo headlamps and a finished front end, ready to leave the workshop.",
    tone: "light",
  },
];

export default function CarStory({ onQuote }: { onQuote: () => void }) {
  return (
    <div id="story">
      <section className="relative bg-graphite pt-24 pb-6 sm:pt-32">
        <div className="grain absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            kicker="The Transformation"
            title="Five stages, one car"
            sub="Follow a car through the workshop — every photograph below is real work that left our Somatane bay."
          />
        </div>
      </section>

      {stages.map((s, i) => (
        <StageBlock
          key={s.num}
          stage={s}
          index={i}
          onQuote={onQuote}
          isLast={i === stages.length - 1}
        />
      ))}
    </div>
  );
}

function StageBlock({
  stage,
  index,
  onQuote,
  isLast,
}: {
  stage: Stage;
  index: number;
  onQuote: () => void;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [1.12, 1, 1.06],
  );
  const numOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 1, 1, 0]);

  const reversed = index % 2 === 1;
  const light = stage.tone === "light";

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden py-16 sm:py-20 lg:min-h-[78vh] lg:py-24 ${
        light ? "bg-off-white" : "bg-charcoal"
      }`}
    >
      <div className={`absolute inset-0 ${light ? "grain-dark" : "grain"} opacity-60`} />
      <motion.span
        style={{ opacity: numOpacity }}
        aria-hidden
        className={`pointer-events-none absolute top-1/2 ${
          reversed ? "left-4" : "right-4"
        } -translate-y-1/2 font-display text-[28vw] leading-none lg:text-[18vw] ${
          light ? "text-black/[0.04]" : "text-white/[0.04]"
        }`}
      >
        {stage.num}
      </motion.span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <motion.div style={{ y: imgY }} className={`relative ${reversed ? "lg:order-2" : ""}`}>
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-[24px] border shadow-elevated sm:aspect-[16/11] ${
              light ? "border-border-light" : "border-white/10"
            }`}
          >
            <motion.img
              style={{ scale: imgScale }}
              src={stage.image}
              alt={stage.caption}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          </div>
          <div className="glass absolute -top-4 left-6 rounded-full border border-orange/40 bg-charcoal/85 px-4 py-2">
            <span className="font-display text-sm tracking-widest text-orange">
              {stage.num} / 05
            </span>
          </div>
        </motion.div>

        <div className={`relative ${reversed ? "lg:order-1" : ""}`}>
          <motion.span
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-sm tracking-widest text-orange"
          >
            STAGE {stage.num}
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mt-2 font-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl ${
              light ? "dark-metallic-text" : "metallic-text"
            }`}
          >
            {stage.label}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className={`mt-4 text-lg sm:text-xl ${light ? "text-text-dark" : "text-text-light"}`}
          >
            {stage.text}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-3 text-sm ${light ? "text-text-muted-dark" : "text-text-muted"}`}
          >
            {stage.caption}
          </motion.p>

          {isLast && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={onQuote}
              className="mt-8 rounded-full bg-orange px-8 py-4 font-semibold tracking-wide text-white uppercase transition-colors hover:bg-orange-dark"
            >
              Build Your Car
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}