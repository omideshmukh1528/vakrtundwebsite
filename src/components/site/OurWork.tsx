import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getPublicReels, getPublicWork } from "@/lib/ourwork.functions";
import { formatDate, type Reel, type WorkItem } from "@/lib/content-schemas";
import { SectionHeading } from "./SectionHeading";

function Media({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed)
    return (
      <div className="flex h-full min-h-48 items-center justify-center bg-charcoal text-xs text-text-muted">
        Vakratund Garage
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

export default function OurWork() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [reels, setReels] = useState<Reel[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    getPublicWork({ data: { limit: 6 } })
      .then((r) => {
        setItems(r.items);
        setError(!!r.error);
      })
      .catch(() => setError(true));
    getPublicReels({ data: { limit: 3 } })
      .then((r) => setReels(r.items))
      .catch(() => undefined);
  }, []);
  return (
    <>
      <section id="work" className="relative bg-off-white py-24 sm:py-32">
        <div className="grain-dark absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            kicker="Our Work"
            title="Real cars, real bays"
            sub="Photographs from the Somatane workshop — the same hands that will work on yours."
            light
          />
          <div className="mt-8 flex justify-end">
            <Link
              to="/ourwork"
              className="text-sm font-semibold text-orange hover:text-orange-dark"
            >
              View All Our Work →
            </Link>
          </div>
          {error && (
            <p className="mt-10 text-center text-sm text-text-muted">
              Our gallery is briefly unavailable.
            </p>
          )}
          {!error && !items.length && (
            <p className="mt-10 text-center text-sm text-text-muted">
              New workshop projects will appear here soon.
            </p>
          )}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group overflow-hidden rounded-[20px] border border-border-light bg-white shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Media src={item.imageUrl} alt={item.title} />
                </div>
                <div className="p-4">
                  <p className="text-[10px] tracking-widest text-orange uppercase">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-text-dark">{item.title}</h3>
                  <p className="mt-1 text-xs text-text-muted-dark">{formatDate(item.createdAt)}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      {reels.length > 0 && (
        <section className="bg-charcoal py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              kicker="Instagram Reels"
              title="See the work in motion"
              sub="A glimpse inside the workshop."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {reels.map((reel) => (
                <article
                  key={reel.id}
                  className="overflow-hidden rounded-2xl border border-border-dark bg-graphite"
                >
                  <div className="aspect-[9/12] overflow-hidden bg-black">
                    {reel.videoUrl ? (
                      <video
                        src={reel.videoUrl}
                        poster={reel.thumbnailUrl}
                        controls
                        preload="metadata"
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Media src={reel.thumbnailUrl} alt={reel.title} />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-text-light">{reel.title}</p>
                    <a
                      href={reel.reelUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-xs font-bold tracking-widest text-orange uppercase"
                    >
                      Watch Reel ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
