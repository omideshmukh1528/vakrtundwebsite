import { createFileRoute } from "@tanstack/react-router";
import ReelForm from "@/components/admin/ReelForm";
export const Route = createFileRoute("/admin/reels/new")({
  component: () => (
    <>
      <h1 className="mb-8 font-display text-5xl">Add Reel</h1>
      <ReelForm />
    </>
  ),
});
