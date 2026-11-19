
import Link from "next/link";
import { ArrowRight, Clock3, Star } from "lucide-react";
import { services as featuredServices } from "@/data/services";

export default function FeaturedServices() {
  return (
    <section className="bg-[#FCFAF7] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADER */}
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-[#9D5964] uppercase">
              Our Best Treatments
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Featured Services
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#786e68]">
              Discover our most loved beauty and wellness treatments.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#81434F] transition hover:gap-3"
          >
            View All Services
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* SERVICE CARDS */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <article
              key={service.id}
              className="group overflow-hidden rounded-2xl border border-[#eee6df] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <div
                  className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("${service.image}")`,
                  }}
                  role="img"
                  aria-label={service.name}
                />

                {/* RATING */}
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-semibold shadow">
                  <Star
                    size={14}
                    className="fill-[#D8A34C] text-[#D8A34C]"
                  />
                  {service.rating.toFixed(1)}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <p className="text-xs font-semibold text-[#9D5964]">
                  {service.category}
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  {service.name}
                </h3>

                {/* PRICE AND DURATION */}
                <div className="mt-5 flex items-center justify-between border-t border-[#eee6df] pt-5">
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
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f7eeeb] px-5 py-3 text-xs font-bold text-[#81434F] transition hover:bg-[#81434F] hover:text-white"
                  >
                    View Details
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
