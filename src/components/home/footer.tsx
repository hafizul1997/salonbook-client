import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Scissors,
} from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const serviceLinks = [
  "Hair Styling",
  "Skincare",
  "Spa & Massage",
  "Nail Care",
  "Makeup",
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#29201F] px-5 pt-16 pb-8 text-white lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-12 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">

        {/* BRAND */}
        <div className="flex flex-col items-center sm:items-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold"
          >
            <Scissors size={24} className="text-[#D69BA1]" />
            Salon<span className="text-[#D69BA1]">Book.</span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
            Your destination for premium beauty, wellness and
            unforgettable salon experiences. Discover our services
            and book your next appointment with ease.
          </p>

          {/* SOCIAL MEDIA */}
          <div className="mt-6 flex justify-center gap-3 sm:justify-start">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#81434F]"
            >
              <FaInstagram size={19} />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#81434F]"
            >
              <FaFacebookF size={17} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold">Quick Links</h3>

          <div className="mt-6 flex flex-col items-center gap-4 text-sm text-white/60 sm:items-start">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition hover:translate-x-1 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-semibold">Our Services</h3>

          <div className="mt-6 flex flex-col items-center gap-4 text-sm text-white/60 sm:items-start">
            {serviceLinks.map((service) => (
              <Link
                key={service}
                href={`/services?category=${encodeURIComponent(service)}`}
                className="transition hover:translate-x-1 hover:text-white"
              >
                {service}
              </Link>
            ))}
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div>
          <h3 className="font-semibold">Contact Us</h3>

          <div className="mt-6 flex flex-col items-center gap-5 text-sm text-white/60 sm:items-start">

            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <MapPin size={18} className="shrink-0 text-[#D69BA1]" />
              <p>SalonBook Beauty Studio</p>
            </div>

            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <Phone size={18} className="shrink-0 text-[#D69BA1]" />
              <p>Contact Number</p>
            </div>

            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <Mail size={18} className="shrink-0 text-[#D69BA1]" />
              <p>Email Address</p>
            </div>

            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <Clock3 size={18} className="shrink-0 text-[#D69BA1]" />
              <p>Mon – Sat: 9 AM – 9 PM</p>
            </div>

          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center text-xs text-white/40 sm:flex-row">
        <p>
          © 2026 SalonBook. All rights reserved.
        </p>

        <p>
          Designed with care for your beauty experience.
        </p>
      </div>
    </footer>
  );
}