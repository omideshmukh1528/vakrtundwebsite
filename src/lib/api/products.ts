import { IMAGES } from "@/config/images";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  badge?: string;
  description: string;
  sku: string;
  vehicle?: string;
  image?: string;
};

const catalogue: Product[] = [
  {
    id: "p1",
    name: "Android Smart Screen",
    category: "Electronics",
    price: 12900,
    stock: 10,
    badge: "Popular",
    description:
      "A crisp, connected dashboard upgrade with navigation, music and hands-free calling.",
    sku: "VKA-AND-01",
    vehicle: "Swift, Baleno, Creta",
  },
  {
    id: "p2",
    name: "Custom Leatherette Seat Covers",
    category: "Interiors",
    price: 8500,
    stock: 2,
    badge: "Workshop pick",
    description:
      "Tailored seat covers with a clean finish, made to bring everyday comfort up a level.",
    sku: "VKA-INT-12",
    vehicle: "Most hatchbacks & SUVs",
  },
  {
    id: "p3",
    name: "Projector Headlamp Set",
    category: "Lighting",
    price: 6800,
    stock: 0,
    description: "Sharper night visibility with a focused beam and a signature front-end glow.",
    sku: "VKA-LGT-07",
    vehicle: "Universal fitment available",
  },
  {
    id: "p4",
    name: "Premium 3D Floor Mats",
    category: "Interiors",
    price: 3200,
    stock: 10,
    description: "Deep-channel protection shaped for a snug, easy-clean fit.",
    sku: "VKA-MAT-03",
    vehicle: "Swift, Nexon, Thar",
  },
  {
    id: "p5",
    name: "Component Speaker Upgrade",
    category: "Audio",
    price: 7400,
    stock: 4,
    badge: "New",
    description: "Fuller sound, cleaner vocals and a more involving drive home.",
    sku: "VKA-AUD-09",
    vehicle: "Universal fitment available",
  },
  {
    id: "p6",
    name: "Steering Wheel Wrap",
    category: "Styling",
    price: 1800,
    stock: 10,
    description: "A hand-finished grip that makes every turn feel more considered.",
    sku: "VKA-STY-04",
    vehicle: "Universal fitment available",
  },
  {
    id: "p7",
    name: "Central Locking System",
    category: "Security",
    price: 4200,
    stock: 6,
    description: "Keyless convenience with a properly wired, workshop-finished install.",
    sku: "VKA-SEC-02",
    vehicle: "Universal fitment available",
  },
  {
    id: "p8",
    name: "Alloy Wheel Set",
    category: "Styling",
    price: 22000,
    stock: 3,
    description: "A stance change that reads instantly, fitted and balanced in-house.",
    sku: "VKA-WHL-06",
    vehicle: "Thar, Creta, Fortuner",
  },
];

/** Category → representative Vakratund photograph. */
export function categoryImage(category: string): string {
  const map: Record<string, string> = {
    Electronics: IMAGES.androidScreens,
    Interiors: IMAGES.seatCovers,
    Lighting: IMAGES.lighting,
    Audio: IMAGES.audio,
    Styling: IMAGES.steering,
    Security: IMAGES.wiring,
    Wheels: IMAGES.wheels,
  };
  return map[category] ?? IMAGES.workshop;
}

export function productImage(p: Product): string {
  return p.image ?? categoryImage(p.category);
}

export async function getProducts(): Promise<Product[]> {
  return catalogue;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, 4);
}

export function availability(stock: number): {
  label: string;
  tone: "success" | "warning" | "error";
} {
  if (stock === 0) return { label: "Currently unavailable", tone: "error" };
  if (stock <= 2) return { label: "Limited availability", tone: "warning" };
  return { label: "In stock", tone: "success" };
}
