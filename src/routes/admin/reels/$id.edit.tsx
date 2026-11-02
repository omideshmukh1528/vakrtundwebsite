import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listAdminReels } from "@/lib/admin.functions";
import ReelForm from "@/components/admin/ReelForm";
import type { Reel } from "@/lib/content-schemas";
export const Route = createFileRoute("/admin/reels/$id/edit")({ component: Edit });
function Edit() {
  const { id } = Route.useParams();
  const [item, setItem] = useState<Reel>();
  useEffect(() => {
    listAdminReels().then((r) => {
      if (r.ok) setItem(r.data.find((x) => x.id === id));
    });
  }, [id]);
  return !item ? (
    <p>Loading…</p>
  ) : (
    <>
      <h1 className="mb-8 font-display text-5xl">Edit Reel</h1>
      <ReelForm item={item} />
    </>
  );
}
