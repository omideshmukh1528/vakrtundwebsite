import logoImg from "@/assets/logo.jpg";
import ownerImg from "@/assets/owner.jpg";
import shopImg from "@/assets/shopfront.jpg";
import tharImg from "@/assets/thar-halo.png";
import HeroImg from "@/assets/defender-hero.jpg";
import swiftImg from "@/assets/swift-arrival.png";
import steeringImg from "@/assets/steering-wrap.png";
import seatCoverImg from "@/assets/seatcover-xuv.png";
import installImg from "@/assets/install-engine.png";
import nightImg from "@/assets/night-lighting.png";

/**
 * Centralised image registry. Every entry below is a genuine Vakratund
 * photograph supplied by the business — no stock photography is used.
 */
export const IMAGES = {
  logo: logoImg,
  owner: ownerImg,
  shop: shopImg,
  workshop: shopImg,

  // Cars photographed at / by Vakratund
  heroCar: HeroImg,
  arrivalCar: swiftImg,
  finalCar: tharImg,

  // Work categories
  seatCovers: seatCoverImg,
  steering: steeringImg,
  floorMats: seatCoverImg,
  androidScreens: installImg,
  audio: installImg,
  wiring: installImg,
  lighting: nightImg,
  wheels: tharImg,
  styling: nightImg,

  gallery: [
    { src: tharImg, label: "Fortuner · Full Modify " },
    { src: seatCoverImg, label: "Mahindra XUV300 · seat cover fitting" },
    { src: installImg, label: "Front-end electrical install" },
    { src: nightImg, label: "Exteriors after dark" },
    { src: steeringImg, label: "Steering wrap · stitched finish" },
    { src: swiftImg, label: "Swift in the bay" },
    { src: shopImg, label: "The Somatane shopfront" },
  ],

  instagram: [
    { src: tharImg, type: "reel" as const },
    { src: seatCoverImg, type: "reel" as const },
    { src: installImg, type: "reel" as const },
    { src: steeringImg, type: "reel" as const },
    { src: nightImg, type: "photo" as const },
    { src: swiftImg, type: "photo" as const },
  ],
} as const;