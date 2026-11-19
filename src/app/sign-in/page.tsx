
import Link from "next/link";
import {
  Scissors,
  Mail,
  LockKeyhole,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function SignInPage() {
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

          <form className="mt-9 space-y-6">
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
              type="button"
              disabled
              className="flex h-14 w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl bg-[#81434F] text-sm font-bold text-white opacity-70"
            >
              Sign In
              <ArrowRight size={18} />
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
