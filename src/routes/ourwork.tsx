import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { getPublicReels, getPublicWork } from "@/lib/ourwork.functions";
import { WORK_CATEGORIES, formatDate, type Reel, type WorkItem } from "@/lib/content-schemas";

export const Route = createFileRoute("/ourwork")({ component: OurWorkPage });
function OurWorkPage() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [reels, setReels] = useState<Reel[]>([]);
  const [category, setCategory] = useState("All");
  const [error, setError] = useState(false);
  useEffect(() => {
    getPublicWork({ data: {} })
      .then((r) => {
        setItems(r.items);
        setError(!!r.error);
      })
      .catch(() => setError(true));
    getPublicReels({ data: {} })
      .then((r) => setReels(r.items))
      .catch(() => undefined);
  }, []);
  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.category === category)),
    [items, category],
  );
  return (
    <main className="min-h-screen bg-graphite">
      <Navbar onQuote={() => undefined} />
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
        <Link to="/" className="text-xs tracking-widest text-orange uppercase">
          ← Back home
        </Link>
        <p className="mt-8 text-xs tracking-[.3em] text-orange uppercase">Our Work</p>
        <h1 className="mt-3 font-display text-6xl text-text-light sm:text-8xl">
          Built with intention.
        </h1>
        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("All")}
            className={`rounded-full px-4 py-2 text-xs ${category === "All" ? "bg-orange text-white" : "border border-border-dark text-text-muted"}`}
          >
            All
          </button>
          {WORK_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-xs ${category === c ? "bg-orange text-white" : "border border-border-dark text-text-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>
        {error && <p className="mt-12 text-text-muted">Unable to load Our Work right now.</p>}
        {!error && !filtered.length && (
          <p className="mt-12 text-text-muted">No projects in this category yet.</p>
        )}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="overflow-hidden rounded-2xl border border-border-dark bg-charcoal"
            >
              <div className="aspect-[4/3]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="p-5">
                <p className="text-xs tracking-widest text-orange uppercase">{item.category}</p>
                <h2 className="mt-2 font-display text-3xl text-text-light">{item.title}</h2>
                {item.description && (
                  <p className="mt-2 text-sm text-text-muted">{item.description}</p>
                )}
                <p className="mt-3 text-xs text-text-muted">{formatDate(item.createdAt)}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <section className="mt-28 border-t border-border-dark pt-16">
          <p className="text-xs tracking-[.3em] text-orange uppercase">Reels</p>
          <h2 className="mt-3 font-display text-5xl text-text-light sm:text-7xl">
            See it in motion.
          </h2>
          {reels.length === 0 ? (
            <p className="mt-8 text-sm text-text-muted">Workshop videos will appear here soon.</p>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {reels.map((reel) => (
                <article
                  key={reel.id}
                  className="overflow-hidden rounded-2xl border border-border-dark bg-charcoal"
                >
                  <div className="aspect-[9/12] bg-black">
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
                      <div className="flex h-full items-center justify-center text-xs text-text-muted">
                        Video unavailable
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-text-light">{reel.title}</h3>
                    <p className="mt-2 text-xs text-text-muted">{formatDate(reel.createdAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}
