import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import FeaturedServices from "@/components/home/featured-services";
import About from "@/components/home/about";
import Testimonials from "@/components/home/testimonials";
import CTA from "@/components/home/cta";
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

      <FeaturedServices />
      {/* ================= ABOUT SECTION ================= */}

      <About />

      {/* ================= TESTIMONIALS ================= */}

      <Testimonials />

      {/* ================= CTA ================= */}
      <CTA />

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
