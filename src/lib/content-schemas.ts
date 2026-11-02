import { z } from "zod";

/** Client-safe types & validation shared by admin forms and the server. */

export const WORK_CATEGORIES = [
  "Interior",
  "Exterior",
  "Audio",
  "Lighting",
  "Accessories",
  "Styling",
  "Security",
  "Other",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  description?: string | undefined;
  imageKey: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Reel = {
  id: string;
  title: string;
  reelUrl?: string;
  thumbnailUrl?: string | undefined;
  thumbnailKey?: string | undefined;
  videoUrl?: string | undefined;
  videoKey?: string | undefined;
  category?: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"] as const;
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

/** Only server-generated keys are trusted as internal media references. */
export const imageKeySchema = z
  .string()
  .regex(
    /^vakratund\/(ourwork|reels)\/[a-f0-9]{16,64}\.(jpg|jpeg|png|webp)$/,
    "Invalid image reference",
  );
export const videoKeySchema = z
  .string()
  .regex(/^vakratund\/reels\/[a-f0-9]{16,64}\.(mp4|webm)$/, "Invalid video reference");

export const workInputSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(120),
  category: z.enum(WORK_CATEGORIES),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  imageKey: imageKeySchema,
});

export const workUpdateSchema = workInputSchema.partial().extend({
  id: z.string().min(1),
});

export const reelUrlSchema = z
  .string()
  .trim()
  .url("Enter a valid URL")
  .refine((u) => /^https?:\/\//i.test(u), "URL must start with http:// or https://");

export const reelInputSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(120),
  videoKey: videoKeySchema,
});

export const reelUpdateSchema = reelInputSchema.partial().extend({
  id: z.string().min(1),
});

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
