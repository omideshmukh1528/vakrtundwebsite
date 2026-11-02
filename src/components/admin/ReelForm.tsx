import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createReelItem, updateReelItem } from "@/lib/admin.functions";
import type { Reel } from "@/lib/content-schemas";

export default function ReelForm({ item }: { item?: Reel }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [videoKey, setVideoKey] = useState(item?.videoKey ?? "");
  const [preview, setPreview] = useState(item?.videoUrl);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const upload = async (file: File) => {
    if (!["video/mp4", "video/webm"].includes(file.type) || file.size > 50 * 1024 * 1024)
      throw new Error("Use an MP4 or WebM video up to 50 MB.");
    setPreview(URL.createObjectURL(file));
    const form = new FormData();
    form.append("file", file);
    form.append("folder", "reels");
    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error ?? "Video upload failed.");
    setVideoKey(data.key);
  };
  return (
    <form
      className="max-w-xl space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        if (!videoKey) {
          setError("Please upload a video.");
          return;
        }
        const result = item
          ? await updateReelItem({ data: { id: item.id, title, videoKey } })
          : await createReelItem({ data: { title, videoKey } });
        if (result.ok) await nav({ to: "/admin/reels" });
        else setError(result.error);
      }}
    >
      <label className="block text-sm">
        Title *
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-lg border bg-background p-3"
        />
      </label>
      <label className="block text-sm">
        Video * (MP4/WebM, max 50 MB)
        <input
          required={!item}
          type="file"
          accept="video/mp4,video/webm"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file)
              try {
                await upload(file);
              } catch (err) {
                setError(err instanceof Error ? err.message : "Video upload failed.");
              }
          }}
          className="mt-1 w-full rounded-lg border p-3"
        />
        {preview && (
          <video
            src={preview}
            controls
            preload="metadata"
            className="mt-3 max-h-72 w-full rounded-lg bg-black"
          />
        )}
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <button className="rounded-lg bg-orange px-5 py-3 text-white">
        {item ? "Save changes" : "Upload video"}
      </button>
    </form>
  );
}
