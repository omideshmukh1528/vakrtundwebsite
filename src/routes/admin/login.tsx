import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { adminLogin } from "@/lib/admin.functions";
export const Route = createFileRoute("/admin/login")({ component: Login });
function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite px-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          const r = await adminLogin({ data: { password } });
          if (r.ok) await nav({ to: "/admin" });
          else setError(r.error);
        }}
        className="w-full max-w-sm rounded-2xl border border-border-dark bg-charcoal p-8"
      >
        <p className="text-xs tracking-widest text-orange uppercase">Owner access</p>
        <h1 className="mt-2 font-display text-5xl text-text-light">Admin login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-8 w-full rounded-lg border border-border-dark bg-graphite p-3 text-text-light"
          required
        />
        <button className="mt-4 w-full rounded-lg bg-orange p-3 font-semibold text-white">
          Sign in
        </button>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </form>
    </div>
  );
}
