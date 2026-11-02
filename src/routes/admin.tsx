import { createFileRoute, Link, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { adminMe, adminLogout } from "@/lib/admin.functions";
export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const s = await adminMe();
    if (!s.authenticated && location.pathname !== "/admin/login")
      throw redirect({ to: "/admin/login" });
  },
  component: AdminLayout,
});
function AdminLayout() {
  const [dark, setDark] = useState(false);
  const router = useRouter();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);
  const logout = async () => {
    await adminLogout();
    await router.navigate({ to: "/admin/login" });
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card p-6 md:block">
        <p className="font-display text-3xl">VAKRATUND</p>
        <nav className="mt-10 grid gap-2 text-sm">
          <Link to="/admin" className="rounded-lg px-3 py-2 hover:bg-muted">
            Dashboard
          </Link>
          <Link to="/admin/ourwork" className="rounded-lg px-3 py-2 hover:bg-muted">
            Our Work
          </Link>
          <Link to="/admin/reels" className="rounded-lg px-3 py-2 hover:bg-muted">
            Reels
          </Link>
        </nav>
        <button onClick={logout} className="absolute bottom-8 left-9 text-sm text-muted-foreground">
          Log out
        </button>
      </aside>
      <main className="md:ml-64">
        <div className="flex items-center justify-between border-b bg-card p-4">
          <span className="font-display text-2xl">VAKRATUND</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              title={dark ? "Light theme" : "Dark theme"}
              onClick={() => setDark((value) => !value)}
              className="rounded-full border p-2 text-muted-foreground transition-colors hover:border-orange hover:text-orange"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={logout}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Log out
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-6xl p-5 sm:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
