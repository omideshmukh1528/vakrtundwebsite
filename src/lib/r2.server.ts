import { AwsClient } from "aws4fetch";

/**
 * Cloudflare R2 access. SERVER ONLY — never import from client code.
 * Credentials come from server-side env vars (never VITE_*).
 */

export class R2ConfigError extends Error {
  constructor(missing: string[]) {
    super(`Cloudflare R2 is not configured yet (missing: ${missing.join(", ")}).`);
    this.name = "R2ConfigError";
  }
}

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicBaseUrl: string;
};

/** Read env inside handlers only — Workers inject env per request. */
export function r2Config(): R2Config {
  const cfg = {
    accountId: process.env["R2_ACCOUNT_ID"] ?? "",
    accessKeyId: process.env["R2_ACCESS_KEY_ID"] ?? "",
    secretAccessKey: process.env["R2_SECRET_ACCESS_KEY"] ?? "",
    bucket: process.env["R2_BUCKET"] ?? "",
    publicBaseUrl: (process.env["R2_PUBLIC_BASE_URL"] ?? "").replace(/\/+$/, ""),
  };
  const missing = Object.entries(cfg)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    const names: Record<string, string> = {
      accountId: "R2_ACCOUNT_ID",
      accessKeyId: "R2_ACCESS_KEY_ID",
      secretAccessKey: "R2_SECRET_ACCESS_KEY",
      bucket: "R2_BUCKET",
      publicBaseUrl: "R2_PUBLIC_BASE_URL",
    };
    throw new R2ConfigError(missing.map((m) => names[m] ?? m));
  }
  if (!/^[a-f0-9]{32}$/i.test(cfg.accountId)) {
    throw new R2ConfigError(["R2_ACCOUNT_ID (must be the 32-character account ID, not a URL)"]);
  }
  try {
    const parsed = new URL(cfg.publicBaseUrl);
    if (!/^https?:$/.test(parsed.protocol) || !parsed.hostname) throw new Error();
  } catch {
    throw new R2ConfigError(["R2_PUBLIC_BASE_URL (must be an absolute http(s) URL)"]);
  }
  return cfg;
}

function client(cfg: R2Config) {
  return new AwsClient({
    accessKeyId: cfg.accessKeyId,
    secretAccessKey: cfg.secretAccessKey,
    service: "s3",
    region: "auto",
  });
}

function objectUrl(cfg: R2Config, key: string) {
  const encoded = key
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `https://${cfg.accountId}.r2.cloudflarestorage.com/${cfg.bucket}/${encoded}`;
}

/** Public CDN / custom-domain URL for a stored object. */
export function r2PublicUrl(key: string): string {
  const cfg = r2Config();
  return `${cfg.publicBaseUrl}/${key
    .split("/")
    .map((p) => encodeURIComponent(p))
    .join("/")}`;
}

export async function r2Put(key: string, body: ArrayBuffer | string, contentType: string) {
  const cfg = r2Config();
  const res = await client(cfg).fetch(objectUrl(cfg, key), {
    method: "PUT",
    body,
    headers: { "content-type": contentType },
  });
  if (!res.ok) throw new Error(`R2 upload failed (${res.status})`);
}

export async function r2Exists(key: string): Promise<boolean> {
  const cfg = r2Config();
  const res = await client(cfg).fetch(objectUrl(cfg, key), { method: "HEAD" });
  return res.ok;
}

export async function r2Delete(key: string): Promise<void> {
  const cfg = r2Config();
  const res = await client(cfg).fetch(objectUrl(cfg, key), { method: "DELETE" });
  if (!res.ok && res.status !== 404) throw new Error(`R2 delete failed (${res.status})`);
}

export async function r2GetJson<T>(key: string): Promise<T | null> {
  const cfg = r2Config();
  const res = await client(cfg).fetch(objectUrl(cfg, key), { method: "GET" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`R2 read failed (${res.status})`);
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function r2PutJson(key: string, value: unknown): Promise<void> {
  await r2Put(key, JSON.stringify(value, null, 2), "application/json");
}
