
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Scissors } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eee6df] bg-[#FCFAF7]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          <Scissors className="text-[#9D5964]" size={25} />
          <span>
            Salon<span className="text-[#9D5964]">Book.</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-9 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition hover:text-[#9D5964]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/sign-in"
            className="text-sm font-semibold transition hover:text-[#9D5964]"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-full bg-[#81434F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#69343F]"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#81434F] transition hover:bg-[#f4eeea] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      {isOpen && (
        <div className="border-t border-[#eee6df] bg-[#FCFAF7] px-5 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium transition hover:text-[#9D5964]"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-3 border-t border-[#eee6df] pt-5">
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-[#81434F] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
