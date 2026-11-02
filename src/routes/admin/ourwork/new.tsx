import { createFileRoute } from "@tanstack/react-router";
import WorkForm from "@/components/admin/WorkForm";
export const Route = createFileRoute("/admin/ourwork/new")({
  component: () => (
    <>
      <h1 className="mb-8 font-display text-5xl">Add Work</h1>
      <WorkForm />
    </>
  ),
});
