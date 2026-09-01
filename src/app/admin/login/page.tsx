"use client";

import { useActionState } from "react";
import { Logo } from "@/components/layout/Logo";
import { loginAdmin, type LoginState } from "@/lib/actions/adminAuth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-black-deep px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-xl font-semibold text-charcoal">Admin Sign In</h1>
        <form action={formAction} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-charcoal">Email</span>
            <input type="email" name="email" required autoComplete="username" className="input mt-1" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-charcoal">Password</span>
            <input type="password" name="password" required autoComplete="current-password" className="input mt-1" />
          </label>
          {state.error && <p className="text-sm text-red-600">{state.error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-brand-black py-2.5 text-sm font-semibold text-white hover:bg-brand-black-deep disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
