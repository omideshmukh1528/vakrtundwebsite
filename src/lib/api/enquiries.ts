import type { Product } from "./products";

export type EnquiryPayload = {
  name: string;
  phone: string;
  carModel: string;
  productId?: string;
  productName?: string;
  message?: string;
};

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ ok: true }> {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: true };
}

export type ProductOption = Pick<Product, "id" | "name" | "category">;

const localCatalogue: ProductOption[] = [
  { id: "p1", name: "Android Smart Screen", category: "Electronics" },
  { id: "p2", name: "Custom Leatherette Seat Covers", category: "Interiors" },
  { id: "p3", name: "Projector Headlamp Set", category: "Lighting" },
  { id: "p4", name: "Premium 3D Floor Mats", category: "Interiors" },
  { id: "p5", name: "Component Speaker Upgrade", category: "Audio" },
  { id: "p6", name: "Steering Wheel Wrap", category: "Styling" },
  { id: "p7", name: "Central Locking System", category: "Security" },
  { id: "p8", name: "Alloy Wheel Set", category: "Styling" },
];

export const POPULAR_CATEGORIES = [
  "Interiors",
  "Electronics",
  "Lighting",
  "Audio",
  "Styling",
  "Security",
];

/** Lightweight local catalogue search used by the enquiry form. */
export async function searchProducts(query: string): Promise<ProductOption[]> {
  await new Promise((resolve) => setTimeout(resolve, 120));
  const q = query.trim().toLowerCase();
  if (!q) return localCatalogue.slice(0, 6);
  return localCatalogue.filter(
    (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
  );
}
