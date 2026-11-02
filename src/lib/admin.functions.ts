import { createServerFn } from "@tanstack/react-start";
import {
  adminDashboard,
  adminSignIn,
  adminSignOut,
  adminStatus,
  adminWorkList,
  adminReelList,
  adminWorkCreate,
  adminWorkUpdate,
  adminWorkDelete,
  adminReelCreate,
  adminReelUpdate,
  adminReelDelete,
} from "./admin-content.server";
import {
  reelInputSchema,
  reelUpdateSchema,
  workInputSchema,
  workUpdateSchema,
} from "./content-schemas";

export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => ({ password: String(data.password ?? "") }))
  .handler(async ({ data }) => adminSignIn(data.password));

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => adminSignOut());

export const adminMe = createServerFn({ method: "GET" }).handler(async () => adminStatus());

export const adminStats = createServerFn({ method: "GET" }).handler(async () => adminDashboard());

export const listAdminWork = createServerFn({ method: "GET" }).handler(async () => adminWorkList());

export const createWorkItem = createServerFn({ method: "POST" })
  .validator((data: unknown) => workInputSchema.parse(data))
  .handler(async ({ data }) => adminWorkCreate(data));

export const updateWorkItem = createServerFn({ method: "POST" })
  .validator((data: unknown) => workUpdateSchema.parse(data))
  .handler(async ({ data }) => adminWorkUpdate(data));

export const deleteWorkItem = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data }) => adminWorkDelete(data.id));

export const listAdminReels = createServerFn({ method: "GET" }).handler(async () =>
  adminReelList(),
);

export const createReelItem = createServerFn({ method: "POST" })
  .validator((data: unknown) => reelInputSchema.parse(data))
  .handler(async ({ data }) => adminReelCreate(data));

export const updateReelItem = createServerFn({ method: "POST" })
  .validator((data: unknown) => reelUpdateSchema.parse(data))
  .handler(async ({ data }) => adminReelUpdate(data));

export const deleteReelItem = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data }) => adminReelDelete(data.id));
