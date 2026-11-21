
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Scissors,
  Mail,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Email and Password Login
  const handleEmailSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      callbackURL: "http://localhost:3000/auth/redirect",
      
      });

      if (result.error) {
        setError(result.error.message || "Invalid email or password.");
        return;
      }

     router.push("/dashboard");
     router.refresh();
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
    callbackURL: "http://localhost:3000/auth/redirect",
      });

      if (result.error) {
        setError(
          result.error.message || "Google sign in failed."
        );
        setGoogleLoading(false);
      }
    } catch (err) {
      console.error("Google sign in error:", err);
      setError("Unable to connect with Google. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-[#FCFAF7] lg:grid-cols-2">
      {/* LEFT SIDE - BRANDING */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-[#81434F] p-12 text-white lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <Scissors size={23} />
          </div>
          <span className="text-2xl font-bold">SalonBook</span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <Sparkles size={35} className="mb-6 text-[#F2D6C8]" />

          <h1 className="text-5xl font-semibold leading-tight">
            Beauty begins with a little self-care.
          </h1>

          <p className="mt-6 text-base leading-8 text-white/75">
            Book your favorite beauty services, discover new treatments,
            and enjoy a more convenient salon experience with SalonBook.
          </p>
        </div>

        <p className="text-sm text-white/50">
          © 2026 SalonBook. All rights reserved.
        </p>

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-white/10" />
      </section>

      {/* RIGHT SIDE - SIGN IN FORM */}
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          {/* MOBILE BRAND */}
          <Link
            href="/"
            className="mb-12 flex items-center justify-center gap-3 lg:hidden"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#81434F] text-white">
              <Scissors size={23} />
            </div>
            <span className="text-2xl font-bold text-[#29201F]">
              SalonBook
            </span>
          </Link>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9D5964]">
              Welcome Back
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-[#29201F] sm:text-4xl">
              Sign in to your account
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#897F79]">
              Enter your details below to access your SalonBook account.
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* GOOGLE SIGN IN */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#E9DFD8] bg-white text-sm font-bold text-[#29201F] transition hover:bg-[#F8F4F0] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 size={19} className="animate-spin" />
            ) : (
              <svg viewBox="0 0 48 48" className="h-5 w-5">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.01 13.22l7.98 6.19C11.89 13.72 17.42 9.5 24 9.5Z"
                  transform="translate(0 5)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 38.02 46.98 31.92 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M9.99 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
                  transform="translate(0 5)"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.88 2.3-8.18 2.3-6.58 0-12.11-4.22-14.01-10.09l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>
            )}

            {googleLoading
              ? "Connecting to Google..."
              : "Continue with Google"}
          </button>

          {/* DIVIDER */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E9DFD8]" />
            <span className="text-xs font-medium text-[#A69A93]">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-[#E9DFD8]" />
          </div>

          {/* EMAIL AND PASSWORD FORM */}
          <form onSubmit={handleEmailSignIn} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#29201F]"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69A93]"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 w-full rounded-xl border border-[#E9DFD8] bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-[#B5AAA4] focus:border-[#81434F] focus:ring-2 focus:ring-[#81434F]/10"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#29201F]"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69A93]"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 w-full rounded-xl border border-[#E9DFD8] bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-[#B5AAA4] focus:border-[#81434F] focus:ring-2 focus:ring-[#81434F]/10"
                />
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-[#786E68]">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 accent-[#81434F]"
                />
                Remember me
              </label>

              <span className="text-xs text-[#A69A93]">
                Forgot password?
              </span>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#81434F] text-sm font-bold text-white transition hover:bg-[#6F3541] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="text-center text-sm text-[#897F79]">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-[#81434F] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </form>

          <div className="mt-10 border-t border-[#E9DFD8] pt-6 text-center">
            <Link
              href="/services"
              className="text-sm font-semibold text-[#81434F] hover:underline"
            >
              Explore services without signing in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
