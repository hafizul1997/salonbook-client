
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Sparkles,
  Star,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#FCFAF7]">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">

        {/* LEFT CONTENT */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#ead8d3] bg-[#f7eeeb] px-4 py-2 text-sm text-[#81434F]">
            <Sparkles size={16} />
            Your Beauty, Our Passion
          </div>

          <h1 className="max-w-xl text-5xl leading-[1.15] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Discover Your
            <span className="block font-serif italic text-[#9D5964]">
              Beautiful Self.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#786e68]">
            Experience luxury beauty and self-care. Discover exceptional
            salon services and book your next appointment with ease.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 rounded-full bg-[#81434F] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#69343F]"
            >
              Explore Services
              <ArrowRight size={18} />
            </Link>

            <Link
              href="#about"
              className="rounded-full border border-[#ded3cc] px-7 py-4 text-sm font-semibold transition hover:bg-[#f4ece7]"
            >
              Discover More
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <div>
              <p className="text-2xl font-bold">2.5k+</p>
              <p className="mt-1 text-xs text-[#897f79]">
                Happy Clients
              </p>
            </div>

            <div className="h-10 w-px bg-[#ded3cc]" />

            <div>
              <p className="flex items-center gap-1 text-2xl font-bold">
                4.9
                <Star
                  size={17}
                  className="fill-[#D8A34C] text-[#D8A34C]"
                />
              </p>
              <p className="mt-1 text-xs text-[#897f79]">
                Client Rating
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mx-auto w-full max-w-xl">
          <div
            className="h-[430px] rounded-[180px_180px_24px_24px] bg-cover bg-center shadow-xl sm:h-[550px]"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200)",
            }}
          />

          {/* FLOATING BOOKING CARD */}
          <div className="absolute -bottom-5 -left-2 rounded-2xl border border-[#eee6df] bg-white p-5 shadow-xl sm:-left-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#f7eeeb] p-3 text-[#81434F]">
                <CalendarDays size={23} />
              </div>

              <div>
                <p className="text-sm font-bold">
                  Easy Booking
                </p>
                <p className="text-xs text-[#897f79]">
                  Your time, your choice
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
