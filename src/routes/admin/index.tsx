import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { adminStats } from "@/lib/admin.functions";
export const Route = createFileRoute("/admin/")({ component: Dashboard });
type Stats = { totalWork: number; totalReels: number; recent: unknown[] };
function Dashboard() {
  const [d, setD] = useState<Stats>();
  const [e, setE] = useState("");
  useEffect(() => {
    adminStats().then((r) => (r.ok ? setD(r.data) : setE(r.error)));
  }, []);
  return (
    <>
      <h1 className="font-display text-5xl">Dashboard</h1>
      {e && <p className="mt-6 text-red-500">{e}</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Total Our Work", d?.totalWork],
          ["Recent Our Work", d?.recent?.length],
          ["Total Reels", d?.totalReels],
        ].map(([l, v]) => (
          <div className="rounded-2xl border bg-card p-6" key={String(l)}>
            <p className="text-sm text-muted-foreground">{l}</p>
            <p className="mt-2 text-4xl font-bold">{v ?? "—"}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Link
          to="/admin/ourwork"
          className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
        >
          Manage Our Work
        </Link>
        <Link to="/admin/reels" className="rounded-lg border px-4 py-2">
          Manage Reels
        </Link>
      </div>
    </>
  );
}
