import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Star,
  Scissors,
  Sparkles,
  Heart,
  MapPin,
  Phone,
  CalendarDays,
} from "lucide-react";

const services = [
  {
    name: "Signature Haircut",
    category: "Hair Styling",
    price: 45,
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
  },
  {
    name: "Luxury Facial",
    category: "Skincare",
    price: 65,
    duration: "60 min",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
  },
  {
    name: "Hair Coloring",
    category: "Hair Color",
    price: 90,
    duration: "90 min",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
  },
];

const categories = [
  { name: "Hair Styling", icon: Scissors },
  { name: "Skincare", icon: Sparkles },
  { name: "Spa & Massage", icon: Heart },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FCFAF7] text-[#29201F]">

      {/* ================= NAVBAR ================= */}

      <Navbar />
      {/* ================= HERO SECTION ================= */}

      <Hero />

      {/* ================= CATEGORIES ================= */}

      <Categories />
      {/* ================= FEATURED SERVICES ================= */}

      <section
        id="services"
        className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >

        <div className="flex flex-wrap items-end justify-between gap-5">

          <div>

            <p className="text-xs font-bold tracking-[0.25em] text-[#9D5964] uppercase">
              Our Best Treatments
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Featured Services
            </h2>

            <p className="mt-3 text-sm text-[#786e68]">
              A little luxury, a lot of confidence.
            </p>

          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#81434F]"
          >
            View All Services
            <ArrowRight size={17} />
          </Link>

        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (

            <article
              key={service.name}
              className="group overflow-hidden rounded-2xl border border-[#eee6df] bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div
                className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${service.image})`,
                }}
              />

              <div className="p-6">

                <p className="text-xs font-semibold text-[#9D5964]">
                  {service.category}
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  {service.name}
                </h3>

                <div className="mt-5 flex items-center justify-between">

                  <div>

                    <p className="text-xl font-bold">
                      ${service.price}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-[#897f79]">
                      <Clock3 size={14} />
                      {service.duration}
                    </p>

                  </div>

                  <Link
                    href="/services"
                    className="rounded-full bg-[#f7eeeb] px-5 py-3 text-xs font-bold text-[#81434F] transition hover:bg-[#81434F] hover:text-white"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* ================= ABOUT SECTION ================= */}

      <section
        id="about"
        className="bg-[#81434F] px-5 py-20 text-white"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

          <div>

            <p className="text-xs font-bold tracking-[0.25em] text-[#f1c9c7] uppercase">
              The SalonBook Experience
            </p>

            <h2 className="mt-5 max-w-lg text-4xl leading-tight font-semibold sm:text-5xl">
              Beauty is not a luxury. It is self-care.
            </h2>

          </div>

          <div>

            <p className="leading-8 text-white/80">
              We believe everyone deserves a moment to relax, refresh,
              and feel confident. Explore our professional salon services
              and let us take care of you.
            </p>

            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#81434F] transition hover:bg-[#f4e9e5]"
            >
              Book Your Experience
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer
        id="contact"
        className="bg-[#29201F] px-5 py-16 text-white"
      >

        <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <Link href="/" className="text-2xl font-bold">
              Salon<span className="text-[#D69BA1]">Book.</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              Your destination for premium beauty, wellness and
              unforgettable salon experiences.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-semibold">Quick Links</h3>

            <div className="mt-5 flex flex-col gap-4 text-sm text-white/60">

              <Link href="/">Home</Link>
              <Link href="/services">Our Services</Link>
              <Link href="/sign-in">Sign In</Link>
              <Link href="/sign-up">Create Account</Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold">Contact Us</h3>

            <div className="mt-5 flex flex-col gap-4 text-sm text-white/60">

              <p className="flex items-center gap-3">
                <MapPin size={17} />
                SalonBook Beauty Studio
              </p>

              <p className="flex items-center gap-3">
                <Phone size={17} />
                +971 50 000 0000
              </p>

              <p>Mon – Sat: 9 AM – 9 PM</p>

            </div>

          </div>

          {/* Social Links */}

          <div>

            <h3 className="font-semibold">Follow Us</h3>

            <div className="mt-5 flex gap-4"> 
<a
  href="https://instagram.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
>
  <FaInstagram size={20} />
</a>

<a
  href="https://facebook.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Facebook"
>
  <FaFacebookF size={20} />
</a>

            </div>

          </div>

        </div>

        {/* Copyright */}

        <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-7 text-center text-xs text-white/40">
          © 2026 SalonBook. All rights reserved.
        </div>

      </footer>

    </main>
  );
}
