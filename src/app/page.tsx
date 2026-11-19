import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import FeaturedServices from "@/components/home/featured-services";
import About from "@/components/home/about";
import Testimonials from "@/components/home/testimonials";
import CTA from "@/components/home/cta";
import Footer from "@/components/home/footer";
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

      <Footer />

    </main>
  );
}
