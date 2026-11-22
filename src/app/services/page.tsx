
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Clock3,
  ArrowRight,
  Loader2,
  RefreshCw,
  Scissors,
} from "lucide-react";
import { apiRequest } from "@/lib/api";

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number | string;
  image: string;
  status: "active" | "inactive";
};

type ServicesResponse = {
  success: boolean;
  total: number;
  data: Service[];
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await apiRequest<ServicesResponse>("/services");

      setServices(response.data ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load services."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => loadServices());
  }, [loadServices]);

  const filteredServices = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const result = services.filter((service) =>
      service.serviceName.toLowerCase().includes(keyword)
    );

    if (sort === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [services, search, sort]);

  return (
    <main className="min-h-screen bg-[#FCFAF7]">
      <section className="bg-[#81434F] px-5 py-16 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
          Our Services
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Discover Our Beauty Services
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80">
          Explore our professional salon services and find
          the perfect treatment for you.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search services by name..."
              className="w-full rounded-full border border-[#e8ddd7] bg-white py-3 pl-12 pr-5 text-sm outline-none focus:border-[#81434F]"
            />
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-[#e8ddd7] bg-white px-5 py-3 text-sm outline-none focus:border-[#81434F]"
          >
            <option value="default">Default Sorting</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="flex min-h-60 items-center justify-center gap-3">
            <Loader2 className="animate-spin text-[#81434F]" />
            <p className="text-sm text-gray-500">
              Loading services...
            </p>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-red-600">{error}</p>

            <button
              onClick={() => void loadServices()}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#81434F] px-6 py-3 text-sm font-semibold text-white"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="py-20 text-center">
            <Scissors
              size={40}
              className="mx-auto text-[#81434F]"
            />

            <h2 className="mt-5 text-2xl font-bold text-[#29201F]">
              No Services Found
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              {services.length === 0
                ? "There are currently no active services available."
                : "Try searching with a different service name."}
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-500">
              Showing {filteredServices.length} services
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <article
                  key={service._id}
                  className="overflow-hidden rounded-2xl border border-[#eee6df] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="h-60 bg-cover bg-center bg-gray-100"
                    style={{
                      backgroundImage: `url("${service.image}")`,
                    }}
                    role="img"
                    aria-label={service.serviceName}
                  />

                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#9D5964]">
                      {service.category}
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-[#29201F]">
                      {service.serviceName}
                    </h2>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                      {service.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#eee6df] pt-5">
                      <div>
                        <p className="text-xs text-gray-400">
                          Price
                        </p>

                        <p className="mt-1 text-xl font-bold text-[#81434F]">
                          ${service.price}
                        </p>
                      </div>

                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock3 size={15} />
                        {service.duration} min
                      </span>
                    </div>

                    <Link
                      href={`/services/${service._id}`}
                      className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#81434F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#693541]"
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
