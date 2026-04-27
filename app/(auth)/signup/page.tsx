"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { signUp } from "@/lib/actions/auth";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signUp, null);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-main py-12 px-4 sm:px-6 lg:px-8">
      {/* Premium ambient background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 blur-[120px] bg-primary -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-10 blur-[120px] bg-secondary -z-10 pointer-events-none" />

      <Container className="max-w-md w-full relative z-10">
        <div className="p-10 shadow-2xl border border-border-subtle bg-bg-card/40 backdrop-blur-xl rounded-[2.5rem]">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-50 tracking-tight mb-4 leading-tight">Create Account</h1>
            <p className="text-text-secondary font-medium text-base">Start your journey today</p>
          </div>

          <form action={formAction} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-xs uppercase font-bold text-text-secondary ml-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-primary placeholder:text-gray-700 font-bold tracking-tight shadow-inner"
                placeholder="name@company.com"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-xs uppercase font-bold text-text-secondary ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-primary placeholder:text-gray-700 font-bold tracking-tight shadow-inner"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-xs uppercase font-bold text-text-secondary ml-1">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-primary placeholder:text-gray-700 font-bold tracking-tight shadow-inner"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <p className="text-red-400 text-sm font-bold text-center">{state.error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 mt-4 uppercase text-[10px]"
            >
              {isPending ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-12 text-center text-sm text-text-secondary font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline ml-1">
              Log in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
