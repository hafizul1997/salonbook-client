
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#F4EEEA] px-5 py-20 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#81434F] px-7 py-16 text-center text-white sm:px-12 lg:py-20">

        {/* DECORATIVE ELEMENTS */}
        <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

        {/* CONTENT */}
        <div className="relative mx-auto max-w-2xl">

          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-[#F1C9C7]">
            <Sparkles size={16} />
            Your Beauty Journey Starts Here
          </div>

          <h2 className="mt-7 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
            Ready for a Little
            <span className="block font-serif italic text-[#F1C9C7]">
              Self-Care?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
            Give yourself the care you deserve. Explore our beauty
            services and book your next salon appointment today.
          </p>

          {/* BUTTONS */}
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#81434F] transition hover:bg-[#f4e9e5]"
            >
              <CalendarDays size={18} />
              Book Appointment
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
              <ArrowRight size={17} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
