import { isAdmin, requireAdmin, signIn, signOut } from "./admin-session.server";
import {
  createReel,
  createWork,
  deleteReel,
  deleteWork,
  listReels,
  listWork,
  updateReel,
  updateWork,
} from "./content-store.server";
import type { Reel, WorkItem } from "./content-schemas";

/** Admin operations. Every function authorises server-side. */

export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

function fail(error: unknown): { ok: false; error: string } {
  const message =
    error instanceof Error && error.message ? error.message : "Something went wrong. Please retry.";
  console.error("admin action failed", error);
  return { ok: false, error: message };
}

export async function adminSignIn(password: string) {
  try {
    const ok = await signIn(password);
    return ok ? { ok: true as const } : { ok: false as const, error: "Incorrect password." };
  } catch (error) {
    return fail(error);
  }
}

export async function adminSignOut() {
  await signOut();
  return { ok: true as const };
}

export async function adminStatus() {
  return { authenticated: await isAdmin() };
}

export async function adminWorkList(): Promise<ActionResult<WorkItem[]>> {
  try {
    await requireAdmin();
    return { ok: true, data: await listWork() };
  } catch (error) {
    return fail(error);
  }
}

export async function adminReelList(): Promise<ActionResult<Reel[]>> {
  try {
    await requireAdmin();
    return { ok: true, data: await listReels() };
  } catch (error) {
    return fail(error);
  }
}

export async function adminDashboard(): Promise<
  ActionResult<{ totalWork: number; totalReels: number; recent: WorkItem[] }>
> {
  try {
    await requireAdmin();
    const [work, reels] = await Promise.all([listWork(), listReels()]);
    return {
      ok: true,
      data: { totalWork: work.length, totalReels: reels.length, recent: work.slice(0, 5) },
    };
  } catch (error) {
    return fail(error);
  }
}

export async function adminWorkCreate(input: {
  title: string;
  category: string;
  description?: string | undefined;
  imageKey: string;
}): Promise<ActionResult<WorkItem>> {
  try {
    await requireAdmin();
    return {
      ok: true,
      data: await createWork({
        title: input.title,
        category: input.category,
        ...(input.description ? { description: input.description } : {}),
        imageKey: input.imageKey,
      }),
    };
  } catch (error) {
    return fail(error);
  }
}

export async function adminWorkUpdate(input: {
  id: string;
  title?: string | undefined;
  category?: string | undefined;
  description?: string | undefined;
  imageKey?: string | undefined;
}): Promise<ActionResult<WorkItem>> {
  try {
    await requireAdmin();
    return { ok: true, data: await updateWork(input) };
  } catch (error) {
    return fail(error);
  }
}

export async function adminWorkDelete(id: string): Promise<ActionResult<null>> {
  try {
    await requireAdmin();
    await deleteWork(id);
    return { ok: true, data: null };
  } catch (error) {
    return fail(error);
  }
}

export async function adminReelCreate(input: {
  title: string;
  videoKey?: string | undefined;
}): Promise<ActionResult<Reel>> {
  try {
    await requireAdmin();
    return {
      ok: true,
      data: await createReel({ title: input.title, videoKey: input.videoKey! }),
    };
  } catch (error) {
    return fail(error);
  }
}

export async function adminReelUpdate(input: {
  id: string;
  title?: string | undefined;
  reelUrl?: string | undefined;
  thumbnailUrl?: string | undefined;
  thumbnailKey?: string | undefined;
  videoKey?: string | undefined;
  category?: string | undefined;
}): Promise<ActionResult<Reel>> {
  try {
    await requireAdmin();
    return { ok: true, data: await updateReel(input) };
  } catch (error) {
    return fail(error);
  }
}

export async function adminReelDelete(id: string): Promise<ActionResult<null>> {
  try {
    await requireAdmin();
    await deleteReel(id);
    return { ok: true, data: null };
  } catch (error) {
    return fail(error);
  }
}
