
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Scissors,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const redirectUrl = "/auth/redirect?returnTo=%2Fdashboard";

      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: `${window.location.origin}${redirectUrl}`,
      });

      if (result.error) {
        setError(
          result.error.message || "Unable to create your account."
        );
        return;
      }

      router.replace(redirectUrl);
      router.refresh();
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-[#FCFAF7] lg:grid-cols-2">
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
            Your beauty journey starts here.
          </h1>

          <p className="mt-6 text-base leading-8 text-white/75">
            Create your SalonBook account and discover a better
            way to book your favorite beauty and wellness services.
          </p>
        </div>

        <p className="text-sm text-white/50">
          © 2026 SalonBook. All rights reserved.
        </p>

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-white/10" />
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-10 flex items-center justify-center gap-3 lg:hidden"
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
              Get Started
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-[#29201F] sm:text-4xl">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#897F79]">
              Join SalonBook and make your next beauty appointment easier.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#29201F]"
              >
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69A93]"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-13 w-full rounded-xl border border-[#E9DFD8] bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-[#B5AAA4] focus:border-[#81434F] focus:ring-2 focus:ring-[#81434F]/10"
                />
              </div>
            </div>

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
                  className="h-13 w-full rounded-xl border border-[#E9DFD8] bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-[#B5AAA4] focus:border-[#81434F] focus:ring-2 focus:ring-[#81434F]/10"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-13 w-full rounded-xl border border-[#E9DFD8] bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-[#B5AAA4] focus:border-[#81434F] focus:ring-2 focus:ring-[#81434F]/10"
                />
              </div>

              <p className="mt-2 text-xs text-[#A69A93]">
                Password must contain at least 8 characters.
              </p>
            </div>

            <label className="flex items-start gap-3 text-xs leading-6 text-[#786E68]">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-[#81434F]"
              />

              <span>
                I agree to the SalonBook Terms of Service and Privacy Policy.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#81434F] text-sm font-bold text-white transition hover:bg-[#6F3541] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="text-center text-sm text-[#897F79]">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-[#81434F] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>

          <div className="mt-8 border-t border-[#E9DFD8] pt-6 text-center">
            <Link
              href="/services"
              className="text-sm font-semibold text-[#81434F] hover:underline"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
