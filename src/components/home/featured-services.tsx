
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { apiRequest } from "@/lib/api";

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  duration: number;
  image: string;
  status: "active" | "inactive";
};

type ServicesResponse = {
  success: boolean;
  total: number;
  data: Service[];
};

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadFeaturedServices() {
      try {
        const response = (await apiRequest(
          "/services"
        )) as ServicesResponse;

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid services response.");
        }

        const activeServices = response.data
          .filter((service) => service.status === "active")
          .slice(0, 6);

        if (isMounted) {
          setServices(activeServices);
        }
      } catch (err) {
        console.error("Failed to load featured services:", err);

        if (isMounted) {
          setError("Unable to load services. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadFeaturedServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-[#FCFAF7] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
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

        {isLoading && (
          <p className="mt-10 text-sm text-[#81434F]">
            Loading featured services...
          </p>
        )}

        {error && (
          <p className="mt-10 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {!isLoading && !error && services.length === 0 && (
          <p className="mt-10 text-sm text-[#786e68]">
            No active services available yet.
          </p>
        )}

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service._id}
              className="group overflow-hidden rounded-2xl border border-[#eee6df] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <div
                  className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("${service.image}")`,
                  }}
                  role="img"
                  aria-label={service.serviceName}
                />
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold text-[#9D5964]">
                  {service.category}
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  {service.serviceName}
                </h3>

                <div className="mt-5 flex items-center justify-between border-t border-[#eee6df] pt-5">
                  <div>
                    <p className="text-xl font-bold">
                      ${service.price}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-[#897f79]">
                      <Clock3 size={14} />
                      {service.duration} min
                    </p>
                  </div>

                  <Link
                    href={`/services/${service._id}`}
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
