import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getFeaturedProducts, productImage, type Product } from "@/lib/api/products";
import { SectionHeading } from "./SectionHeading";

export default function FeaturedProducts({ onEnquire }: { onEnquire: (p: Product) => void }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    getFeaturedProducts()
      .then((p) => alive && setProducts(p))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="products" className="relative bg-graphite py-24 sm:py-32">
      <div className="grain absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="From the counter"
          title="What people fit most"
          sub="Live from our catalogue — availability is updated from the workshop system."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {error && (
            <p className="text-text-muted">
              Our catalogue is briefly unavailable — call us and we'll check stock for you.
            </p>
          )}
          {!products &&
            !error &&
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-[22px] border border-border-dark bg-charcoal"
              />
            ))}
          {products?.map((p, i) => {
            const stock = {
              label:
                p.stock === 0
                  ? "Out of stock"
                  : p.badge === "Limited"
                    ? "Limited availability"
                    : "In stock",
              tone:
                p.stock === 0
                  ? "out"
                  : p.badge === "Limited"
                    ? "warning"
                    : "success",
            };
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-border-dark bg-charcoal transition-colors hover:border-orange/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={productImage(p)}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-orange px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] tracking-[0.2em] text-orange uppercase">{p.category}</p>
                  <h3 className="mt-1.5 font-display text-2xl leading-tight text-text-light">
                    {p.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-text-muted">{p.description}</p>
                  {p.vehicle && <p className="mt-2 text-xs text-text-muted">Fits: {p.vehicle}</p>}
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        stock.tone === "success"
                          ? "bg-stock-in"
                          : stock.tone === "warning"
                            ? "bg-stock-low"
                            : "bg-stock-out"
                      }`}
                    />
                    <span className="text-text-muted">{stock.label}</span>
                  </div>
                  <button
                    onClick={() => onEnquire(p)}
                    className="mt-5 w-full rounded-full border border-white/15 py-3 text-sm font-semibold text-text-light transition-colors hover:border-orange hover:bg-orange hover:text-white"
                  >
                    Enquire
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}