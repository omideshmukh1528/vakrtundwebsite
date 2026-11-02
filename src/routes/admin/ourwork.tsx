import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listAdminWork, deleteWorkItem } from "@/lib/admin.functions";
import { formatDate, type WorkItem } from "@/lib/content-schemas";
export const Route = createFileRoute("/admin/ourwork")({ component: WorkList });
function WorkList() {
  const location = useLocation();
  const childActive =
    location.pathname !== "/admin/ourwork" && location.pathname !== "/admin/ourwork/";
  const [items, setItems] = useState<WorkItem[]>([]);
  const [error, setError] = useState("");
  const load = () => listAdminWork().then((r) => (r.ok ? setItems(r.data) : setError(r.error)));
  useEffect(() => {
    load();
  }, []);
  return (
    <>
      {!childActive && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="font-display text-5xl">Our Work</h1>
            <Link to="/admin/ourwork/new" className="rounded-lg bg-orange px-4 py-2 text-white">
              + Add Work
            </Link>
          </div>
          {error && <p className="mt-6 text-red-500">{error}</p>}
          <div className="mt-8 overflow-x-auto rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Created</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-t">
                    <td className="p-3">
                      <img src={i.imageUrl} className="h-12 w-16 rounded object-cover" />
                    </td>
                    <td className="p-3 font-medium">{i.title}</td>
                    <td className="p-3">{i.category}</td>
                    <td className="p-3">{formatDate(i.createdAt)}</td>
                    <td className="p-3">
                      <Link
                        to="/admin/ourwork/$id/edit"
                        params={{ id: i.id }}
                        className="mr-3 text-primary"
                      >
                        Edit
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={async () => {
                          if (confirm("Delete this work?")) {
                            await deleteWorkItem({ data: { id: i.id } });
                            load();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Outlet />
    </>
  );
}
