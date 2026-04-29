"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { loginWithCredentials, loginWithGoogle } from "@/lib/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginWithCredentials, null);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-main py-12 px-4 sm:px-6 lg:px-8">
      {/* Premium ambient background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[600px] opacity-20 blur-[120px] bg-gradient-to-b from-primary to-transparent -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 blur-[100px] bg-secondary -z-10 pointer-events-none" />

      <Container className="max-w-md w-full relative z-10">
        <div className="p-10 shadow-2xl border border-border-subtle bg-bg-card/40 backdrop-blur-xl rounded-[2.5rem]">
          <div className="text-center mb-10 relative">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 border border-primary/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h1 className="text-[28px] md:text-[36px] font-bold text-text-heading tracking-tight mb-4 leading-tight">Welcome Back</h1>
            <p className="text-text-secondary font-medium text-base">Sign in to your account to continue</p>
          </div>

          <form action={formAction} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary ml-1">
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
              <label className="block text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary ml-1">
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

            {state?.error && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-2xl">
                <p className="text-warning text-sm font-bold text-center">{state.error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 mt-4 uppercase text-[12px] tracking-[0.08em] font-medium"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-subtle/50"></div>
            </div>
            <div className="relative flex justify-center text-[11px] font-medium tracking-[0.08em] uppercase">
              <span className="px-6 bg-bg-card/0 text-text-secondary backdrop-blur-sm">Or continue with</span>
            </div>
          </div>

          <form action={loginWithGoogle}>
            <button
              type="submit"
              className="group w-full h-12 flex items-center justify-center gap-3 border border-border-subtle bg-bg-main hover:bg-bg-card rounded-xl transition-all font-bold text-text-primary shadow-sm active:scale-[0.98]"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                />
              </svg>
              Google
            </button>
          </form>

          <p className="mt-12 text-center text-sm text-text-secondary font-medium">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-bold hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
