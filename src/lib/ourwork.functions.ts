import { createServerFn } from "@tanstack/react-start";
import { publicWork, publicReels } from "./public-content.server";

/** Public, read-only content for the website. */

export const getPublicWork = createServerFn({ method: "GET" })
  .validator((data: { limit?: number } | undefined) => ({
    limit: data?.limit && data.limit > 0 ? Math.min(Math.floor(data.limit), 200) : undefined,
  }))
  .handler(async ({ data }) => publicWork(data.limit));

export const getPublicReels = createServerFn({ method: "GET" })
  .validator((data: { limit?: number } | undefined) => ({
    limit: data?.limit && data.limit > 0 ? Math.min(Math.floor(data.limit), 200) : undefined,
  }))
  .handler(async ({ data }) => publicReels(data.limit));
