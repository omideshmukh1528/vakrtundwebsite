import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listAdminReels, deleteReelItem } from "@/lib/admin.functions";
import { formatDate, type Reel } from "@/lib/content-schemas";
export const Route = createFileRoute("/admin/reels")({ component: Reels });
function Reels() {
  const location = useLocation();
  const childActive = location.pathname !== "/admin/reels" && location.pathname !== "/admin/reels/";
  const [items, setItems] = useState<Reel[]>([]);
  const load = () =>
    listAdminReels().then((r) => {
      if (r.ok) setItems(r.data);
    });
  useEffect(() => {
    load();
  }, []);
  return (
    <>
      {!childActive && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="font-display text-5xl">Reels</h1>
            <Link to="/admin/reels/new" className="rounded-lg bg-orange px-4 py-2 text-white">
              + Add Reel
            </Link>
          </div>
          <div className="mt-8 grid gap-4">
            {items.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border bg-card p-4"
              >
                <div>
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.category || "Uncategorised"} · {formatDate(r.createdAt)}
                  </p>
                </div>
                <div>
                  <Link
                    to="/admin/reels/$id/edit"
                    params={{ id: r.id }}
                    className="mr-4 text-primary"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-500"
                    onClick={async () => {
                      if (confirm("Delete this reel?")) {
                        await deleteReelItem({ data: { id: r.id } });
                        load();
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Outlet />
    </>
  );
}
