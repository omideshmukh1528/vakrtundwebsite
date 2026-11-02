import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listAdminWork } from "@/lib/admin.functions";
import WorkForm from "@/components/admin/WorkForm";
import type { WorkItem } from "@/lib/content-schemas";
export const Route = createFileRoute("/admin/ourwork/$id/edit")({ component: Edit });
function Edit() {
  const { id } = Route.useParams();
  const [item, setItem] = useState<WorkItem>();
  useEffect(() => {
    listAdminWork().then((r) => {
      if (r.ok) setItem(r.data.find((x) => x.id === id));
    });
  }, [id]);
  return (
    <>
      {!item ? (
        <p>Loading…</p>
      ) : (
        <>
          <h1 className="mb-8 font-display text-5xl">Edit Work</h1>
          <WorkForm item={item} />
        </>
      )}
    </>
  );
}
