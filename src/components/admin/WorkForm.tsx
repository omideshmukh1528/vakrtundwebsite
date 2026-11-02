import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createWorkItem, updateWorkItem } from "@/lib/admin.functions";
import { WORK_CATEGORIES, type WorkItem } from "@/lib/content-schemas";
export default function WorkForm({ item }: { item?: WorkItem }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? WORK_CATEGORIES[0]);
  const [description, setDescription] = useState(item?.description ?? "");
  const [imageKey, setImageKey] = useState(item?.imageKey ?? "");
  const [preview, setPreview] = useState(item?.imageUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const upload = async (file: File) => {
    if (
      file.size > 8 * 1024 * 1024 ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    ) {
      setError("Use a JPEG, PNG or WebP image up to 8 MB.");
      return;
    }
    setPreview(URL.createObjectURL(file));
    const f = new FormData();
    f.append("file", file);
    f.append("folder", "ourwork");
    const res = await fetch("/api/admin/upload", { method: "POST", body: f });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error);
    setImageKey(data.key);
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        if (!imageKey) {
          setError("Please upload an image.");
          return;
        }
        setBusy(true);
        const r = item
          ? await updateWorkItem({ data: { id: item.id, title, category, description, imageKey } })
          : await createWorkItem({ data: { title, category, description, imageKey } });
        setBusy(false);
        if (r.ok) await nav({ to: "/admin/ourwork" });
        else setError(r.error);
      }}
      className="max-w-xl space-y-5"
    >
      <label className="block text-sm">
        Title *
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border bg-background p-3"
        />
      </label>
      <label className="block text-sm">
        Category *
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-lg border bg-background p-3"
        >
          {WORK_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-lg border bg-background p-3"
          rows={3}
        />
      </label>
      <label className="block text-sm">
        Image {item ? "(optional replacement)" : "*"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f)
              try {
                await upload(f);
              } catch (err) {
                setError(err instanceof Error ? err.message : "Upload failed");
              }
          }}
          className="mt-1 w-full rounded-lg border p-3"
        />
        {preview && <img src={preview} className="mt-3 h-48 w-full rounded-lg object-cover" />}
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button disabled={busy} className="rounded-lg bg-orange px-5 py-3 font-semibold text-white">
        {busy ? "Saving…" : item ? "Save changes" : "Create work"}
      </button>
    </form>
  );
}
