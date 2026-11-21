
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Clock3, ArrowRight, SlidersHorizontal } from "lucide-react";
import { apiRequest } from "@/lib/api";

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: "active" | "inactive";
};

type ServicesResponse = {
  success: boolean;
  message: string;
  total: number;
  data: Service[];
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadServices() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();

        if (search.trim()) params.set("search", search.trim());
        if (sort) params.set("sort", sort);

        const query = params.toString();
        const result = await apiRequest<ServicesResponse>(
          `/services${query ? `?${query}` : ""}`
        );

        if (!cancelled) {
          setServices(result.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load services"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadServices();

    return () => {
      cancelled = true;
    };
  }, [search, sort]);

  return (
    <main className="min-h-screen bg-[#FCFAF7]">
      <section className="bg-[#81434F] px-5 py-16 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.25em]">
          Discover Our Treatments
        </p>
        <h1 className="mt-4 text-3xl font-bold md:text-5xl">
          Our Salon Services
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80">
          Explore our professional beauty and wellness services.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#29201F]">
              Available Services
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Explore our latest salon treatments.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-[#EDE5DF] bg-white px-4">
              <Search size={18} className="text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full py-3 text-sm outline-none sm:w-52"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#EDE5DF] bg-white px-4">
              <SlidersHorizontal size={17} className="text-gray-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent py-3 text-sm outline-none"
                aria-label="Sort services by price"
              >
                <option value="">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="py-20 text-center text-[#81434F]">
            Loading services from SalonBook...
          </p>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-semibold text-red-700">
              Unable to load services
            </p>
            <p className="mt-2 text-sm text-red-600">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-2xl border border-[#EDE5DF] bg-white p-12 text-center">
            <h3 className="text-xl font-semibold text-[#29201F]">
              No Services Found
            </h3>
            <p className="mt-3 text-sm text-gray-500">
              Try another search or check back later.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-5 text-sm text-gray-500">
              {services.length} service(s) found
            </p>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service._id}
                  className="group overflow-hidden rounded-2xl border border-[#EDE5DF] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="h-60 bg-cover bg-center bg-gray-100"
                    style={{ backgroundImage: `url("${service.image}")` }}
                    role="img"
                    aria-label={service.serviceName}
                  />

                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#9D5964]">
                      {service.category}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-[#29201F]">
                      {service.serviceName}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-500">
                      {service.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#EDE5DF] pt-5">
                      <div>
                        <p className="text-xs text-gray-400">Service Price</p>
                        <p className="mt-1 text-2xl font-bold text-[#81434F]">
                          ${service.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock3 size={16} />
                        {service.duration} min
                      </div>
                    </div>

                    <Link
                      href={`/services/${service._id}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#81434F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#693541]"
                    >
                      View Details
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
