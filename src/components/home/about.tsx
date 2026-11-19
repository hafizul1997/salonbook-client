
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";

const benefits = [
  "Professional beauty specialists",
  "Premium quality beauty products",
  "Personalized customer experience",
  "Easy and convenient online booking",
];

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-[#81434F] px-5 py-20 text-white lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative">
          <div
            className="h-[380px] rounded-[120px_120px_24px_24px] bg-cover bg-center sm:h-[500px]"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1200)",
            }}
            role="img"
            aria-label="Beautiful modern salon interior"
          />

          {/* FLOATING EXPERIENCE CARD */}
          <div className="absolute -bottom-6 -right-2 rounded-2xl bg-white p-5 text-[#29201F] shadow-xl sm:-right-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#f7eeeb] p-3 text-[#81434F]">
                <Heart size={23} />
              </div>

              <div>
                <p className="text-lg font-bold">Beauty First</p>
                <p className="text-xs text-[#897f79]">
                  Your confidence matters
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-[#f7dfe0]">
            <Sparkles size={16} />
            The SalonBook Experience
          </div>

          <h2 className="max-w-xl text-4xl leading-tight font-semibold sm:text-5xl">
            Beauty is not a luxury.
            <span className="block font-serif italic text-[#F1C9C7]">
              It is self-care.
            </span>
          </h2>

          <p className="mt-6 text-sm leading-8 text-white/75 sm:text-base">
            At SalonBook, we believe everyone deserves a moment to relax,
            refresh, and feel confident. Our platform makes discovering
            professional salon services and booking appointments simple
            and convenient.
          </p>

          {/* BENEFITS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-[#F1C9C7]"
                />
                <p className="text-sm text-white/90">{benefit}</p>
              </div>
            ))}
          </div>

          {/* ACTION BUTTON */}
          <Link
            href="/services"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#81434F] transition hover:bg-[#f4e9e5]"
          >
            Explore Our Services
            <ArrowRight size={18} />
          </Link>

          {/* SMALL TRUST INDICATORS */}
          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/20 pt-8">
            <div className="flex items-center gap-3">
              <Users size={23} className="text-[#F1C9C7]" />
              <div>
                <p className="text-sm font-bold">Customer Focused</p>
                <p className="text-xs text-white/60">
                  Designed around you
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Heart size={23} className="text-[#F1C9C7]" />
              <div>
                <p className="text-sm font-bold">Quality Care</p>
                <p className="text-xs text-white/60">
                  Every visit matters
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
