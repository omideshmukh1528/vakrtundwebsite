import { useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import CarStory from "@/components/site/CarStory";
import WorkshopAnchor from "@/components/site/WorkshopAnchor";
import Accessories from "@/components/site/Accessories";
import FeaturedProducts from "@/components/site/FeaturedProducts";
import OurWork from "@/components/site/OurWork";
import OwnerStory from "@/components/site/OwnerStory";
import Reviews from "@/components/site/Reviews";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import StickyBar from "@/components/site/StickyBar";
import EnquiryModal, { type EnquiryPrefill } from "@/components/site/EnquiryModal";
import type { Product } from "@/lib/api/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vakratund Car Accessories — Somatane, Talegaon Dabhade" },
      {
        name: "description",
        content:
          "Car interiors, Android screens, audio, lighting, alloys and styling fitted in-house at Vakratund Car Accessories, Somatane. Rated 4.8 on Google.",
      },
      { property: "og:title", content: "Vakratund Car Accessories — Somatane" },
      {
        property: "og:description",
        content: "From factory-fresh to distinctly yours. Accessories fitted in-house since day one.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<EnquiryPrefill>(null);

  const openQuote = useCallback(() => {
    setPrefill(null);
    setOpen(true);
  }, []);
  const openForProduct = useCallback((p: Product) => {
    setPrefill({ productId: p.id, productName: p.name });
    setOpen(true);
  }, []);

  return (
    <main className="bg-graphite">
      <Navbar onQuote={openQuote} />
      <Hero onQuote={openQuote} />
      <TrustStrip />
      <CarStory onQuote={openQuote} />
      <WorkshopAnchor />
      <Accessories />
      <FeaturedProducts onEnquire={openForProduct} />
      <OurWork />
      <OwnerStory />
      <Reviews />
      <Contact onQuote={openQuote} />
      <Footer />
      <StickyBar onQuote={openQuote} />
      <EnquiryModal open={open} prefill={prefill} onClose={() => setOpen(false)} />
    </main>
  );
}
