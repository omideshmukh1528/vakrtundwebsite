import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

/** Shared-owner admin gate. SERVER ONLY. */

type AdminSession = { admin?: boolean; since?: string };

function sessionConfig() {
  const password = process.env["SESSION_SECRET"];
  if (!password || password.length < 32) {
    throw new Error("SESSION_SECRET is not set (needs 32+ characters).");
  }
  return {
    password,
    name: "vk-admin",
    maxAge: 60 * 60 * 12,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  try {
    const session = await useSession<AdminSession>(sessionConfig());
    return session.data.admin === true;
  } catch {
    return false;
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Your session has expired. Please log in again.");
    this.name = "UnauthorizedError";
  }
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new UnauthorizedError();
}

export async function signIn(password: string): Promise<boolean> {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) throw new Error("ADMIN_PASSWORD is not set on the server.");
  if (!password || !matches(password, expected)) return false;
  const session = await useSession<AdminSession>(sessionConfig());
  await session.update({ admin: true, since: new Date().toISOString() });
  return true;
}

export async function signOut(): Promise<void> {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
}
