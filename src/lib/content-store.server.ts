import { r2Delete, r2Exists, r2GetJson, r2Put, r2PublicUrl, r2PutJson } from "./r2.server";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  type Reel,
  type WorkItem,
} from "./content-schemas";

/**
 * All dynamic content lives in Cloudflare R2:
 *  - images       -> vakratund/ourwork/<id>.<ext>, vakratund/reels/<id>.<ext>
 *  - metadata     -> vakratund/data/ourwork.json, vakratund/data/reels.json
 * SERVER ONLY.
 */

const WORK_MANIFEST = "vakratund/data/ourwork.json";
const REELS_MANIFEST = "vakratund/data/reels.json";

function newId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function byNewest<T extends { createdAt: string }>(a: T, b: T) {
  return b.createdAt.localeCompare(a.createdAt);
}

/* ---------------------------------- Work --------------------------------- */

export async function listWork(): Promise<WorkItem[]> {
  const items = (await r2GetJson<WorkItem[]>(WORK_MANIFEST)) ?? [];
  return items
    .filter((i) => i && i.id && i.imageKey)
    .map((i) => ({ ...i, imageUrl: r2PublicUrl(i.imageKey) }))
    .sort(byNewest);
}

async function saveWork(items: WorkItem[]) {
  await r2PutJson(WORK_MANIFEST, items);
}

export async function createWork(input: {
  title: string;
  category: string;
  description?: string;
  imageKey: string;
}): Promise<WorkItem> {
  if (!(await r2Exists(input.imageKey))) {
    throw new Error("The uploaded image could not be verified. Please upload it again.");
  }
  const now = new Date().toISOString();
  const item: WorkItem = {
    id: newId(),
    title: input.title,
    category: input.category,
    ...(input.description ? { description: input.description } : {}),
    imageKey: input.imageKey,
    imageUrl: r2PublicUrl(input.imageKey),
    createdAt: now,
    updatedAt: now,
  };
  const items = (await r2GetJson<WorkItem[]>(WORK_MANIFEST)) ?? [];
  await saveWork([item, ...items]);
  return item;
}

export async function updateWork(input: {
  id: string;
  title?: string | undefined;
  category?: string | undefined;
  description?: string | undefined;
  imageKey?: string | undefined;
}): Promise<WorkItem> {
  const items = (await r2GetJson<WorkItem[]>(WORK_MANIFEST)) ?? [];
  const index = items.findIndex((i) => i.id === input.id);
  if (index === -1) throw new Error("This work entry no longer exists.");
  const current = items[index]!;

  let oldKey: string | null = null;
  if (input.imageKey && input.imageKey !== current.imageKey) {
    // Verify the NEW image is stored before dropping the old one.
    if (!(await r2Exists(input.imageKey))) {
      throw new Error("The new image could not be verified. The old image was kept.");
    }
    oldKey = current.imageKey;
  }

  const next: WorkItem = {
    ...current,
    title: input.title ?? current.title,
    category: input.category ?? current.category,
    description: input.description === undefined ? current.description : input.description,
    imageKey: input.imageKey ?? current.imageKey,
    updatedAt: new Date().toISOString(),
  };
  if (!next.description) delete next.description;
  next.imageUrl = r2PublicUrl(next.imageKey);

  items[index] = next;
  await saveWork(items);

  if (oldKey) await r2Delete(oldKey);
  return next;
}

export async function deleteWork(id: string): Promise<void> {
  const items = (await r2GetJson<WorkItem[]>(WORK_MANIFEST)) ?? [];
  const target = items.find((i) => i.id === id);
  if (!target) return;
  await r2Delete(target.imageKey);
  await saveWork(items.filter((i) => i.id !== id));
}

/* ---------------------------------- Reels -------------------------------- */

export async function listReels(): Promise<Reel[]> {
  const items = (await r2GetJson<Reel[]>(REELS_MANIFEST)) ?? [];
  return items
    .filter((r) => r && r.id && (r.reelUrl || r.videoKey))
    .map((r) => ({
      ...r,
      thumbnailUrl: r.thumbnailKey ? r2PublicUrl(r.thumbnailKey) : r.thumbnailUrl,
      videoUrl: r.videoKey ? r2PublicUrl(r.videoKey) : r.videoUrl,
    }))
    .sort(byNewest);
}

async function saveReels(items: Reel[]) {
  await r2PutJson(REELS_MANIFEST, items);
}

