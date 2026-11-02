import { motion } from "framer-motion";

export function SectionHeading({
  kicker,
  title,
  sub,
  light = false,
  align = "left",
}: {
  kicker: string;
  title: string;
  sub?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <motion.span
        initial={{ opacity: 0, x: align === "center" ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-orange"
      >
        <span className="h-px w-8 bg-orange" />
        {kicker.toUpperCase()}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={`mt-3 font-display text-4xl leading-[0.92] sm:text-5xl lg:text-6xl ${
          light ? "dark-metallic-text" : "metallic-text"
        }`}
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-text-muted-dark" : "text-text-muted"
          }`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}