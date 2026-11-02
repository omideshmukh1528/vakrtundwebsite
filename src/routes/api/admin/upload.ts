import { createFileRoute } from "@tanstack/react-router";
import { isAdmin } from "@/lib/admin-session.server";
import { storeUpload } from "@/lib/content-store.server";

/**
 * Authenticated image upload. The browser never receives R2 credentials and
 * never chooses the R2 key — the server generates it.
 */
export const Route = createFileRoute("/api/admin/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await isAdmin())) {
          return Response.json(
            { ok: false, error: "Your session has expired. Please log in again." },
            { status: 401 },
          );
        }

        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return Response.json({ ok: false, error: "Invalid upload request." }, { status: 400 });
        }

        const file = form.get("file");
        const folderRaw = String(form.get("folder") ?? "ourwork");
        const folder = folderRaw === "reels" ? "reels" : "ourwork";

        if (!(file instanceof File)) {
          return Response.json({ ok: false, error: "No image selected." }, { status: 400 });
        }

        try {
          const stored = await storeUpload(folder, file);
          return Response.json({ ok: true, ...stored });
        } catch (error) {
          const message =
            error instanceof Error && error.message
              ? error.message
              : "Image upload failed. Please try again.";
          console.error("upload failed", error);
          return Response.json({ ok: false, error: message }, { status: 400 });
        }
      },
    },
  },
});