export async function createReel(input: { title: string; videoKey: string }): Promise<Reel> {
  if (!(await r2Exists(input.videoKey)))
    throw new Error("The uploaded video could not be verified.");
  const now = new Date().toISOString();
  const reel: Reel = {
    id: newId(),
    title: input.title,
    reelUrl: "",
    videoKey: input.videoKey,
    videoUrl: r2PublicUrl(input.videoKey),
    createdAt: now,
    updatedAt: now,
  };
  const items = (await r2GetJson<Reel[]>(REELS_MANIFEST)) ?? [];
  await saveReels([reel, ...items]);
  return reel;
}

export async function updateReel(input: {
  id: string;
  title?: string | undefined;
  reelUrl?: string | undefined;
  thumbnailUrl?: string | undefined;
  thumbnailKey?: string | undefined;
  videoKey?: string | undefined;
  category?: string | undefined;
}): Promise<Reel> {
  const items = (await r2GetJson<Reel[]>(REELS_MANIFEST)) ?? [];
  const index = items.findIndex((r) => r.id === input.id);
  if (index === -1) throw new Error("This reel no longer exists.");
  const current = items[index]!;

  let oldKey: string | undefined;
  let oldVideoKey: string | undefined;
  if (input.thumbnailKey && input.thumbnailKey !== current.thumbnailKey) {
    if (!(await r2Exists(input.thumbnailKey))) {
      throw new Error("The new thumbnail could not be verified. The old one was kept.");
    }
    oldKey = current.thumbnailKey;
  }

  const next: Reel = {
    ...current,
    title: input.title ?? current.title,
    reelUrl: input.reelUrl ?? current.reelUrl,
    category: input.category === undefined ? current.category : input.category,
    updatedAt: new Date().toISOString(),
  };
  if (input.thumbnailKey) {
    next.thumbnailKey = input.thumbnailKey;
    next.thumbnailUrl = r2PublicUrl(input.thumbnailKey);
  } else if (input.thumbnailUrl !== undefined) {
    delete next.thumbnailKey;
    next.thumbnailUrl = input.thumbnailUrl || undefined;
  }
  if (input.videoKey && input.videoKey !== current.videoKey) {
    if (!(await r2Exists(input.videoKey))) throw new Error("The new video could not be verified.");
    oldVideoKey = current.videoKey;
    next.videoKey = input.videoKey;
    next.videoUrl = r2PublicUrl(input.videoKey);
  }
  if (!next.category) delete next.category;
  if (!next.thumbnailUrl) delete next.thumbnailUrl;

  items[index] = next;
  await saveReels(items);

  if (oldKey) {
    try {
      await r2Delete(oldKey);
    } catch {
      /* ignore */
    }
  }
  if (oldVideoKey) await r2Delete(oldVideoKey);
  return next;
}

export async function deleteReel(id: string): Promise<void> {
  const items = (await r2GetJson<Reel[]>(REELS_MANIFEST)) ?? [];
  const target = items.find((r) => r.id === id);
  if (!target) return;
  if (target.thumbnailKey) {
    await r2Delete(target.thumbnailKey);
  }
  if (target.videoKey) {
    await r2Delete(target.videoKey);
  }
  await saveReels(items.filter((r) => r.id !== id));
}

/* --------------------------------- Uploads ------------------------------- */

export async function storeUpload(
  folder: "ourwork" | "reels",
  file: File,
): Promise<{ key: string; url: string }> {
  const type = file.type.toLowerCase();
  const isVideo = folder === "reels" && (ALLOWED_VIDEO_TYPES as readonly string[]).includes(type);
  if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(type) && !isVideo) {
    throw new Error("Only JPEG, PNG or WebP images are allowed.");
  }
  if (file.size === 0) throw new Error("The selected file is empty.");
  if (file.size > (isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES))
    throw new Error(
      isVideo
        ? "Video is too large. Maximum size is 50 MB."
        : "Image is too large. Maximum size is 8 MB.",
    );

  const ext =
    type === "video/webm"
      ? "webm"
      : type === "video/mp4"
        ? "mp4"
        : type === "image/png"
          ? "png"
          : type === "image/webp"
            ? "webp"
            : "jpg";
  // Key is always server-generated — clients never choose R2 paths.
  const key = `vakratund/${folder}/${newId()}${newId()}.${ext}`;
  if (await r2Exists(key)) throw new Error("Upload collision, please try again.");

  await r2Put(key, await file.arrayBuffer(), type);
  if (!(await r2Exists(key))) throw new Error("Image upload failed. Please try again.");
  return { key, url: r2PublicUrl(key) };
}
