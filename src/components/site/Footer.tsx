import { Camera, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BUSINESS_CONFIG } from "@/config/business";
import { IMAGES } from "@/config/images";

export default function Footer() {
  return (
    <footer className="relative border-t border-border-dark bg-graphite py-14">
      <div className="grain absolute inset-0 opacity-50" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={IMAGES.logo}
            alt="Vakratund Car Accessories logo"
            className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15"
          />
          <div>
            <p className="font-display text-2xl leading-none tracking-wide text-text-light">
              VAKRATUND
            </p>
            <p className="text-[11px] tracking-[0.24em] text-text-muted">CAR ACCESSORIES</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-text-muted">
          <span className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
            {BUSINESS_CONFIG.address}
          </span>
          <a
            href={`tel:${BUSINESS_CONFIG.phone}`}
            className="flex items-center gap-2 hover:text-orange"
          >
            <Phone className="h-4 w-4 text-orange" />
            {BUSINESS_CONFIG.phone}
          </a>
          <a
            href={`https://instagram.com/${BUSINESS_CONFIG.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-orange"
          >
            <Camera className="h-4 w-4 text-orange" />@{BUSINESS_CONFIG.instagram}
          </a>
        </div>
        <Link
          to="/admin/login"
          aria-label="Admin sign in"
          className="self-end text-[10px] text-text-muted/20 transition-colors hover:text-orange focus-visible:text-orange lg:self-center"
        >
          Admin
        </Link>
      </div>
      <p className="relative mx-auto mt-10 max-w-7xl px-4 text-xs text-text-muted sm:px-6">
        © {new Date().getFullYear()} Vakratund Car Accessories, Somatane · Talegaon Dabhade.
      </p>
    </footer>
  );
}
