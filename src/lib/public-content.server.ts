import { listReels, listWork } from "./content-store.server";
import type { Reel, WorkItem } from "./content-schemas";

/**
 * Public read paths never throw: an unconfigured or unreachable R2 must
 * degrade to an empty gallery with a friendly message, not a blank page.
 */

export type PublicWorkResult = { items: WorkItem[]; error: string | null };
export type PublicReelsResult = { items: Reel[]; error: string | null };

export async function publicWork(limit?: number): Promise<PublicWorkResult> {
  try {
    const items = await listWork();
    return { items: limit ? items.slice(0, limit) : items, error: null };
  } catch (error) {
    console.error("publicWork failed", error);
    return { items: [], error: "Unable to load Our Work. Please try again." };
  }
}

export async function publicReels(limit?: number): Promise<PublicReelsResult> {
  try {
    const items = await listReels();
    return { items: limit ? items.slice(0, limit) : items, error: null };
  } catch (error) {
    console.error("publicReels failed", error);
    return { items: [], error: "Unable to load reels. Please try again." };
  }
}
