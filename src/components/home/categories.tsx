
import Link from "next/link";
import {
  ArrowRight,
  Scissors,
  Sparkles,
  Heart,
  Hand,
  Palette,
  Flower2,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Hair Styling",
    description: "Haircuts, styling and treatments.",
    icon: Scissors,
  },
  {
    id: 2,
    name: "Skincare",
    description: "Facials and skin treatments.",
    icon: Sparkles,
  },
  {
    id: 3,
    name: "Spa & Massage",
    description: "Relax and refresh your body.",
    icon: Heart,
  },
  {
    id: 4,
    name: "Nail Care",
    description: "Manicure and pedicure services.",
    icon: Hand,
  },
  {
    id: 5,
    name: "Makeup",
    description: "Professional beauty makeup.",
    icon: Palette,
  },
  {
    id: 6,
    name: "Wellness",
    description: "Self-care and wellness services.",
    icon: Flower2,
  },
];

export default function Categories() {
  return (
    <section className="bg-[#F4EEEA] px-5 py-20">
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADING */}
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#9D5964] uppercase">
            Explore Our World
          </p>

          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Our Beauty Categories
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#786e68]">
            Discover our range of professional beauty and wellness
            services designed to help you look and feel your best.
          </p>
        </div>

        {/* CATEGORY CARDS */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={`/services?category=${encodeURIComponent(category.name)}`}
                className="group flex items-center justify-between rounded-2xl border border-[#e8dcd4] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c99ba0] hover:shadow-lg sm:p-7"
              >
                <div className="flex items-center gap-4">
                  {/* ICON */}
                  <div className="rounded-xl bg-[#f7eeeb] p-4 text-[#81434F] transition group-hover:bg-[#81434F] group-hover:text-white">
                    <Icon size={25} />
                  </div>

                  {/* CATEGORY DETAILS */}
                  <div>
                    <h3 className="font-semibold">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#897f79]">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* ARROW */}
                <ArrowRight
                  size={19}
                  className="shrink-0 text-[#9D5964] transition group-hover:translate-x-1"
                />
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
