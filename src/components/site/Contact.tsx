import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Camera, MessageCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { IMAGES } from "@/config/images";
import { SectionHeading } from "./SectionHeading";

export default function Contact({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="contact" className="relative bg-warm-light py-24 sm:py-32">
      <div className="grain-dark absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Visit us"
          title="Come see the workshop"
          sub="Bring the car. We'll tell you honestly what it needs — and what it doesn't."
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[24px] border border-border-light shadow-soft"
          >
            <div className="relative aspect-[16/10]">
              <img
                src={IMAGES.shop}
                alt="Vakratund Car Accessories shopfront, Somatane"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <a
                href={BUSINESS_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass absolute right-4 bottom-4 rounded-full border border-white/25 bg-black/50 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange"
              >
                Open in Google Maps
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-between rounded-[24px] border border-border-light bg-off-white p-7 shadow-soft"
          >
            <div className="space-y-6">
              <Item icon={MapPin} title="Address" text={BUSINESS_CONFIG.address} />
              <Item
                icon={Phone}
                title="Phone"
                text={BUSINESS_CONFIG.phone}
                href={`tel:${BUSINESS_CONFIG.phone}`}
              />
              <Item icon={Clock} title="Hours" text={BUSINESS_CONFIG.openingHours} />
              <Item
                icon={Camera}
                title="Instagram"
                text={`@${BUSINESS_CONFIG.instagram}`}
                href={`https://instagram.com/${BUSINESS_CONFIG.instagram}`}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onQuote}
                className="flex-1 rounded-full bg-orange px-6 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Get a Quote
              </button>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-text-dark/20 px-6 py-3.5 font-semibold text-text-dark transition-colors hover:border-orange hover:text-orange"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Item({
  icon: Icon,
  title,
  text,
  href,
}: {
  icon: typeof MapPin;
  title: string;
  text: string;
  href?: string;
}) {
  const body = <p className="mt-0.5 text-sm leading-relaxed text-text-muted-dark">{text}</p>;
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange/12 text-orange">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="font-display text-lg tracking-wide text-text-dark">{title}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-orange">
            {body}
          </a>
        ) : (
          body
        )}
      </div>
    </div>
  );
}